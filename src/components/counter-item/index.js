import React from 'react';
import {
  MdAdd,
  MdRemove,
  MdDeleteForever
} from 'react-icons/md';
import './style.scss';

class CounterItem extends React.Component {
  render() {
    const { data, disabled, onDecrease, onIncrease, onRemove } = this.props;

    return (
      <div className="counter-item">
        <div className="counter-item__cel">
          <p className="counter-item__label">{data.title}</p>
        </div>
        <div className="counter-item__cel">
          <p className="counter-item__label">{data.count}</p>
          <div className="counter-item__actions">
            <button
              type="button"
              className="btn-circle counter-item__button"
              disabled={disabled}
              onClick={e => onDecrease(data.id)}
            >
              <MdRemove />
            </button>
            <button
              type="button"
              className="btn-circle counter-item__button"
              disabled={disabled}
              onClick={e => onIncrease(data.id)}
            >
              <MdAdd />
            </button>
            <button
              type="button"
              className="btn-circle counter-item__button"
              disabled={disabled}
              onClick={e => onRemove(data.id)}
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CounterItem;