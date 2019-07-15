import React from 'react';
import CounterItem from '../counter-item';
import CounterFilter from '../counter-filter';
import classNames from 'classnames';
import { MdFilterList, MdAdd, MdArrowDropDown } from 'react-icons/md';
import './style.scss';

class CounterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filterRules: [
        {
          title: 'Nombre',
          value: 'title',
        },
        {
          title: 'Menores a',
          value: 'min',
        },
        {
          title: 'Mayores a',
          value: 'max',
        }
      ],
      indexRule: 0,
      activeToggle: false,
    };
  }

  handleChange = e => {
    this.setState({filterValue: e.target.value})
  }

  handleChangeFiltrerRule(index) {
    this.setState({
      indexRule: index,
      activeToggle: false,
      filterValue: '',
    })
  }

  getTotalCounts = () => {
    let total = 0;
    this.getFilteredData().forEach(item => {
      total += item.count;
    });
    return total;
  }

  getFilteredData = () => {
    const { filterValue, filterRules, indexRule } = this.state;
    const { data } = this.props.countersState;
    const rule = filterRules[indexRule].value;

    if (rule === 'title') {
      return data.filter(item => item.title.indexOf(filterValue) >= 0);
    }
    
    if (rule === 'min' && parseInt(filterValue, 10)) {
      return data.filter(item => item.count < parseInt(filterValue, 10));
    }
    
    if (rule === 'max' && parseInt(filterValue, 10)) {
      return data.filter(item => item.count > parseInt(filterValue, 10));
    }

    return data;
  }

  render() {
    const { filterValue, filterRules, indexRule, activeToggle } = this.state;
    const { countersState, onAdd, onOrder, onDecreaseItem, onIncreaseItem, onRemoveItem } = this.props;
    const { isLoading, orderBy } = countersState;

    return (
      <div className="counter-list">
        <div className="counter-list__top-bar">
          <div className="counter-list__top-bar__title">
            <h2>Contadores</h2>
            <button className="btn-circle" onClick={onAdd}>
              <MdAdd />
            </button>
          </div>
          <div className="counter-list__top-bar__filter">
            <CounterFilter
              rule={filterRules[indexRule]}
              searchPhrase={filterValue}
              onChange={this.handleChange}
            />
            <div className={classNames('counter-list__toggle-filter', { 'counter-list__toggle-filter--active': activeToggle })}>
              <button
                type="button"
                className="btn-circle counter-list__toggle-filter__button"
                onClick={e => this.setState({activeToggle: !activeToggle})}
              >
                <MdFilterList />
              </button>
              <ul className="counter-list__toggle-filter__options">
                {filterRules.map((rule, index) => (
                  <li className="counter-list__toggle-filter__item" key={index}>
                    <button type="button" onClick={e => this.handleChangeFiltrerRule(index)}>{rule.title}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="counter-list__header">
          <button
            type="button"
            className={classNames({'active': orderBy === 'title'})}
            onClick={e => onOrder()}
          >
            Nombre
            {orderBy === 'title' && <MdArrowDropDown />}
          </button>
          <button
            type="button"
            className={classNames({'active': orderBy === 'count'})}
            onClick={e => onOrder('count')}
          >
            Cantidad
            {orderBy === 'count' && <MdArrowDropDown />}
          </button>
        </div>
        <ul className="counter-list__body">
          {this.getFilteredData().map(item => (
            <li className="counter-list__item" key={item.id}>
              <CounterItem
                data={item}
                disabled={isLoading}
                onDecrease={onDecreaseItem}
                onIncrease={onIncreaseItem}
                onRemove={onRemoveItem}
              ></CounterItem>
            </li>
          ))}
        </ul>
        <div className="counter-list__footer">
          <h4 className="counter-list__total">Total {this.getTotalCounts()}</h4>
        </div>
      </div>
    )
  }
}

export default CounterList;