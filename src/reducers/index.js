import {combineReducers} from 'redux';
import accountDetailsReducer from './acoountDetails';
import userDetails from './StudentDetails';

const rootReducer = combineReducers({
    accountDetails : accountDetailsReducer,
    StudentDetails : userDetails,
})

export default rootReducer;