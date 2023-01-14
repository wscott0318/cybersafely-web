import { red } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'
import { Roboto } from '@next/font/google'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'rgb(250,250,250)',
      paper: 'white',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined',
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 2,
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.background.paper,
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
        color: 'primary',
        variant: 'outlined',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
    },
    // @ts-ignore
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          background: theme.palette.background.paper,
          '*': {
            outline: 'none !important',
          },
        }),
      },
    },
  },
})
