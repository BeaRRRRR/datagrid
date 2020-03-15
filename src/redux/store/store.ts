import { createStore } from 'redux';
import rootReducer from '../reducers/reducers';

export default createStore(
    // @ts-ignore
    rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
