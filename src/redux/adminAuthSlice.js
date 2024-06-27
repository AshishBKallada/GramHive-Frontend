import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axios from 'axios';

export const adminLogin = createAsyncThunk(
    'admin/login',
    async (loginData, thunkAPI) => {
        try {
            const response = await axios.post('https://gramhive6.vercel.app/admin/login', loginData, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data);
            }
            const data = response.data;
            Cookies.set('adminToken', data.token, { expires: 7 });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error.response ? error.response.data.message : error.message });
        }
    }
);

const initialState = {
    admin: '',
    msg: '',
    error: null,
    loading: false
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.admin = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload.admin;
                state.msg = action.payload.message;
                state.error = null;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : action.error.message;
            });
    }
});

export const { clearUser } = adminSlice.actions;

export default adminSlice.reducer;
