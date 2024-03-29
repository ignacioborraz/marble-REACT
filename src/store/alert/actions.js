import { createAction } from "@reduxjs/toolkit"

const open = createAction(
  'open',
  ({ data,success,options,id_code,navigation,ids }) => {
    return {
      payload: {
        messages: data,
        visible: true,
        success,
        options,
        id_code,
        navigation,
        ids,
        data
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
        success: false,
        options: "",
        id_code: "",
        navigation: "",
        ids: {},
        data: {}
      }
    }
  }
)

const alertActions = { open,close }
export default alertActions