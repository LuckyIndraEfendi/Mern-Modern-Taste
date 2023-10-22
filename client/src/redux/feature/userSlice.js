import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        signInStart: (state) => {
            state.isLoading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },signInClear : (state) => {
            state.isLoading = false;
        }
    },
});

export const { signInStart, signInSuccess, signInFailure,signInClear } = userSlice.actions;

export default userSlice.reducer;
