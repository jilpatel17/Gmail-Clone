import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isComposeOpen : false,
    selectedMessage:null,
    senderSelectedMessage:null

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
        },
        changeStarredState(state,action){
            state.selectedMessage.status.isStarred = action.payload
        },
        openSenderMessage(state,action){
            state.senderSelectedMessage = action.payload
        },
        changeStarredStateSender(state,action){
            state.senderSelectedMessage.status.isStarred = action.payload
        }

    }
})

export const {openDialogForSendMail,closeDialogForSendMail,openMessage,changeStarredState,openSenderMessage,changeStarredStateSender} = mailSlice.actions


export default mailSlice.reducer