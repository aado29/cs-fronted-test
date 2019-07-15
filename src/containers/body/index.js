import React from 'react';
import { connect } from 'react-redux';
import {
  getCounters,
  addCounter,
  removeCounter,
  setCounter,
  setOrder
} from '../../store/actions/counters';
import CounterAddForm from '../../components/counter-add-form';
import CounterList from '../../components/counter-list';
import './style.scss';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(getCounters());

    this.handleAddCounter = this.handleAddCounter.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleOrderBy = this.handleOrderBy.bind(this);
  }

  handleAddCounter(title) {
    this.props.dispatch(addCounter(title));
  }

  handleIncrease(id) {
    this.props.dispatch(setCounter(id, 'increase'))
  }

  handleDecrease(id) {
    this.props.dispatch(setCounter(id, 'decrease'))
  }

  handleRemove(id) {
    this.props.dispatch(removeCounter(id))
  }

  handleOrderBy(type = 'title') {
    this.props.dispatch(setOrder(type))
  }

  render() {
    const { counters } = this.props;

    return (
      <div className="body">
        <CounterAddForm onSubmit={this.handleAddCounter} />
        <CounterList
          countersState={counters}
          onOrder={this.handleOrderBy}
          onDecreaseItem={this.handleDecrease}
          onIncreaseItem={this.handleIncrease}
          onRemoveItem={this.handleRemove} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counters: state.counters,
});

export default connect(mapStateToProps)(Body);