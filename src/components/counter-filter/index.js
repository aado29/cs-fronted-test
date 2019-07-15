import React from 'react';
import './style.scss';

class CounterFilter extends React.Component {
  render() {
    const { filterValue, onChange, rule } = this.props;

    return (
      <div className="counter-search-form">
        <form action="#" className="counter-search-form__inner">
          <fieldset>
            <label htmlFor="filterValue">{rule.title}</label>
            <input type="text" name="filterValue" id="filterValue" value={filterValue} onChange={onChange}/>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CounterFilter;