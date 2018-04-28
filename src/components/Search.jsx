import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/Search.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.sendQuery();
    }
  }

  render() {
    return (
      <Form inline>
        <Col>
          <FormGroup>
            <Label for="search" hidden>Search</Label>
            <Input type="search" name="Search" id="search" placeholder="Search" 
              onChange={this.props.changeQueryState}
              onKeyPress={this.handleKeyPress.bind(this)}  
            />
          </FormGroup>
        </Col>
        {' '}
        <Button color="primary" onClick={this.props.sendQuery}>Submit</Button>
      </Form>
    );
  }
}
