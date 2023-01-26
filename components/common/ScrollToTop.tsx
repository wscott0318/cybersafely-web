import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { Fab, Fade, Tooltip } from '@mui/material'
import { useOnTop } from '../../helpers/hooks'

export function ScrollToTop() {
  const { isOnTop } = useOnTop(200)

  return (
    <Fade mountOnEnter unmountOnExit in={!isOnTop}>
      <Tooltip title="Scroll to top">
        <Fab
          size="small"
          color="primary"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          sx={(theme) => ({
            position: 'fixed',
            right: theme.spacing(4),
            bottom: theme.spacing(4),
            zIndex: theme.zIndex.drawer - 1,
          })}
        >
          <ArrowUpIcon />
        </Fab>
      </Tooltip>
    </Fade>
  )
}
