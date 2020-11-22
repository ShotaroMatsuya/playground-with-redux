import * as actionTypes from '../actions';

const initialState = {
    results:[]
}
//reducerによるstateのupdateはimmutableに行う必要があるので注意(setStateとは違う)
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.STORE_RESULT:
            return{
                ...state,
                //Array.pushを使うとoriginalを変化させてしまうのでimmutableなメソッドであるconcatを使う
                results:state.results.concat({id:new Date(), value: action.result})
                // counterに関してはlocalで管理していないのでglobal stateから参照する必要がある(そのため、actionオブジェクトを介す必要がある)↑
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];//arrayを複製
            // newArray.splice(id,1);//spliceはmutableなメソッド
            const updatedArray = state.results.filter(result=> result.id !== action.resultElId);
            //filterはimmutableなメソッド,actionオブジェクトからidを取得する
            return{
                ...state,
                //Array.pushを使うとoriginalを変化させてしまうのでimmutableなメソッドであるconcatを使う
                results:updatedArray
            }
    }
    return state;
};

export default reducer;