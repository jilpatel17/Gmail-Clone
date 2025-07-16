import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inbox:null,
    stared:null,
    important:null,
}

export const mailSlice = createSlice({
    name:'composemail',
    initialState,
    reducers:{
        openDialogForSendMail(state){
            state.isComposeOpen=true
        },
        closeDialogForSendMail(state){
            state.isComposeOpen=false
        },
        openMessage(state,action){
            state.selectedMessage = action.payload
        }
    }
})

export const {openDialogForSendMail,closeDialogForSendMail,openMessage} = mailSlice.actions


export default mailSlice.reducer