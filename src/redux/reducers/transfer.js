import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    amount: '',
    notes:'',

}

const transfer = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setRecipient: (state, action)=>{
            state.user = action.payload
        },
        setAmount: (state, action)=>{
            state.amount = action.payload
        },
        setNotes: (state, action)=>{
            state.notes = action.payload
        },
        clearTransferState: () =>{
            return initialState
        }
    }
})

export const {setRecipient, setAmount, setNotes, clearTransferState} = transfer.actions
export default transfer.reducer