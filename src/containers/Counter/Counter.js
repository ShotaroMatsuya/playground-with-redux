import React, { Component } from 'react';
import { connect } from 'react-redux'; //connectはhocをreturn するfunctionであることに注意
import * as actionCreators from '../../store/actions/index'; //action creator

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import Card from '../../components/Card/Card';

class Counter extends Component {
  render() {
    let results = this.props.storedResults.map(strResult => (
      <Card
        key={strResult.id}
        clicked={() => this.props.onDeleteResult(strResult.id)}
      >
        {strResult.value}
      </Card>
    ));
    if (this.props.loading) {
      results = <LoadingIndicator />;
    }

    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 15"
          clicked={this.props.onSubtractCounter}
        />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>{results}</ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  //このstateはreducerで定義されているstate
  return {
    ctr: state.ctr.counter, //これでctrというkeyでglobal-stateにcomponentからアクセスできるようになる
    storedResults: state.res.results,
    loading: state.res.loading,
  };
};
const mapDispatchToProps = dispatch => {
  //引数にstoreオブジェクトの持っているdispatch関数が自動的に渡っている
  return {
    onIncrementCounter: () => dispatch(actionCreators.increment()), //これでonIncrementCounterというpropsが追加されcomponent内で使用できるようになった
    onDecrementCounter: () => dispatch(actionCreators.decrement()),
    onAddCounter: () => dispatch(actionCreators.add(10)),
    onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
    onStoreResult: result => dispatch(actionCreators.storeResult(result)),
    onDeleteResult: id => dispatch(actionCreators.deleteResult(id)), //componentからid(値)をreducerに渡したいときはactionオブジェクトを介す必要がある
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter); //connectはhocをreturn するfunction
