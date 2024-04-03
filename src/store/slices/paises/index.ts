import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Thunk } from "store/store";
import axios from "../../../utils/axios";
import { PaisRequest, PaisResponse } from "interfaces/pais/Pais";

interface PaisesState {
  paises: PaisResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: PaisesState = {
  paises: [],
  loading: false,
  error: null,
};

const paisesSlice = createSlice({
  name: "paises",
  initialState,
  reducers: {
    start(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action: PayloadAction<PaisResponse[]>) {
      state.paises = action.payload;
      state.loading = false;
      state.error = null;
    },
    failure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { start, success, failure } = paisesSlice.actions;

export const paisActions = {
  getPaises: [start, success, failure],
  addPais: [start, success, failure],
  updatePais: [start, success, failure],
  deletePais: [start, success, failure],
};

export default paisesSlice.reducer;

export const getPaises = (): Thunk => async (dispatch) => {
  try {
    dispatch(start());
    const response = await axios.get("paises");
    dispatch(success(response.data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const getPaisesByEstado = (estado: string): Thunk => async (
  dispatch
) => {
  try {
    dispatch(start());
    const response = await axios.get(`paises/byEstado?estado=${estado}`);
    dispatch(success(response.data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const getPaisById = (id: number): Thunk => async (dispatch) => {
  try {
    dispatch(start());
    const response = await axios.get(`paises/${id}`);
    dispatch(success([response.data]));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const addPais = (pais: PaisRequest): Thunk => async (dispatch) => {
  try {
    dispatch(start());
    const response = await axios.post("paises", pais);
    dispatch(success(response.data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const updatePais = (
  id: number,
  pais: PaisRequest
): Thunk => async (dispatch) => {
  try {
    dispatch(start());
    const response = await axios.put(`paises/${id}`, pais);
    dispatch(success(response.data));
  } catch (error) {
    dispatch(failure(error.message));
  }
};

export const deletePais = (id: number): Thunk => async (dispatch) => {
  try {
    dispatch(start());
    await axios.delete(`paises/${id}`);
    dispatch(success([])); // No hay necesidad de pasar datos aquí, ya que el país se eliminó
  } catch (error) {
    dispatch(failure(error.message));
  }
};
