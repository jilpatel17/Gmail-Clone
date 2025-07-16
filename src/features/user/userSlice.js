import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : JSON.parse(localStorage.getItem('current-user')) || null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login(state,action){
            state.currentUser = action.payload
        },
        logout(state){
            state.currentUser = null;
            localStorage.removeItem('current-user')
        },
        updateProfile(state,action){
            state.currentUser.profile = action.payload
            localStorage.setItem('current-user',JSON.stringify(state.currentUser))
        }
    }
})

export const {login,logout,updateProfile} = userSlice.actions


export default userSlice.reducer