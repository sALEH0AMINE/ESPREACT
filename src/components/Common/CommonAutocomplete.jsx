import React, { useEffect, useState, useMemo } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getOptions } from "../../services/commonService";

/* -------- helper: auto-detect value & label -------- */

const mapToOption = (item) => {
  let value = null;
  let label = "";

  for (const key in item) {
    if (typeof item[key] === "number" && value === null) {
      value = item[key];
    }
    if (typeof item[key] === "string" && label === "") {
      label = item[key];
    }
  }

  return { value, label, original: item };
};

/* ---------------- Component ---------------- */

export default function CommonAutocomplete({
  path,
  searchParamName,
  isMulti = false,
  value,
  onChange,
  placeholder = "اختر...",
  minSearchLength = 0,
  isClearable = true,
  loadOnMount = true,
  customFetch,
  preloadedOptions,
  isLoading: externalLoading,
  isDisabled = false,
  sx
}) {
  const theme = useTheme();

  const [options, setOptions] = useState(preloadedOptions || []);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isLoading =
    externalLoading !== undefined ? externalLoading : loading;

  /* -------- Fetch options -------- */

  const fetchOptions = async (searchValue) => {
    try {
      setLoading(true);
      let data;

      if (customFetch) {
        data = await customFetch(searchValue);
      } else if (path) {
        data = await getOptions(path, searchParamName, searchValue);
      } else {
        return;
      }

      if (Array.isArray(data)) {
        if (data[0]?.value !== undefined && data[0]?.label !== undefined) {
          setOptions(data);
        } else {
          setOptions(data.map(mapToOption));
        }
      } else {
        setOptions([]);
      }
    } catch (e) {
      console.error("Autocomplete fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  /* -------- Initial load -------- */

  useEffect(() => {
    if (preloadedOptions) {
      setOptions(preloadedOptions);
    }
  }, [preloadedOptions]);

  useEffect(() => {
    if (!preloadedOptions && loadOnMount && (path || customFetch)) {
      fetchOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, loadOnMount]);

  /* -------- Search with debounce -------- */

  useEffect(() => {
    if (!searchParamName) return;

    const timer = setTimeout(() => {
      if (inputValue.length >= minSearchLength) {
        fetchOptions(inputValue);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, minSearchLength, searchParamName]);

  /* -------- Value mapping (important) -------- */

  const mappedValue = useMemo(() => {
    if (value === null || value === undefined || value === "") {
      return isMulti ? [] : null;
    }

    const isPrimitive = (val) =>
      typeof val === "string" || typeof val === "number";

    if (isMulti) {
      return options.filter((o) =>
        value.some((v) =>
          isPrimitive(v)
            ? o.value === v || o.label === v
            : v.value === o.value,
        ),
      );
    }

    if (isPrimitive(value)) {
      return (
        options.find((o) => o.value === value || o.label === value) || null
      );
    }

    return options.find((o) => o.value === value.value) || null;
  }, [value, options, isMulti]);

  /* ---------------- Render ---------------- */

  return (
    <Autocomplete
      multiple={isMulti}
      options={options}
      value={mappedValue}
      loading={isLoading}
      disabled={isDisabled}
      clearOnEscape={isClearable}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, val) =>
        option.value === val.value
      }
      onChange={(e, newValue) => {
        onChange?.(newValue);
      }}
      onInputChange={(e, newInput) => {
        setInputValue(newInput);
      }}
      noOptionsText={
        inputValue.length < minSearchLength
          ? `اكتب ${minSearchLength} حروف على الأقل`
          : "لا توجد نتائج"
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading && (
                  <CircularProgress color="inherit" size={18} />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{
        ...sx,
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.paper,
        },
      }}
    />
  );
}
