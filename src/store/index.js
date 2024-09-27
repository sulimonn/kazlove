// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import auth from './reducers/auth';
import { apiSlice } from './reducers/apiSlice';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, auth.middleware),
  devTools: true,
});

const { dispatch } = store;

export { store, dispatch };
