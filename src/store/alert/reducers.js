import { createReducer } from "@reduxjs/toolkit";
import alertActions from "./actions";

const { open,close } = alertActions

const initialState = {
  messages: '',
  visible: false,
  success: false,
  options: '',
  id_code: '',
  navigation: '',
  ids: {},
  data: {}
}

const alertReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(open, (state, action) => {
        const newState = {
          messages: action.payload.messages,
          visible: action.payload.visible,
          success: action.payload.success,
          options: action.payload.options,
          id_code: action.payload.id_code,
          navigation: action.payload.navigation,
          ids: action.payload.ids,
          data: action.payload.data
        }
        return newState
      })
      .addCase(close, (state, action) => {
        const newState = {
          messages: action.payload.messages,
          visible: action.payload.visible,
          success: action.payload.success,
          options: action.payload.options,
          id_code: action.payload.id_code,
          navigation: action.payload.navigation,
          ids: action.payload.ids,
          data: action.payload.data
        }
        return newState
      })
  }
)

export default alertReducer