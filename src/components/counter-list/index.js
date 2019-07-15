import React from 'react';
import CounterItem from '../counter-item'
import CounterFilter from '../counter-filter'
import './style.scss';

class CounterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filterRules: [{
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
      }],
      indexRule: 0,
    };
  }

  handleChange = e => {
    this.setState({filterValue: e.target.value})
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
    const { filterValue, filterRules, indexRule } = this.state;
    const { countersState, onOrder, onDecreaseItem, onIncreaseItem, onRemoveItem} = this.props;
    const { isLoading } = countersState;
    return (
      <div className="counter-list">
        <CounterFilter
          rules=""
          rule={filterRules[indexRule]}
          searchPhrase={filterValue}
          onChange={this.handleChange}
        />
        <button type="button" onClick={e => onOrder()}>Ordenar por nombre</button>
        <button type="button" onClick={e => onOrder('count')}>Ordenar por cantidad</button>
        <ul className="counter-list__inner">
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
        <h4 className="counter-list__total">Total {this.getTotalCounts()}</h4>
      </div>
    )
  }
}

export default CounterList;