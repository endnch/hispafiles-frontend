import { createSlice } from '@reduxjs/toolkit'
import settings from '../../settings'
import styles from '../../styles'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    style: localStorage.getItem('style') || settings.defaultStyle,
    relativeTime: localStorage.getItem('relativeTime')
      ? JSON.parse(localStorage.getItem('relativeTime'))
      : settings.relativeTime,
  },
  reducers: {
    changeStyle: (state, action) => {
      state.style = action.payload
      document.body.style.background = styles[action.payload].bgColor
      localStorage.setItem('style', action.payload)
    },
    changeRelativeTime: (state, action) => {
      state.relativeTime = action.payload
      localStorage.setItem('relativeTime', action.payload)
    },
  },
})

export const { changeStyle, changeRelativeTime } = settingsSlice.actions

export const selectStyle = (state) => state.settings.style
export const selectRelativeTime = (state) => state.settings.relativeTime

export default settingsSlice.reducer
