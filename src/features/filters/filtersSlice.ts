import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Filter = "all" | "completed" | "incomplete";

interface FiltersState {
  filter: Filter;
  searchTerm: string;
}

const initialState: FiltersState = {
  filter: "all",
  searchTerm: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setFilter, setSearchTerm } = filtersSlice.actions;

export default filtersSlice.reducer;
