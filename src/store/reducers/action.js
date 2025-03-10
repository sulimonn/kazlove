import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawerOpen: false,
  drawerType: '',
  sortOption: {},
  filterOptions: [],
  city: parseInt(localStorage.getItem('city')) || -2,
  gender: localStorage.getItem('gender')
    ? localStorage.getItem('gender').toString().split(',').map(Number)
    : [],
  services: localStorage.getItem('services') ? JSON.parse(localStorage.getItem('services')) : [],
  breast_size: localStorage.getItem('breast_size')
    ? localStorage.getItem('breast_size').split(',').map(Number)
    : [],
  age: localStorage.getItem('age') ? localStorage.getItem('age').split(',').map(Number) : [],
  height: localStorage.getItem('height')
    ? localStorage.getItem('height').split(',').map(Number)
    : [],
  weight: localStorage.getItem('weight')
    ? localStorage.getItem('weight').split(',').map(Number)
    : [],
  profile_type: localStorage.getItem('profile_type'),
  price: localStorage.getItem('price') ? localStorage.getItem('price').split(',').map(Number) : [],
  email: localStorage.getItem('email') || null,
  password: localStorage.getItem('password') || null,
  codeSent: localStorage.getItem('codeSent') || false,
  balanceOpen: false,
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
      const { id, filter } = action.payload;
      state[filter] = id;
      localStorage.setItem(filter, id);
    },
    setSwiperFilter: (state, action) => {
      const { id, option } = action.payload;
      console.log(id, option);

      state[id] = option;
      localStorage.setItem(id, option);
    },
    setCity: (state, action) => {
      state.city = action.payload;
      localStorage.setItem('city', action.payload);
    },
    setGender: (state, action) => {
      const id = parseInt(action.payload);
      const gender = state.gender.map((item) => parseInt(item));

      if (gender.includes(id)) {
        gender.splice(gender.indexOf(id), 1);
      } else {
        gender.push(id);
      }

      state.gender = gender;
      localStorage.setItem('gender', gender);
    },
    setServices: (state, action) => {
      if (JSON.stringify(state.services) !== JSON.stringify(action.payload)) {
        state.services = action.payload;
        localStorage.setItem('services', JSON.stringify(action.payload));
      }
    },

    setEmail: (state, action) => {
      state.codeSent = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
      localStorage.setItem('codeSent', true);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('password', action.payload.password);
    },
    resetCode: (state, action) => {
      state.codeSent = false;
      state.email = null;
      state.password = null;
      localStorage.removeItem('codeSent');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    },
    setBalanceOpen: (state, action) => {
      state.balanceOpen = action.payload;
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  setDrawerType,
  setSortOption,
  setFilterOptions,
  setCity,
  setGender,
  setSwiperFilter,
  setServices,
  setEmail,
  resetCode,
  setBalanceOpen,
} = actionSlice.actions;

export default actionSlice.reducer;
