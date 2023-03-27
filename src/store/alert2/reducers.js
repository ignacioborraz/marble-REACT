import { createReducer } from "@reduxjs/toolkit";
import alertActions from "./actions";

const { open,close } = alertActions

const initialState = {
	visible: false,
	title: '',
	text: '',
	showConfirmButton: false,
	confirmButtonText: '',
	fnConfirmed: null,
	showDenyButton: false,
	denyButtonText: '',
	fnDenied: null,
	showCancelButton: false,
	cancelButtonText: '',
}

const alertReducer2 = createReducer(
	initialState,(builder) => builder
		.addCase(open.fulfilled, (state, action) => {
			const newState = {
				visible: action.payload.visible,
				title: action.payload.title,
				text: action.payload.text,
				showConfirmButton: action.payload.showConfirmButton,
				confirmButtonText: action.payload.confirmButtonText,
				fnConfirmed: action.payload.fnConfirmed,
				showDenyButton: action.payload.showDenyButton,
				denyButtonText: action.payload.denyButtonText,
				fnDenied: action.payload.fnDenied,
				showCancelButton: action.payload.showCancelButton,
				cancelButtonText: action.payload.cancelButtonText
			}
			return newState
		})
      	.addCase(close.fulfilled, (state, action) => {
			const newState = {
				visible: false,
				title: '',
				text: '',
				showConfirmButton: false,
				confirmButtonText: '',
				fnConfirmed: null,
				showDenyButton: false,
				denyButtonText: '',
				fnDenied: null,
				showCancelButton: false,
				cancelButtonText: ''
			}
			return newState
    	})
)

export default alertReducer2