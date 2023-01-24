import { dividerClasses } from '@mui/material'
import { common, grey, red } from '@mui/material/colors'
import { createTheme as createMUITheme, Theme } from '@mui/material/styles'
import { Roboto } from '@next/font/google'

export const roboto = Roboto({
  preload: true,
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export function createTheme(isDark: boolean) {
  return createMUITheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      background: {
        default: isDark ? common.black : grey[100],
        paper: isDark ? grey[900] : common.white,
      },
      primary: {
        main: '#dd3333',
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: 'smooth',
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
          variant: 'outlined',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            border: 'none',
            background: theme.palette.primary.main,
          }),
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
      MuiList: {
        defaultProps: {
          disablePadding: true,
        },
        styleOverrides: {
          root: {
            ['.' + dividerClasses.root + ':last-child']: {
              display: 'none',
            },
          },
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
          variant: 'standard',
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
}
