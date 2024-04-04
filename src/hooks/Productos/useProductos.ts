import { getProductos, getProductoById, addProducto, updateProducto } from '../../store/slices/productos';
import { useCustomDispatch } from '../../hooks/redux';
import { ProductosResponse, ProductoResponse, ProductoRequest, ProductoModRequest } from '../../interfaces/Productos';

export const useProductos = () => {
    const dispatch = useCustomDispatch();
  
    const getProductosAction = async () => {
        try {
            const res = await dispatch(getProductos());
            const respueta = res as ProductosResponse;
            return respueta;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return null;
        }
    }

    const getProductoByIdAction = async (id: number) => {
        try {
            const res = await dispatch(getProductoById(id));
            const respueta = res as ProductoResponse;
            return respueta;
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            return null;
        }
    }

    const addProductoAction = async (producto: ProductoRequest) => {
        try {
            const res = await dispatch(addProducto(producto));
            const respueta = res as ProductoResponse;
            return respueta;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            return null;
        }
    }

    const updateProductoAction = async (id: number, producto: ProductoModRequest) => {
        try {
            const res = await dispatch(updateProducto(id, producto));
            const respueta = res as ProductoResponse;
            return respueta;
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            return null;
        }
    }
    
    return { getProductosAction, getProductoByIdAction, addProductoAction, updateProductoAction };
}
