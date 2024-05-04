import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


export const adminLogin = createAsyncThunk('admin/login', async (loginData, ThunkAPI) => {
    try {
        console.log('redux', loginData);
        const response = await fetch('http://localhost:3000/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        if (response.ok) {
            const data = await response.json();
            Cookies.set('adminToken', data.token, { expiresIn: '1h' });
            console.log('CookieTOken',Cookies.get('adminToken'));
            return data;
        }
    } catch (e) {
        console.log(e);
    }
});

const initialState = {
    admin: '',
    msg: '',
    error: null,
    loading: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) =>
        builder.
            addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                console.log('Fulfilled', action);
                state.loading = false;
                state.admin = action.payload.admin.admin;
                state.msg = action.payload.message;

            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('Rejected');
                console.log('State', state);
            })
})

export default adminSlice.reducer;
export const { clearUser } = adminSlice.actions;