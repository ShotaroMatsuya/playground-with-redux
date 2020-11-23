export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';


//action creators...objectをreturnするfunction
export const increment = () =>{
    return {
        type:INCREMENT
    };
};
export const decrement = () =>{
    return {
        type:DECREMENT
    };
};
export const add = (value) =>{
    return {
        type:ADD,
        val:value
    };
};
export const subtract = (value) =>{
    return {
        type:SUBTRACT,
        val:value
    };
};
//非同期処理したいaction creatorを別に作成する　
export const saveResult = (res) =>{
    return {
        type:STORE_RESULT,
        result:res
    };
};


//redux-thunk middlewareのおかげでaction creator内で非同期関数を実行できる
//old actionをblockし、来たるべきタイミングで(引数に渡っている)dispatchを実行することができる
export const storeResult = (res) =>{
    return dispatch => {//関数を返す
        setTimeout(()=>{
            dispatch(saveResult(res));
        },2000);

    }
    
};
export const deleteResult = (resElId) =>{
    return {
        type:DELETE_RESULT,
        resultElId:resElId
    };
};