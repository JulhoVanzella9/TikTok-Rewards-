import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "dark",
    primary: {
      main: "#fe2c55",
      light: "#ff5c7c",
      dark: "#d41e45",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#25f4ee",
      light: "#5ff7f2",
      dark: "#1bc4bf",
      contrastText: "#000000",
    },
    success: {
      main: "#25f4ee",
      light: "#1a2a2a",
      dark: "#1bc4bf",
      contrastText: "#000000",
    },
    info: {
      main: "#25f4ee",
      light: "#1a2a2a",
      dark: "#25f4ee",
      contrastText: "#000000",
    },
    error: {
      main: "#fe2c55",
      light: "#2a1a1e",
      dark: "#d41e45",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fffc00",
      light: "#2a2a1a",
      dark: "#ccca00",
      contrastText: "#000000",
    },
    grey: {
      100: "#1e1e1e",
      200: "#2a2a2a",
      300: "#3a3a3a",
      400: "#8a8a8a",
      500: "#aaaaaa",
      600: "#e0e0e0",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a0a0a0",
    },
    action: {
      disabledBackground: "rgba(255,255,255,0.12)",
      hoverOpacity: 0.08,
      hover: "rgba(255,255,255,0.05)",
    },
    divider: "rgba(255,255,255,0.08)",
    background: {
      default: "#000000",
      paper: "#121212",
    },
  },

  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: "1.3",
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: "1.3",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: "1.4",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.4",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.5",
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: "1.5",
    },
    button: {
      textTransform: "none",
      fontWeight: "600",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: "400",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: "400",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "#3a3a3a #121212",
        },
        "*::-webkit-scrollbar": {
          width: "6px",
        },
        "*::-webkit-scrollbar-track": {
          background: "#121212",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#3a3a3a",
          borderRadius: "3px",
        },
        body: {
          backgroundColor: "#000000 !important",
        },
        a: {
          textDecoration: "none",
          color: "#ffffff",
        },
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow: "0px 7px 30px 0px rgba(0, 0, 0, 0.5) !important",
        },
        ".simplebar-scrollbar:before": {
          background: "#3a3a3a !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "8px",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #fe2c55 0%, #ff6b81 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #d41e45 0%, #fe2c55 100%)",
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
        sizeSmall: {
          width: 30,
          height: 30,
          minHeight: 30,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "0",
          margin: "0",
          backgroundColor: "#161616",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            border: "1px solid rgba(255,255,255,0.12)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "20px",
          "&:last-child": {
            paddingBottom: "20px",
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 20px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 600,
        },
        filledPrimary: {
          background: "rgba(254, 44, 85, 0.15)",
          color: "#fe2c55",
        },
        filledSecondary: {
          background: "rgba(37, 244, 238, 0.15)",
          color: "#25f4ee",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          backgroundColor: "rgba(255,255,255,0.08)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0a0a0a",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(20px)",
          backgroundImage: "none",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          borderRadius: "8px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.12) !important",
          },
          borderRadius: "8px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#fe2c55 !important",
            },
        },
      },
    },
  },
});

export { baselightTheme };
