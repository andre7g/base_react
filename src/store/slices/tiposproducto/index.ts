import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from "store/store";
import axios from "../../../utils/axios";
import { TiposProductoResponse, DataTipoProducto } from "../../../interfaces/TiposProducto/TiposProducto";
import { isAxiosError } from "axios";

interface TiposProductoState {
  tiposProducto: DataTipoProducto[];
  loading: boolean;
  error: string | null;
}

const initialState: TiposProductoState = {
  tiposProducto: [],
  loading: false,
  error: null,
};

const tiposProductosSlice = createSlice({
  name: "tiposproductos",
  initialState,
  reducers: {
    start(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action: PayloadAction<DataTipoProducto[]>) {
      state.tiposProducto = action.payload;
      state.loading = false;
      state.error = null;
    },
    failure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { start, success, failure } = tiposProductosSlice.actions;

export const paisActions = {
  getTiposProducto: [start, success, failure],
  // addPais: [start, success, failure],
  // updatePais: [start, success, failure],
  // deletePais: [start, success, failure],
};

export default tiposProductosSlice.reducer;

export const getTiposProducto = (): Thunk => async (dispatch) => {
  try {
    dispatch(start());
    const response = await axios.get<TiposProductoResponse>("tipo_producto");
    console.log(response)
    dispatch(success(response.data.data));
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
  }
};
// export const getPaisesByEstado = (estado: string): Thunk => async (
//   dispatch
// ) => {
//   try {
//     dispatch(start());
//     const response = await axios.get(`paises/byEstado?estado=${estado}`);
//     dispatch(success(response.data));
//   } catch (error) {
//     dispatch(failure(error.message));
//   }
// };

// export const getPaisById = (id: number): Thunk => async (dispatch) => {
//   try {
//     dispatch(start());
//     const response = await axios.get(`paises/${id}`);
//     dispatch(success([response.data]));
//   } catch (error) {
//     dispatch(failure(error.message));
//   }
// };

// export const addPais = (pais: PaisRequest): Thunk => async (dispatch) => {
//   try {
//     dispatch(start());
//     const response = await axios.post("paises", pais);
//     dispatch(success(response.data));
//   } catch (error) {
//     dispatch(failure(error.message));
//   }
// };

// export const updatePais = (
//   id: number,
//   pais: PaisRequest
// ): Thunk => async (dispatch) => {
//   try {
//     dispatch(start());
//     const response = await axios.put(`paises/${id}`, pais);
//     dispatch(success(response.data));
//   } catch (error) {
//     dispatch(failure(error.message));
//   }
// };

// export const deletePais = (id: number): Thunk => async (dispatch) => {
//   try {
//     dispatch(start());
//     await axios.delete(`paises/${id}`);
//     dispatch(success([])); // No hay necesidad de pasar datos aquí, ya que el país se eliminó
//   } catch (error) {
//     dispatch(failure(error.message));
//   }
// };
