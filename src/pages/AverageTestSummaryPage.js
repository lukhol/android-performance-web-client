import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import store from '../store';

import { Row, Col } from 'react-bootstrap';
import { Input, Button } from 'mdbreact';
import Loader from 'react-loaders';

import TestSummaryCharComponent from '../components/TestSummaryCharComponent';
import MultipleTestSearchComponent from '../components/MultipleTestSearchComponent';

import * as AverageTestSummaryAction from '../actions/AverageTestSummaryAction';

class AverageTestSummaryPage extends React.Component {
    constructor(props) {
        super(props);

        //Multiselect neccessary functions:
        this.onMultiSelectOptionClicked = this.onMultiSelectOptionClicked.bind(this);
        this.onMultiSelectSelectedBadgeClicked = this.onMultiSelectSelectedBadgeClicked.bind(this);
        this.onMultipleSearchResultsButtonClicked = this.onMultipleSearchResultsButtonClicked.bind(this);
        this.preparePageContent = this.preparePageContent.bind(this);
        this.prepareLoaderContent = this.prepareLoaderContent.bind(this);

        const multiSelect = [];
        if(this.props.allTestIds != null) {
            for(let testSummaryId of this.props.allTestIds) {
                multiSelect.push(
                    {id: testSummaryId, label: testSummaryId, value: false}
                );
            }
        }

        this.state = {
            multiSelect: multiSelect,
            allIds: this.props.allTestIds
        };
    }

    onMultiSelectOptionClicked(optionsList) {
        this.setState({ multiSelect: optionsList });
    }

    onMultiSelectSelectedBadgeClicked(optionsList) {
        this.setState({ multiSelect: optionsList });
    }

    onMultipleSearchResultsButtonClicked(event) {
        //Action here
        const selectedTestSummaryIds = [];
        for(let multiSelectItem of this.state.multiSelect) {
            if (multiSelectItem.value == true) 
                selectedTestSummaryIds.push(multiSelectItem.id);
        }

        store.dispatch(AverageTestSummaryAction.getAverageTestSummaryAction(selectedTestSummaryIds));
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
        return(
            <MultipleTestSearchComponent onSearchResultsButtonClicked={this.onMultipleSearchResultsButtonClicked}
                                         multiSelect={this.state.multiSelect}
                                         optionClicked={this.onMultiSelectOptionClicked}
                                         selectedBadgeClicked={this.onMultiSelectSelectedBadgeClicked}/>
        )
    }

    render() {
        const { isBusy, averageTestSummary, success } = this.props;

        let content = "";
        if(!isBusy) {
            if(success) {
                content = (
                    <div>
                        <TestSummaryCharComponent testResults={averageTestSummary}/>
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

        if(!isBusy && success && averageTestSummary == null) {
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
        averageTestSummary: store.averageTestSummaryState.averageTestSummary,
        success: store.averageTestSummaryState.success,
        allTestIds: store.testIdsState.testIds
    };
}

const mapDispatchToProps = dispatch => {
    return { 

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AverageTestSummaryPage);