import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { Thunk } from "store/store";
import axios from "../../../utils/axios";
import { LoginResponse } from "interfaces/login/LoginResponse";

export interface Login{
    email: string;
    password: string;
}
export interface AuthInterface{
    token: string | null;
}

const initialState : AuthInterface = {
    token: null
}

const sliceAuth = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAccesToken: ( state, action: PayloadAction<string|null> ) => {
            state.token = action.payload;
        }
    }

});

export const { setAccesToken } = sliceAuth.actions;
export default sliceAuth.reducer;

export const login = 
    (data: Login): Thunk =>
    async (dispatch): Promise<LoginResponse | AxiosError> => {
        try{
            const respuesta: AxiosResponse = await axios.post('usuarios/login',data);
            const res: LoginResponse = respuesta.data;
            console.log(res);
            dispatch(setAccesToken(res.data.tokens.access));
            return res;
        }catch(e){
            return e as AxiosError;
        }
    } 