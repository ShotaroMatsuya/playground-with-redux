import * as actionTypes from './actionTypes';

//非同期処理したいaction creatorを別に作成する　
export const saveResult = (res) =>{
    // const updatedResult = res * 2;
    return {
        type:actionTypes.STORE_RESULT,
        result:res
    };
};


//redux-thunk middlewareのおかげでaction creator内で非同期関数を実行できる
//old actionをblockし、来たるべきタイミングで(引数に渡っている)dispatchを実行することができる
export const storeResult = (res) =>{
    return (dispatch,getState) => {
        //redux-thunkのおかげでdispatchとgetStateをaction-creatorで実行できる
        //ただ、global stateをaction-creator内で使用したいときはgetStateを使うよりもcomponentのmapDispatchToPropsの引数でglobal stateを渡すのがbest-practiceらしい
        setTimeout(()=>{
            const oldCounter = getState().ctr.counter;
            console.log(oldCounter);
            dispatch(saveResult(res));
        },2000);

    }
    
};
export const deleteResult = (resElId) =>{
    return {
        type:actionTypes.DELETE_RESULT,
        resultElId:resElId
    };
};