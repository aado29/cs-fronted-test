import React from 'react';
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
      <form action="#" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="title">Titulo</label>
          <input type="text" name="title" id="title" value={title} onChange={this.handleChange}/>
          <button type="submit">Agregar</button>
        </fieldset>
      </form>
    );
  }
}

export default CounterAddForm;