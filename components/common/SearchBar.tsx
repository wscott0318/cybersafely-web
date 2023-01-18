import CloseIcon from '@mui/icons-material/CloseOutlined'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

type SearchBarProps = {
  onSearch: (search: string | undefined) => void
}

export function SearchBar(props: SearchBarProps) {
  const [initial, setInitial] = useState(true)
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (initial) {
      setInitial(false)
      return
    }

    setSearching(true)

    const timer = setTimeout(() => {
      props.onSearch(!!search ? search : undefined)
      setSearching(false)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [search])

  return (
    <TextField
      value={search}
      autoComplete="off"
      sx={{ width: 250 }}
      placeholder="Quick search..."
      onChange={(e) => setSearch(e.target.value)}
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
              <IconButton edge="end" size="small" onClick={() => setSearch('')}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        ),
      }}
    />
  )
}
