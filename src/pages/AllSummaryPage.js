import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import TestSummaryCharComponent from '../components/TestSummaryCharComponent';

//React bootstrap:
import Loader from 'react-loaders'

import * as AllTestsAction from '../actions/AllTestsAction';

class AllSummaryPage extends Component {
    constructor(props) {
        super(props);

        this.prepareLoaderContent = this.prepareLoaderContent.bind(this);
        store.dispatch(AllTestsAction.getAllTestResults());
    }

    prepareLoaderContent(isBusy) {
        if(isBusy) {
            return (
                <div key={this.keyCounter++} className="display-middle">
                    <Loader type="ball-pulse-sync"
                            color="#c9c9c9" />
                </div>
            );
        } else {
            return <div key={this.keyCounter++}></div>;
        }
    }

    render() {
        const { isBusy, allTests, success } = this.props;
        console.log(allTests);
        let content = "";

        if(!isBusy) {
            if(success && allTests != null) {
                const testSummaryChartsArray = [];
                let i = 0;
                for(let singleTest of allTests) {
                    if(i%2==0)
                        testSummaryChartsArray.push(<TestSummaryCharComponent key={i++} testResults={singleTest} />);
                    else 
                        testSummaryChartsArray.push(<TestSummaryCharComponent key={i++} testResults={singleTest} left/>);
                }

                content = (
                    <div>
                        {testSummaryChartsArray}
                    </div>
                );
            } else {
                content = "Error occured";
            }
        } else {
            content = this.prepareLoaderContent(isBusy);
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
        isBusy: store.allTestsState.isBusy,
        allTests: store.allTestsState.allTests,
        success: store.allTestsState.success
    }
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllSummaryPage);