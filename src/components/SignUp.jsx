import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/SignUp.css';
import axios from 'axios';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    // Bound both functions in constructor for simplicity
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Store the password & username upon input value change
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  //Submit the login credentials to the server for verification
  handleSubmit(un, pw) {
    //POST Request to login route, using axios
    axios.post('/register', {username: this.state.username, password: this.state.password})
      .then((data) => {
        // Handle Success
        if (data.data) {
          axios.post('/login', { username: this.state.username, password: this.state.password })
            .then(({ data }) => {
              // Handle Token Persistance Here
              window.sessionStorage.token = data.data.token;
              alert(data.message);
            });
        } else {
          // Handle Failed Signin
          alert(data.message);
        }
      });
  }

  //Render the form
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Register</Label>
          <Input type="email" name="email" id="username" placeholder="Email" onBlur={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="password" placeholder="Password" onBlur={this.handleChange}/>
        </FormGroup>
        <Button color="primary" onClick={() => { this.handleSubmit(this.state.username, this.state.password); }}>Submit</Button>
      </Form>
    );
  }
}
