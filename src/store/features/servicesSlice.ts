import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceState {
  selectedServiceId: number | null;
}

const initialState: ServiceState = {
  selectedServiceId: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setSelectedServiceId: (state, action: PayloadAction<number | null>) => {
      state.selectedServiceId = action.payload;
    },
  },
});

export const { setSelectedServiceId } = serviceSlice.actions;
export default serviceSlice.reducer;
