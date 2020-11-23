import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';//reduxのstoreをreactのcomponentに紐付けるために必要
import thunk from 'redux-thunk';//action creator内でasynchronous functionを使用するために必要

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({//global stateにアクセスするには、ここで定義したkeyを使用する
    ctr:counterReducer,
    res:resultReducer
});

const logger = store =>{//middlewareを作成
    return next =>{
        return action =>{
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
