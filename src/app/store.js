import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';  // Asegúrate de que la ruta sea correcta

// Configuración del store
export const store = configureStore({
  reducer: {
    auth: authSlice,  // Agrega el slice de auth aquí
  },
});

// Exportamos el store para poder usarlo en el Provider
export default store;
