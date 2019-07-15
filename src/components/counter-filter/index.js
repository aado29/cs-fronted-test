import React from 'react';
import './style.scss';

class CounterFilter extends React.Component {
  render() {
    const { filterValue, onChange, rule } = this.props;

    return (
      <div className="counter-filter">
        <form action="#" className="counter-filter__inner">
          <label htmlFor="filterValue">{rule.title}</label>
          <input type="text" name="filterValue" id="filterValue" value={filterValue} onChange={onChange}/>
        </form>
      </div>
    );
  }
}

export default CounterFilter;