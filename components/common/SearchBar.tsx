import CloseIcon from '@mui/icons-material/CloseOutlined'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import { CircularProgress, IconButton, InputAdornment, outlinedInputClasses, TextField } from '@mui/material'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useCallbackRef } from '../../helpers/hooks'

type SearchBarProps = {
  onSearch: (search: string | undefined) => void
}

export function SearchBar(props: SearchBarProps) {
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)

  const timerRef = useRef<NodeJS.Timeout>()
  const onSearchRef = useCallbackRef(props.onSearch)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      setSearching(true)

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        onSearchRef.current(e.target.value || undefined)
        setSearching(false)
      }, 500)
    },
    [timerRef, onSearchRef]
  )

  const onClear = useCallback(() => {
    setSearch('')
    setSearching(false)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    onSearchRef.current(undefined)
  }, [timerRef, onSearchRef])

  return (
    <TextField
      fullWidth
      value={search}
      variant="outlined"
      autoComplete="off"
      onChange={onChange}
      placeholder="Quick search..."
      sx={(theme) => ({
        ['.' + outlinedInputClasses.input]: {
          padding: `${theme.spacing(0.9)} ${theme.spacing(1)}`,
        },
      })}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" color={!!search ? 'inherit' : 'disabled'} />
          </InputAdornment>
        ),
        endAdornment: searching ? (
          <InputAdornment position="end">
            <CircularProgress size={17} thickness={4.5} />
          </InputAdornment>
        ) : (
          !!search && (
            <InputAdornment position="end">
              <IconButton edge="end" size="small" onClick={onClear}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        ),
      }}
    />
  )
}
