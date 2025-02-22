import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_URL;

export const loginUser = createAsyncThunk(
  'authSlice/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth`, credentials);
      console.log(response.data);

      if (!response.data.accessToken || !response.data.rol) {
        // Si el token o el rol son inválidos, rechaza la acción
        return rejectWithValue('Usuario o contraseña incorrectos');
      }
      
      return response.data;  // Se asume que la respuesta contiene { user, token, rol }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error desconocido');
    }
  }
);

// Cargar el token desde localStorage al inicializar el estado
const initialState = {
  user: null,
  token: localStorage.getItem('token'),  // Recuperar el token de localStorage si existe
  rol: localStorage.getItem('rol'),
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.rol = null;
      state.error = null;
      localStorage.removeItem('token');  // Eliminar el token del localStorage al hacer logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.rol = action.payload.rol;

        // Guardar el token en localStorage
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('rol', action.payload.rol);  
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;
