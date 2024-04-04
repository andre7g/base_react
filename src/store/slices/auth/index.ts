import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { Thunk } from "store/store";
import axios from "../../../utils/axios";
import { LoginResponse } from "interfaces/login/LoginResponse";

export interface Login{
    usuario: string;
    password: string;
}
export interface AuthInterface{
    token: string | null;
    name: string | null;
    isLogged: boolean ;
}

const initialState : AuthInterface = {
    token: null,
    name: null,
    isLogged: false
}

const sliceAuth = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAccesToken: ( state, action: PayloadAction<string|null> ) => {
            state.token = action.payload;
        },
        setUser: ( state, action: PayloadAction<string|null> ) => {
            state.name = action.payload;
        },
        setLogged: ( state, action: PayloadAction<boolean> ) => {
            state.isLogged = action.payload;
        }
    }

});

export const { setAccesToken, setUser,setLogged } = sliceAuth.actions;
export default sliceAuth.reducer;

export const login = 
    (data: Login): Thunk =>
    async (dispatch): Promise<LoginResponse | AxiosError> => {
        try{
            const respuesta: AxiosResponse = await axios.post('Usuarios/AuthenticateUser',data);
            const res: LoginResponse = respuesta.data;
            console.log(res.status)
            if(res.status === 200){
                dispatch(setLogged(true));
                dispatch(setAccesToken(res.data.token));
                dispatch(setUser(res.data.usuario));
            }else{
                dispatch(setLogged(false));
                dispatch(setAccesToken(null));
                dispatch(setUser(null));
            }
            return res;
        }catch(e){
            dispatch(setLogged(false));
            dispatch(setAccesToken(null));
            dispatch(setUser(null));
            return e as AxiosError;
        }
    } 