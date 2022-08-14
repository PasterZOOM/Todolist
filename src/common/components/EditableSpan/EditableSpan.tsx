import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {TextField} from '@mui/material'

type PropsType = {
  title: string
  onChange: (newTitle: string) => void
  disabled?: boolean
}

export const EditableSpan: React.FC<PropsType> = React.memo(({
                                                               title,
                                                               onChange,
                                                               disabled
                                                             }) => {
  let [newTitle, setTitle] = useState<string>('')
  let [editMode, setEditMode] = useState<boolean>(false)

  const activeEditMode = () => {
    if (!disabled) {
      setEditMode(true)
      setTitle(title)
    }
  }

  const activeViewMode = useCallback(() => {
    setEditMode(false)
    onChange(newTitle)
  }, [newTitle, onChange])

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && activeViewMode()
  }, [activeViewMode])

  return (editMode
      ? <TextField variant="standard"
                   onBlur={activeViewMode}
                   autoFocus
                   value={newTitle}
                   onKeyDown={onKeyPressEnter}
                   onChange={onChangeTitleHandler}
                   size={'small'}/>
      : <span onDoubleClick={activeEditMode}>{title}</span>
  )
})