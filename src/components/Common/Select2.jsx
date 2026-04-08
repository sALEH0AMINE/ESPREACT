import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getOptions } from "../../services/commonService";
import { useTheme } from "@mui/material/styles";
import { getReactSelectStyles } from "./selectStyle";

/* -------- helper: auto-detect value & label -------- */

const mapToSelectOption = (item) => {
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

export default function CommonSelect({
  path,
  searchParamName,
  isMulti = false,
  value,
  onChange,
  placeholder = "اختر...",
  minSearchLength = 0,
  isClearable = true, // ✅ NEW
  loadOnMount = true, // ✅ NEW
  customFetch, // ✅ NEW: fonction fetch personnalisée
  preloadedOptions, // ✅ NEW: options préchargées
  isLoading: externalLoading, // ✅ NEW: prop de loading externe
  isDisabled = false, // ✅ NEW: prop pour désactiver le select
}) {
  const muiTheme = useTheme();
  const selectStyles = getReactSelectStyles(muiTheme);

  const [options, setOptions] = useState(preloadedOptions || []);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // Utiliser le loading externe si fourni, sinon utiliser le loading interne
  const isLoading = externalLoading !== undefined ? externalLoading : loading;

  /* -------- Fetch options -------- */

  const fetchOptions = async (searchValue) => {
    try {
      setLoading(true);
      let data;
      
      // Si une fonction fetch personnalisée est fournie, l'utiliser
      if (customFetch) {
        data = await customFetch(searchValue);
      } else if (path) {
        // Sinon, utiliser le comportement par défaut avec path
        data = await getOptions(path, searchParamName, searchValue);
      } else {
        return; // Pas de path ni de customFetch
      }
      
      // Transformer les données si ce n'est pas déjà fait
      if (Array.isArray(data) && data.length > 0) {
        // Vérifier si les données sont déjà au format {value, label}
        if (data[0].value !== undefined && data[0].label !== undefined) {
          setOptions(data);
        } else {
          setOptions(data.map(mapToSelectOption));
        }
      } else {
        setOptions([]);
      }
    } catch (e) {
      console.error("Select fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  /* -------- 1️⃣ Initial load (no search param) -------- */

  // Mettre à jour les options quand preloadedOptions change
  useEffect(() => {
    if (preloadedOptions) {
      // Si des options sont préchargées, les utiliser directement
      setOptions(preloadedOptions);
    }
  }, [preloadedOptions]);

  // Charger depuis l'API si nécessaire
  useEffect(() => {
    if (!preloadedOptions && loadOnMount && (path || customFetch)) {
      fetchOptions(); // 🔥 بدون searchParam
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, loadOnMount]);

  /* -------- 2️⃣ Search with debounce -------- */

  useEffect(() => {
    if (!searchParamName) return;

    const timer = setTimeout(() => {
      if (inputValue.length >= minSearchLength) {
        fetchOptions(inputValue);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue]);

  /* ---------------- Render ---------------- */

  return (
    <Select
      isMulti={isMulti}
      isClearable={isClearable} // ✅ Clear button
      isLoading={isLoading}
      isDisabled={isDisabled}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={selectStyles}
      onInputChange={(v, action) => {
        if (action.action === "input-change") {
          setInputValue(v);
        }
      }}
      noOptionsMessage={() =>
        inputValue.length < minSearchLength
          ? `اكتب ${minSearchLength} حروف على الأقل`
          : "لا توجد نتائج"
      }
    />
  );
}
