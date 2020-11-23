import React, { Component } from 'react';
import {connect} from 'react-redux';//connectはhocをreturn するfunctionであることに注意
import * as actionCreators from '../../store/actions/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';


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
        onIncrementCounter: () => dispatch(actionCreators.increment()),//これでonIncrementCounterというpropsが追加されcomponent内で使用できるようになった　
        onDecrementCounter:()=>dispatch(actionCreators.decrement()),
        onAddCounter:()=>dispatch(actionCreators.add(10)),
        onSubtractCounter:()=>dispatch(actionCreators.subtract(15)),
        onStoreResult:(result)=>dispatch(actionCreators.storeResult(result)),
        onDeleteResult:(id)=>dispatch(actionCreators.deleteResult(id)),//componentからid(値)をreducerに渡したいときはactionオブジェクトを介す必要がある
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Counter);//connectはhocをreturn するfunction