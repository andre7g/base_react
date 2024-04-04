
import { getTiposProducto } from '../../store/slices/tiposproducto';
import { useCustomDispatch } from '../../hooks/redux';
import { TiposProductoResponse } from '../../interfaces/TiposProducto/TiposProducto';

export const useTiposProducto = () => {
    const dispatch = useCustomDispatch();
  
    const getTiposProductoAction = async () => {
        try {
            const res = await dispatch(getTiposProducto());
            return res as TiposProductoResponse;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return null;
        }
    }
    
    return { getTiposProductoAction };
}
