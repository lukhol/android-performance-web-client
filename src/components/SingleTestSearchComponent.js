import React, { Component, Fragment } from 'react';

import { Row, Col } from 'react-bootstrap';
import { Input, Button } from 'mdbreact';

export default class SingleTestSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonClicked = this.handleButtonClicked.bind(this);
        this.handleOnInputChage = this.handleOnInputChage.bind(this);
        
        this.Alert = this.Alert.bind(this);
    }

    handleButtonClicked(e) {
        this.props.onSearchResultsButtonClicked(e);
    }

    handleOnInputChage(e) {
        this.props.handleChange(e);
    }

    Alert() {
        return (
            <div className="alert alert-danger"style={{marginTop:"15px"}}>Not found results.</div>
        )
    }

    render() {
        return(
            <Row className="slideIn-right scaleIn">
                <Col lg={3}></Col>
                <Col lg={6} lgOffset={3} className="center-block">
                    <div className="card card-body center-block" style={{padding: "15px"}}>
                        <Input label="Provide your test id" value={this.props.inputValue} onChange={this.handleOnInputChage} name="searchingTestId"/>
                        <Button block color={this.props.buttonColor} rounded onClick={this.handleButtonClicked}>Search for results</Button>
                        { this.props.success ? "" : this.Alert()}
                    </div>
                </Col>
            </Row>
        )
    }
}

SingleTestSearchComponent.defaultProps = {
    buttonColor: "info"
};