import React from 'react';
import './style.scss';

class CounterItem extends React.Component {
  render() {
    const { data, disabled, onDecrease, onIncrease, onRemove } = this.props;

    return (
      <div className="counter-item">
        <strong>Nombre:</strong> {data.title} - <strong>Cantidad:</strong> {data.count}<br />
        <button type="button" disabled={disabled} onClick={e => onDecrease(data.id)}>1-</button>
        <button type="button" disabled={disabled} onClick={e => onIncrease(data.id)}>1+</button>
        <button type="button" disabled={disabled} onClick={e => onRemove(data.id)}>Eliminar</button>
      </div>
    );
  }
}

export default CounterItem;