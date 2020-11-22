import React, { Component } from 'react';
import {connect} from 'react-redux';//connectはhocをreturn するfunctionであることに注意

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionType from '../../store/actions';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult=>(
                        <li key={strResult.id} onClick={()=>this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state =>{//このstateはreducerで定義されているstate
    return {
        ctr:state.ctr.counter,//これでctrというkeyでglobal-stateにcomponentからアクセスできるようになる
        storedResults: state.res.results
    };
};
const mapDispatchToProps = dispatch =>{//引数にstoreオブジェクトの持っているdispatch関数が自動的に渡っている
    return {
        onIncrementCounter: () => dispatch({type:actionType.INCREMENT}),//これでonIncrementCounterというpropsが追加されcomponent内で使用できるようになった　
        onDecrementCounter:()=>dispatch({type:actionType.DECREMENT}),
        onAddCounter:()=>dispatch({type:actionType.ADD, val:10}),
        onSubtractCounter:()=>dispatch({type:actionType.SUBTRACT,val:15}),
        onStoreResult:(result)=>dispatch({type:actionType.STORE_RESULT,result:result}),
        onDeleteResult:(id)=>dispatch({type:actionType.DELETE_RESULT,resultElId:id}),//componentからid(値)をreducerに渡したいときはactionオブジェクトを介す必要がある
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Counter);//connectはhocをreturn するfunction