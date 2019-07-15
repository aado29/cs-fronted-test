import React from 'react';
import { connect } from 'react-redux';
import Modal from 'simple-react-modal';
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
    this.state = {
      openForm: false,
    }

    this.props.dispatch(getCounters());
  }

  handleAddCounter = title => {
    this.props.dispatch(addCounter(title));
    this.handleCloseForm();
  }

  handleIncrease = id => {
    this.props.dispatch(setCounter(id, 'increase'))
  }

  handleDecrease = id => {
    this.props.dispatch(setCounter(id, 'decrease'))
  }

  handleRemove = id => {
    this.props.dispatch(removeCounter(id))
  }

  handleOrderBy = (type = 'title') => {
    this.props.dispatch(setOrder(type))
  }

  handleOpenForm = () => {
    this.setState({'openForm': true});
  }

  handleCloseForm = () => {
    this.setState({'openForm': false});
  }

  render() {
    const { counters } = this.props;
    const { openForm } = this.state;

    return (
      <div className="body">
        <div className="body__inner">
          <Modal show={openForm} onClose={this.handleCloseForm} containerClassName="body__modal">
            <CounterAddForm onSubmit={this.handleAddCounter} />
          </Modal>
          <CounterList
            countersState={counters}
            onAdd={this.handleOpenForm}
            onOrder={this.handleOrderBy}
            onDecreaseItem={this.handleDecrease}
            onIncreaseItem={this.handleIncrease}
            onRemoveItem={this.handleRemove}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counters: state.counters,
});

export default connect(mapStateToProps)(Body);