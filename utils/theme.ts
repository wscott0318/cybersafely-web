import { inputBaseClasses } from '@mui/material'
import { common, grey, red } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'
import { Roboto } from '@next/font/google'

export const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[100],
      paper: common.white,
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
      styleOverrides: {
        root: {
          border: 'none',
        },
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
          ['.' + inputBaseClasses.root]: {
            background: theme.palette.background.paper,
          },
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
