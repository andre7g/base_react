import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from "store/store";
import axios from "../../../utils/axios";
import { ProductosResponse, ProductoRequest, Producto, ProductoResponse, ProductoModRequest } from "../../../interfaces/Productos";
import { isAxiosError } from "axios";

interface ProductoState {
    productos: Producto[];
    producto: Producto | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductoState = {
    productos: [],
    producto: null,
    loading: false,
    error: null,
};

const productosSlice = createSlice({
  name: "productos",
  initialState,
  reducers: {
    start(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action: PayloadAction<Producto[]>) {
      state.productos = action.payload;
      state.loading = false;
      state.error = null;
    },
    successProducto(state, action: PayloadAction<Producto>) {
      state.producto = action.payload;
      state.loading = false;
      state.error = null;
    },
    failure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { start, success, successProducto, failure } = productosSlice.actions;

export const productoActions = {
  getProductos: [start, success, failure],
  getProductoById: [start, success, failure],
  addProducto: [start, success, failure],
  updateProducto: [start, success, failure],
  deleteProducto: [start, success, failure],
};

export default productosSlice.reducer;

export const getProductos = (): Thunk => async (dispatch) => {
    try {
      dispatch(start());
      const response = await axios.get<ProductosResponse>("Productos");
      console.log(response)
      dispatch(success(response.data.data));
      return response;
    } catch (error) {
        if (isAxiosError(error)) {
            // El error es de tipo AxiosError
            const errorMessage = error.message || "Error desconocido";
            dispatch(failure(errorMessage));
        } else {
            // El error no es de tipo AxiosError
            const errorMessage = typeof error === 'string' ? error : JSON.stringify(error);
            dispatch(failure(errorMessage));
        }
        return error;
    }
  };


export const getProductoById = (id: number): Thunk => async (dispatch) => {
    try {
        dispatch(start());
        const response = await axios.get<ProductoResponse>("Productos/"+id);
        dispatch(successProducto(response.data.data));
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          // El error es de tipo AxiosError
          const errorMessage = error.message || "Error desconocido";
          dispatch(failure(errorMessage));
        } else {
          // El error no es de tipo AxiosError
          const errorMessage = typeof error === 'string' ? error : JSON.stringify(error);
          dispatch(failure(errorMessage));
        }
        return error;
      }
};

export const addProducto = (producto: ProductoRequest): Thunk => async (dispatch) => {
    try {
        dispatch(start());
        const response = await axios.post("Productos", producto);
        dispatch(successProducto(response.data.data));
        return response;
    } catch (error) {
        if (isAxiosError(error)) {
            // El error es de tipo AxiosError
            const errorMessage = error.message || "Error desconocido";
            dispatch(failure(errorMessage));
        } else {
            // El error no es de tipo AxiosError
            const errorMessage = typeof error === 'string' ? error : JSON.stringify(error);
            dispatch(failure(errorMessage));
        }
        return error;
    }
};

export const updateProducto = (
  id: number,
  producto: ProductoModRequest
): Thunk => async (dispatch) => {
    try {
        dispatch(start());
        const response = await axios.put(`Productos/${id}`, producto);
        dispatch(successProducto(response.data.data));
        return response;
    } catch (error) {
        if (isAxiosError(error)) {
            // El error es de tipo AxiosError
            const errorMessage = error.message || "Error desconocido";
            dispatch(failure(errorMessage));
        } else {
            // El error no es de tipo AxiosError
            const errorMessage = typeof error === 'string' ? error : JSON.stringify(error);
            dispatch(failure(errorMessage));
        }
        return error;
    }
};

// export const deletePais = (id: number): Thunk => async (dispatch) => {
//   try {
//     dispatch(start());
//     await axios.delete(`paises/${id}`);
//     dispatch(success([])); // No hay necesidad de pasar datos aquí, ya que el país se eliminó
//   } catch (error) {
//     dispatch(failure(error.message));
//   }
// };
