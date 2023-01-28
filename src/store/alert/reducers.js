import { createReducer } from "@reduxjs/toolkit";
import alertActions from "./actions";

const { open,close } = alertActions

const initialState = {
  messages: '',
  visible: false,
  success: false,
}

const alertReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(open, (state, action) => {
        const newState = {
          messages: action.payload.messages,
          visible: action.payload.visible,
          success: action.payload.success
        }
        return newState
      })
      .addCase(close, (state, action) => {
        const newState = {
          messages: action.payload.messages,
          visible: action.payload.visible,
          success: action.payload.success
        }
        return newState
      })
  }
)

export default alertReducer