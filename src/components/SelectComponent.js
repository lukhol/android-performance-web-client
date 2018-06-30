import React from 'react';

import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Button } from 'mdbreact';
import './css/SelectComponent.css';

export default class SelectComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleButtonClicked = this.handleButtonClicked.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    handleButtonClicked(event) {
        if(this.props.onSearchButtonClicked != undefined)
            this.props.onSearchButtonClicked(event);
    }

    onSelectChange(event) {
        if(this.props.onSelectChange != undefined)
            this.props.onSelectChange(event.target.value);
    }

    render() {
        const values = [];
        if(this.props.values != undefined) {
            let key = 0;
            for(let singleValue of this.props.values) {
                values.push(
                    <option key={key++} value={singleValue}>{singleValue}</option>
                );
            }
        }

        return (
            <Row className="slideIn-right scaleIn">
                <Col lg={3}></Col>
                <Col lg={6} lgOffset={3} className="center-block">
                    <div className="card card-body center-block" style={{padding: "15px"}}>
                        <label style={{color: "#757575"}}>{this.props.label}</label>
                        <FormGroup controlId="formControlsSelect">
                            <FormControl componentClass="select" 
                                         className="minimal"
                                         placeholder={this.props.placeholder}
                                         onChange={this.onSelectChange}>
                                {values}
                            </FormControl>
                        </FormGroup>
                        <Button block 
                                rounded 
                                color={this.props.buttonColor} 
                                style={{marginTop: "15px"}}
                                onClick={this.handleButtonClicked}>Search</Button>
                    </div>
                </Col>
            </Row>
        )
    }
}