import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import './css/SummaryPage.css';
import TestSummaryCharComponent from '../components/TestSummaryCharComponent';

//React bootstrap:
import { Row, Col } from 'react-bootstrap';
import { Input, Button } from 'mdbreact';
import Loader from 'react-loaders'

import * as SingleTestAction from '../actions/SingleTestAction';

class SummaryPage extends Component {
    constructor(props) {
        super(props);

        this.keyCounter = 1000;
        this.inputKey = 123456789;

        this.prepareLoaderContent = this.prepareLoaderContent.bind(this);
        this.onSearchResultsButtonClicked = this.onSearchResultsButtonClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.preparePageContent = this.preparePageContent.bind(this);

        this.state = {
            searchingTestId: (props.params.id === "0" ? "" : props.params.id)
        };

        if(props.params.id !== "0")
            this.onSearchResultsButtonClicked();
    }

    prepareLoaderContent(isBusy) {
        if(isBusy) {
            return (
                <React.Fragment>
                    <div key={this.keyCounter++} className="display-middle">
                        <Loader type="ball-pulse-sync"
                                color="#c9c9c9" />
                    </div>
                </React.Fragment>
            );
        } else {
            return <div key={this.keyCounter++}></div>;
        }
    }

    preparePageContent(success) {
        return (
            <Row className="slideIn-right scaleIn" key={this.inputKey}>
                <Col lg={3}></Col>
                <Col lg={6} lgOffset={3} className="center-block">
                    <div className="card card-body center-block" style={{padding: "15px"}}>
                        <Input label="Provide your test id" value={this.state.searchingTestId} onChange={this.handleChange} name="searchingTestId"/>
                        <Button block color="info" rounded onClick={this.onSearchResultsButtonClicked}>Search for results</Button>
                        { success ? "" : (<div className="alert alert-danger"style={{marginTop:"15px"}}>Not found results.</div>)}
                    </div>
                </Col>
            </Row>
        );
    }

    onSearchResultsButtonClicked(event) {
        store.dispatch(SingleTestAction.getSingleTestResults(this.state.searchingTestId));
        this.inputKey++;
    }

    handleChange(event) {
        this.setState({
            [event.target.getAttribute('name')]: event.target.value
        });
    }

    render() {
        const { isBusy, testResults, success } = this.props;

        let content = "";

        if(!isBusy) {
            if(success) {
                content = (
                    <div>
                        <TestSummaryCharComponent testResults={testResults}/>
                        <hr/>
                        {this.preparePageContent(success)}
                    </div>
                );
            } else {
                content = this.preparePageContent(success);
            }
        } else {
            content = this.prepareLoaderContent(isBusy);;
        }

        if(!isBusy && success && testResults == null) {
            content = this.preparePageContent(success);
        }
        
        return (
            <div className="app-container">
                <div>
                    {content}
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        isBusy: store.singleTestState.isBusy,
        testResults: store.singleTestState.testResults,
        success: store.singleTestState.success
    }
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);