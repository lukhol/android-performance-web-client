import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import './css/SummaryPage.css';
import TestSummaryCharComponent from '../components/TestSummaryCharComponent';
import SingleTestSearchComponent from '../components/SingleTestSearchComponent';
import MultipleTestSearchComponent from '../components/MultipleTestSearchComponent';

//React bootstrap:
import { Row, Col } from 'react-bootstrap';
import { Input, Button } from 'mdbreact';
import Loader from 'react-loaders';

import * as SingleTestAction from '../actions/SingleTestAction';
import * as AverageTestSummaryAction from '../actions/AverageTestSummaryAction';

class SummaryPage extends Component {
    constructor(props) {
        super(props);

        this.keyCounter = 1000;
        this.inputKey = 123456789;

        this.prepareLoaderContent = this.prepareLoaderContent.bind(this);
        this.onSingleSearchResultsButtonClicked = this.onSingleSearchResultsButtonClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.preparePageContent = this.preparePageContent.bind(this);

        this.state = {
            searchingTestId: (props.params.id === "0" ? "" : props.params.id)
        };

        if(props.params.id !== "0")
            this.onSingleSearchResultsButtonClicked();
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
            return null;
        }
    }

    preparePageContent(success) {
        return (
            <React.Fragment>
                <SingleTestSearchComponent key={this.inputKey} 
                                            success={success}
                                            handleChange={this.handleChange}
                                            inputValue={this.state.searchingTestId} 
                                            onSearchResultsButtonClicked={this.onSingleSearchResultsButtonClicked}/>
            </React.Fragment>
        );
    }

    onSingleSearchResultsButtonClicked(event) {
        if(this.state.searchingTestId === "")
            return; 

        store.dispatch(SingleTestAction.getSingleTestResults(this.state.searchingTestId));
        this.inputKey++;
    }

    handleChange(event) {
        this.setState({
            [event.target.getAttribute('name')]: event.target.value.trim()
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
        success: store.singleTestState.success,
    }
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);