import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/Login.css';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Store the password & username upon input value change
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  //Submit the login credentials to the server for verification
  handleSubmit(un, pw) {
    //POST Request to login route, using axioss
    axios.post('/login', {username: this.state.username, password: this.state.password})
      .then((data) => {
        // Handle Token Persistance Here
        window.sessionStorage.token = data.data.token;
        window.sessionStorage.username = this.state.username;
        this.props.history.push('/');
        window.location.reload();
        alert(data.data.message);
      });
  }

  //Render the form
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Login</Label>
          <Input type="email" name="email" id="username" placeholder="Email" onChange={this.handleChange} onKeyPress={this.handleKeyPress.bind(this)}/>
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} onKeyPress={this.handleKeyPress.bind(this)}/>
        </FormGroup>
        <Button color="primary" onClick={() => { this.handleSubmit(this.state.username, this.state.password); } }>Submit</Button>
      </Form>
    );
  }
}
