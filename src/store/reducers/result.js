import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'; 

const initialState = {
    results:[]
}

//switchの外で複雑なlogicを定義することでswitch内の見通しが良くなる
const deleteResult = (state,action) =>{
    const updatedArray = state.results.filter(result=> result.id !== action.resultElId);
    return updateObject(state,{results:updatedArray});

}

//reducerによるstateのupdateはimmutableに行う必要があるので注意(setStateとは違う)
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.STORE_RESULT:
            return updateObject(state,{results:state.results.concat({id:new Date(), value: action.result*2})});
            
            // return{
            //     ...state,
            //     //Array.pushを使うとoriginalを変化させてしまうのでimmutableなメソッドであるconcatを使う
            //     results:state.results.concat({id:new Date(), value: action.result*2})
            //     // counterに関してはlocalで管理していないのでglobal stateから参照する必要がある(そのため、actionオブジェクトを介す必要がある)↑
            // }
        case actionTypes.DELETE_RESULT:
            
            // const id = 2;
            // const newArray = [...state.results];//arrayを複製
            // newArray.splice(id,1);//spliceはmutableなメソッド
            // const updatedArray = state.results.filter(result=> result.id !== action.resultElId);
            //filterはimmutableなメソッド,actionオブジェクトからidを取得する
            // return updateObject(state,{results:updatedArray});
            // return{
            //     ...state,
            //     //Array.pushを使うとoriginalを変化させてしまうのでimmutableなメソッドであるconcatを使う
            //     results:updatedArray
            // }
            return deleteResult(state,action);
    }
    return state;
};

export default reducer;