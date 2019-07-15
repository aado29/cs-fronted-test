import React from 'react';
import { MdAdd } from 'react-icons/md';
import './style.scss';

class CounterAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.title);
    this.setState({ title: '' });
  }

  render() {
    const { title } = this.state;

     return (
       <div className="counter-add-form">
          <h2 className="counter-add-form__title">Nuevo contador</h2>
          <form action="#" class="counter-add-form__inner" onSubmit={this.handleSubmit}>
            <div className="counter-add-form__group">
              <label htmlFor="title">Nombre</label>
              <input type="text" name="title" id="title" value={title} onChange={this.handleChange}/>
            </div>
            <button class="btn-circle" type="submit">
              <MdAdd />
            </button>
          </form>
        </div>
    );
  }
}

export default CounterAddForm;