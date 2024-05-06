import { configureStore } from '@reduxjs/toolkit'
import usernameReducer from './username/usernameSlice'

export const store = configureStore({
    reducer: {
        username : usernameReducer,
    },
})