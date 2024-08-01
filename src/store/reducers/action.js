import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawerOpen: false,
  drawerType: '',
  sortOption: '',
  filterOptions: [],
  city: 'Москва',
};

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.drawerOpen = true;
      state.drawerType = action.payload;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
    },
    setDrawerType: (state, action) => {
      state.drawerType = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setFilterOptions: (state, action) => {
      const { id, checked } = action.payload;

      if (state.filterOptions.find((item) => item.id === id)) {
        state.filterOptions = state.filterOptions.map((item) =>
          item.id === id ? { ...item, checked } : item
        );
      } else {
        state.filterOptions = [...state.filterOptions, { id, checked }];
      }
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { openDrawer, closeDrawer, setDrawerType, setSortOption, setFilterOptions, setCity } =
  actionSlice.actions;

export default actionSlice.reducer;
