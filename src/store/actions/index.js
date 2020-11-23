//acton creatorをここでbind

//logicは原則reducerに書く(Core Redux Concept)
//ただしasync codeはacton-creatorでok

export {
    add,
    subtract,
    increment,
    decrement
} from './counter';
export {
    storeResult,
    deleteResult
} from './result';