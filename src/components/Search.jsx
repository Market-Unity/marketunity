import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/Search.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form inline>
        <Col>
          <FormGroup>
            <Label for="search" hidden>Search</Label>
            <Input type="search" name="Search" id="search" placeholder="Search" onChange={this.props.changeQueryState}/>
          </FormGroup>
        </Col>
        {' '}
        <Button color="primary" onClick={this.props.sendQuery}>Submit</Button>
      </Form>
    );
  }
}
