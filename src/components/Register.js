import React, {Component} from 'react';

class Register extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <p>ID: {this.props.id}</p>
          <p>Name: {this.props.name}</p>
          <p>Avatar: {this.props.avatar}</p>
          <p>Color: {this.props.avatar}</p>
        </form>
      </div>
    );
  }
}

export default Register;
