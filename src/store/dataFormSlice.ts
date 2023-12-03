import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormFilds, COUNTRIES } from '../types';
type TDataState = {
  data: IFormFilds[];
  countries: string[];
};

const initialState: TDataState = {
  data: [],
  countries: COUNTRIES,
};

const dataFormSlice = createSlice({
  name: 'dataForm',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IFormFilds>) {
      state.data.push(action.payload);
    },
  },
});
export const { setData } = dataFormSlice.actions;
export default dataFormSlice.reducer;
