import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth';
import profile from './profile';
import transactions from './transactions';
import transfer from './transfer';

const reducer = combineReducers({
  auth,
  profile,
  transactions,
  transfer,
});
export default reducer;
