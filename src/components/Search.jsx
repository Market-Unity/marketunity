import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./css/Search.css"

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <Label for="search" hidden>Search</Label>
          <Input type="search" name="search" id="search" placeholder="search" onChange = {this.props.handleQuery}/>
        </FormGroup>
        {' '}
        <Button color="primary">Submit</Button>
      </Form>
    );
  }
}
