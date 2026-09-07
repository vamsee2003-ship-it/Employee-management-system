import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#1E3A5F",
        },

        secondary: {
            main: "#64748B",
        },

        background: {
            default: "#F5F7FA",
            paper: "#FFFFFF",
        },

        text: {
            primary: "#172033",
            secondary: "#64748B",
        },
    },

    typography: {
        fontFamily: "Inter, Arial, sans-serif",

        h4: {
            fontWeight: 700,
            letterSpacing: "-0.5px",
        },

        h5: {
            fontWeight: 700,
        },

        h6: {
            fontWeight: 600,
        },

        body1: {
            fontSize: "0.95rem",
        },
    },

    shape: {
        borderRadius: 10,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 0,
                    padding: "9px 18px",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.06)",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },

        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 700,
                    backgroundColor: "#F8FAFC",
                },
            },
        },
    },
});

export default theme;