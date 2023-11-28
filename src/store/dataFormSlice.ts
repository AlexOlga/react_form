import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormFilds, CONTRIES } from '../types';
type TDataState = {
  data: IFormFilds[];
  contries: string[];
};

const initialState: TDataState = {
  data: [],
  contries: CONTRIES,
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
