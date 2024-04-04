
import { login } from '../../store/slices/auth';
import { useCustomDispatch } from '../../hooks/redux';
import { LoginResponse } from 'interfaces/login/LoginResponse';

export const useLoginActions = () => {
    const dispatch = useCustomDispatch();
  
    const loginAction = async (username: string, password: string): Promise<LoginResponse | null> => {
        try {
            const res = await dispatch(login({
                usuario: username,
                password: password
            }));
            return res as LoginResponse;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return null;
        }
    }

    return { loginAction };
}
