import { configureStore } from '@reduxjs/toolkit'
import ReevaMovieReducer from "./reevamovieSlice"


export const store = configureStore({
  reducer: {
    reevamovieData : ReevaMovieReducer
  },
})