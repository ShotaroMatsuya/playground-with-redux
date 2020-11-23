import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter:0
}
//reducerによるstateのupdateはimmutableに行う必要があるので注意(setStateとは違う)
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.INCREMENT:
            return updateObject(state,{counter:state.counter + 1});

            // const newState = Object.assign({},state);//stateオブジェクトのコピーを作る
            // newState.counter = state.counter + 1;
            // return newState;
        case actionTypes.DECREMENT:
            return updateObject(state,{counter:state.counter - 1});

            // return {
            //     ...state,//spread operatorを用いてもよし
            //     counter:state.counter - 1
            // }
        case actionTypes.ADD:
            return updateObject(state,{counter:state.counter + action.val});

            // return {
            //     ...state,
            //     counter:state.counter + action.val
            // }
        case actionTypes.SUBTRACT:
            return updateObject(state,{counter:state.counter - action.val});
            // return {
            //     ...state,
            //     counter:state.counter - action.val
            // }
        
    }
    return state;
};

export default reducer;