import { combineReducers, createStore } from 'redux';
import { sinhVienReducer } from './reducers/sinhVienReducer';
//? store sẽ cung cấp cho component các reducer( là 1 hàm chứa state, bao gồm cả setState)
//? rootReducer : reduce tổng chứa nhiều reducer

const rootReducer = combineReducers({
   sinhVienReducer: sinhVienReducer,
});

export const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
