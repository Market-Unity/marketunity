import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./css/Login.css"
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password : ''
    }
  }

  //Store the password & username upon input value change
  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  //Submit the login credentials to the server for verification
  handleSubmit = (un, pw) => {
    //POST Request to login route, using axios
    console.log(un, pw);
    // axios.post('/login', {username : this.state.username, password : this.state.password}).then(function() {
    //
    // })
  }

  //Render the form
  render() {
    return (
      <Form onSubmit = {this.handleSubmit(this.state.username, this.state.password)}>
        <FormGroup>
          <Label for="exampleEmail">Login</Label>
          <Input type="email" name="email" id="username" placeholder="Email" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange}/>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    );
  }
}
