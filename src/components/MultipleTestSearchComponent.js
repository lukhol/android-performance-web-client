import React from 'react';
import MultiSelectReact from 'multi-select-react';

import { Row, Col } from 'react-bootstrap';
import { Button } from 'mdbreact';

import './css/SelectComponent.css';

export default class MultipleTestSearchComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selectedBadgeClicked = this.selectedBadgeClicked.bind(this);
        this.optionClicked = this.optionClicked.bind(this);
        this.handleButtonClicked = this.handleButtonClicked.bind(this);
    }

    handleButtonClicked(e) {
        this.props.onSearchResultsButtonClicked(e);
    }

    optionClicked(optionsList) {
        this.props.optionClicked(optionsList);
    }

    selectedBadgeClicked(optionsList) {
        this.props.selectedBadgeClicked(optionsList);
    }

    render() {
        return (
            <Row className="slideIn-right scaleIn">
                <Col lg={3}></Col>
                <Col lg={6} lgOffset={3} className="center-block">
                    <div className="card card-body center-block" style={{padding: "15px"}}>
                        <label style={{color: "#757575"}}>{this.props.label}</label>
                        <MultiSelectReact options={this.props.multiSelect}
                                          className="minimal"
                                          optionClicked={this.optionClicked.bind(this)}
                                          selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
                        />  
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