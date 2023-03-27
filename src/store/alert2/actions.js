import { createAsyncThunk } from "@reduxjs/toolkit"

const open = createAsyncThunk(
	'open',({ visible,title,text,showConfirmButton,confirmButtonText,fnConfirmed,showDenyButton,denyButtonText,fnDenied,showCancelButton,cancelButtonText }) => {
		return { visible,title,text,showConfirmButton,confirmButtonText,fnConfirmed,showDenyButton,denyButtonText,fnDenied,showCancelButton,cancelButtonText }
	}
)

const close = createAsyncThunk(
	'close',() => {
		return null
	}
)

const alertActions = { open,close }
export default alertActions