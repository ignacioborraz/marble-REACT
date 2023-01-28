import { createAction } from "@reduxjs/toolkit"

const open = createAction(
  'open',
  ({ data,success }) => {
    return {
      payload: {
        messages: data,
        visible: true,
        success
      }
    }
  }
)

const close = createAction(
  'close',
  () => {
    return {
      payload: {
        messages: "",
        visible: false,
        success: false
      }
    }
  }
)

const alertActions = { open,close }
export default alertActions