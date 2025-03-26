import { createSlice } from "@reduxjs/toolkit";

type TUserState = {
	_id: string;
	name: string;
	role: string;
};

export type TAuthState = {
	user: null | TUserState;
	token: null | string;
};

const initialState: TAuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
		},

		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
