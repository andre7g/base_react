// Importación de la función configureStore de Redux Toolkit
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistAuthConfig = {
    key:'auth',
    storage,
    whitelist:['token']
}

// Importación del reducer de autenticación desde el archivo auth.ts en el directorio slices
import authReducer from './slices/auth';

// Configuración de la tienda de Redux con un único reducer para el estado de autenticación
const store = configureStore({
    reducer: {
        auth: persistReducer<ReturnType<typeof authReducer>>(persistAuthConfig,authReducer), // Definición del slice 'auth' que utiliza el reducer 'authReducer'
    },
    middleware: (defaultMiddleware) => defaultMiddleware({
        serializableCheck: false
    })
});

// Definición de tipos para RootState y AppDispatch basados en el store creado
export type RootState = ReturnType<typeof store.getState>; // Tipo que representa el tipo de estado global de la aplicación
export type AppDispatch = typeof store.dispatch; // Tipo que representa el tipo de la función dispatch de Redux
export type Thunk = ThunkAction<
    Promise<unknown>,
    RootState,
    unknown,
    Action<any>
>;
// Exportación de la tienda configurada
export const persistor =  persistStore(store);
export default store;