import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import reducer from '@/redux/reducers/index.js';

const store = configureStore({
  reducer,
  middleware: [thunk],
});
export default store;
