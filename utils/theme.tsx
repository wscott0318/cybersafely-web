import ExpandIcon from '@mui/icons-material/ExpandMoreOutlined'
import UserIcon from '@mui/icons-material/Person'
import { accordionClasses, dividerClasses, outlinedInputClasses } from '@mui/material'
import { common, green, red } from '@mui/material/colors'
import { Theme, createTheme as createMUITheme, lighten } from '@mui/material/styles'
import { Lexend } from 'next/font/google'

export const lexend = Lexend({
  preload: true,
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export function createTheme() {
  return createMUITheme({
    palette: {
      mode: 'light',
      background: {
        default: common.white,
        paper: common.white,
      },
      primary: {
        main: '#dd3333',
        light: lighten('#dd3333', 0.9),
      },
      success: {
        main: green[700],
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: lexend.style.fontFamily,
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
            borderRadius: theme.shape.borderRadius * 2.5 + 'px',
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
          variant: 'outlined',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            ['.' + outlinedInputClasses.root]: {
              background: theme.palette.background.paper,
              borderRadius: '10px',
              height: '46px',
            },
          }),
        },
      },
      MuiSelect: {
        defaultProps: {
          size: 'small',
          variant: 'outlined',
          MenuProps: {
            PaperProps: { sx: { mt: 1, mb: 1 } },
          },
        },
        styleOverrides: {
          // @ts-ignore
          root: ({ theme }) => ({
            background: theme.palette.background.paper,
            borderRadius: '10px',
            height: '46px',
          }),
        },
      },
      MuiMenu: {
        defaultProps: {
          PaperProps: { sx: { mt: 1, mb: 1 } },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: 'none',
            fontWeight: 300,
            borderRadius: '10px',
            height: '46px',
          }),
          outlined: ({ theme }) => ({
            border: '2px solid',
            fontWeight: 'normal',
            ':hover': {
              border: '2px solid',
            },
          }),
        },
      },
      MuiButtonGroup: {
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
      MuiTab: {
        styleOverrides: {
          fullWidth: ({ theme }) => ({
            borderBottom: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiTabs: {
        defaultProps: {
          variant: 'fullWidth',
        },
      },
      MuiAccordion: {
        defaultProps: {
          disableGutters: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            ':before': {
              display: 'none',
            },
            ['& + .' + accordionClasses.root]: {
              marginTop: theme.spacing(1),
            },
          }),
          rounded: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius * 2 + 'px !important',
          }),
        },
      },
      MuiAccordionSummary: {
        defaultProps: {
          expandIcon: <ExpandIcon color="disabled" fontSize="small" />,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            paddingInline: theme.spacing(3),
            paddingBlock: theme.spacing(0.5),
          }),
          expandIconWrapper: ({ theme }) => ({
            marginLeft: theme.spacing(1),
          }),
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: theme.spacing(3),
            paddingTop: 0,
          }),
        },
      },
      MuiAvatar: {
        defaultProps: {
          children: <UserIcon fontSize="inherit" />,
        },
      },
      // @ts-ignore
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
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
            '.MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '&.MuiDataGrid-root': {
              border: 'none',
            },
            '.MuiDataGrid-columnHeaderTitle': {
              color: lighten(theme.palette.text.primary, 0.5),
              fontWeight: 300,
            },
          }),
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiDialog-paper': {
              borderRadius: theme.shape.borderRadius * 4 + 'px',
            },
          }),
        },
      },
    },
  })
}
