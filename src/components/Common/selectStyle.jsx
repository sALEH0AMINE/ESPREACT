export const getReactSelectStyles = (muiTheme) => ({
  control: (base, state) => ({
    ...base,
    minHeight: 56,
    fontFamily: muiTheme.typography.fontFamily,
    borderRadius: 8,
    borderColor: state.isFocused
      ? muiTheme.palette.primary.main
      : "rgba(0, 0, 0, 0.23)",
    boxShadow: state.isFocused
      ? `0 0 0 2px ${muiTheme.palette.primary.main}`
      : "none",
    "&:hover": {
      borderColor: state.isFocused
        ? muiTheme.palette.primary.main
        : "rgba(0, 0, 0, 0.87)",
    },
    backgroundColor: muiTheme.palette.background.paper,
    borderWidth: state.isFocused ? "2px" : "1px",
  }),

  menu: (base) => ({
    ...base,
    zIndex: 1300,
    fontFamily: muiTheme.typography.fontFamily,
  }),

  option: (base, state) => ({
    ...base,
    fontFamily: muiTheme.typography.fontFamily,
    backgroundColor: state.isSelected
      ? muiTheme.palette.primary.main
      : state.isFocused
      ? muiTheme.palette.action.hover
      : "transparent",
    color: state.isSelected ? "#fff" : "#000",
    cursor: "pointer",
  }),

  singleValue: (base) => ({
    ...base,
    fontFamily: muiTheme.typography.fontFamily,
    color: muiTheme.palette.text.primary,
  }),

  placeholder: (base) => ({
    ...base,
    fontFamily: muiTheme.typography.fontFamily,
    color: "#888",
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: muiTheme.palette.primary.light,
    borderRadius: 6,
  }),

  multiValueLabel: (base) => ({
    ...base,
    fontFamily: muiTheme.typography.fontFamily,
    color: muiTheme.palette.primary.main,
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: muiTheme.palette.primary.main,
    ":hover": {
      backgroundColor: muiTheme.palette.primary.main,
      color: "#fff",
    },
  }),
});
