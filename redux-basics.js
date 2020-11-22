const { useStore } = require('react-redux');
const redux = require('redux');
const createStore = redux.createStore;

//reduxを使うべきstate
// 1.Local UI state : Mostly handled within components
// 2.Persistent State(ex.AllUsers or AllPosts information) : stored on server, relevant slice managed by redux
// 3.Client State (ex:isAuth,filters set by users) : Managed via Redux
//結論:多くのcomponentに影響を及ぼすstateはreduxで管理すると良い




const initialState = {
    counter:0
}

//Reducer...関数,storeの初期化に必要, 最新のstateを返す, storeと強い結びつきをもつ、一つにまとめられている必要がある
const rootReducer = (state = initialState,action) =>{//第一引数にstateオブジェクト,第2引数にactionオブジェクト
    if(action.type === 'INC_COUNTER'){//stateの更新は必ずimmutableに行う
        return {
            ...state,//old stateをすべてコピー
            counter:state.counter + 1//新しいstateのみを上書き
        };
    }
    if(action.type === 'ADD_COUNTER'){//stateの更新は必ずimmutableに行う
        return {
            ...state,//old stateをすべてコピー
            counter:state.counter + action.value
        };
    }
    return state;
};

//Store...javascript object ,stateを保管,reducerをregisterする
const store = createStore(rootReducer);
console.log(store.getState());

//Subscription...actionがreducerに届けられるたびに自動で呼び出される
store.subscribe(()=>{
    console.log('[Subscription]',store.getState());
});

//Dispatching Action...type property を持っていないといけない
store.dispatch({type:'INC_COUNTER'});
store.dispatch({type:'ADD_COUNTER',value :10});
console.log(store.getState());
