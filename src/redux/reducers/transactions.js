import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const transactions = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {setTransactions} = transactions.actions
export default transactions.reducer