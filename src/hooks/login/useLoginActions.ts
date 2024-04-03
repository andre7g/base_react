import { login } from '../../store/slices/auth';
import { useCustomDispatch } from '../../hooks/redux';

export const useLoginActions = () => {
    const dispatch = useCustomDispatch();
 
    const loginAction = () => {
      dispatch(login({
        email:"alejandroaleman281195@gmail.com",
        password:"Fer2020*"
      })).then(res=>{
        // setData(res as LoginResponse); // Asigna res al estado data
        console.log(res);
      });
    }
  return {loginAction}
}