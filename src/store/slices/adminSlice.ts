import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  isAuthenticated: boolean;
  username: string | null;
}

const loadAuthFromStorage = (): boolean => {
  try {
    return localStorage.getItem('adminAuth') === 'true';
  } catch {
    return false;
  }
};

const initialState: AdminState = {
  isAuthenticated: loadAuthFromStorage(),
  username: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
      localStorage.setItem('adminAuth', 'true');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      localStorage.removeItem('adminAuth');
    },
  },
});

export const { login, logout } = adminSlice.actions;

export default adminSlice.reducer;
