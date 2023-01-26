import { dividerClasses, outlinedInputClasses } from '@mui/material'
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
          colorPrimary: ({ theme }) => ({
            border: 'none',
            background: theme.palette.primary.main,
          }),
          colorTransparent: ({ theme }) => ({
            border: 'none',
            borderBottom: '1px solid ' + theme.palette.divider,
          }),
        },
      },
      MuiPaper: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          rounded: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius * 2 + 'px',
          }),
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
          root: ({ theme }) => ({
            textTransform: 'uppercase',
            paddingLeft: theme.spacing(3),
            color: theme.palette.text.disabled,
          }),
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
          variant: 'standard',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            ['.' + outlinedInputClasses.root]: {
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
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
      MuiTabs: {
        defaultProps: {
          variant: 'fullWidth',
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
            borderRadius: theme.shape.borderRadius * 2 + 'px',
            '*': {
              outline: 'none !important',
            },
          }),
        },
      },
    },
  })
}
