import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from '../features/settings/settingsSlice'

export default configureStore({
  reducer: {
    settings: settingsReducer,
  },
})
