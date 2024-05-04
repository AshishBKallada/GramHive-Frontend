import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const userLogin = createAsyncThunk('user/login', async (loginData, thunkAPI) => {
    try {
        console.log('11');
        console.log(loginData);
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });
        if (response.status === 401) {
            const data = await response.json();
            throw new Error(data.message);
        }

        const data = await response.json();

        Cookies.set('token', data.token, { expires: 7 });
        Cookies.set('refreshToken', data.refreshToken, { expires: 7 });
        console.log('ACCESS TOKEN', data.token);

        console.log('REFRESH TOKEN', data.refreshToken);


        return data;
    } catch (error) {
        throw error;
    }
});

export const userSignup = createAsyncThunk('user/signup', async (signupData, thunkAPI) => {
    try {
        console.log('11');
        console.log('SignupData', signupData);
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });
        if (!response.ok) {
            console.log('Failed to login');
            throw new Error('Invalid login credentials');
        }

        console.log(response)
        const data = await response.json();
        console.log('User successfully signed up ', data);

        Cookies.set('token', data.token, { expires: 7 });

        return data;
    } catch (error) {
        throw error;
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
            console.log('UPDATED Data', data);
            return data;
        } catch (error) {
            throw error;
        }
    }
);



const initialState = {
    msg: '',
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
                console.log('State', state);
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                console.log('fulfilled');
                console.log(action);

                state.loading = false;
                state.msg = action.payload.message;
                state.user = action.payload.user;
                state.error = null;
                console.log('State', state.user);


            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error.message);
                state.error = action.error.message;
                console.log('Rejected');
                console.log('State', state.error);
            })
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('State', state);
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                console.log('fulfilled');
                console.log(action);

                state.loading = false;
                state.msg = action.payload.message;
                state.user = action.payload.user;
                console.log('State', state.user);
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('State', state);
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                console.log('State', action);
                state.loading = false;
                state.user = action.payload.updatedUser;
                state.msg = action.payload.message;
                state.error = null;

            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.error = action.error.message;
            });

    }
});

export default userSlice.reducer;
export const { clearUser, userLoginFailure } = userSlice.actions;