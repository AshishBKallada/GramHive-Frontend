import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


export const userLogin = createAsyncThunk(
    'user/login',
    async (loginData, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            if (response.status === 401) {
                const data = await response.json();
                return thunkAPI.rejectWithValue(data);
            }
            if (response.status === 302) {
                const data = await response.json();
                return thunkAPI.rejectWithValue(data);
            }
            if (response.status >= 400 && response.status < 500) {
                const data = await response.json();
                return thunkAPI.rejectWithValue(data);
            }
            if (response.status >= 500) {
                throw new Error('Internal server error');
            }

            const data = await response.json();
            Cookies.set('accessToken', data.token, { expires: 7 });
            Cookies.set('refreshToken', data.refreshToken, { expires: 7 });

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const userSignup = createAsyncThunk('user/signup', async ({ token, isSignup }, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:3000/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, isSignup }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return thunkAPI.rejectWithValue(errorData);
        }

        const data = await response.json();
        Cookies.set('accessToken', data.tokens.accessToken, { expires: 7 });
        Cookies.set('refreshToken', data.tokens.refreshToken, { expires: 7 });

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ message: error.message });
    }
});

export const userSignupWithEmail = createAsyncThunk('user/signupWithEmail', async (otp) => {
    try {
        const response = await fetch(`http://localhost:3000/verifyotp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp }),
        });
        if (response.ok) {
            const data = await response.json();

            return data;
        }
    } catch (error) {

    }
});


export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (formData, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/profile/update', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);



const initialState = {
    msg: '',
    token: '',
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
        },
        userLoginSuccess(state, action) {
            state.error = null;
        },
        userLoginFailure(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.message;
            state.user = action.payload.user;
            state.error = null;
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            console.log(action.payload.message || action.error.message);
            state.error = action.payload.message || action.error.message;
        })
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload.message;
                state.user = action.payload.user;
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.updatedUser;
                state.msg = action.payload.message;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(userSignupWithEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userSignupWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.msg = action.payload.message;
                state.user = action.payload.user;
            })
            .addCase(userSignupWithEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
});

export default userSlice.reducer;
export const { clearUser, userLoginFailure } = userSlice.actions;