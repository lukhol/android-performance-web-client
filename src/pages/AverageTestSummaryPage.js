import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import './css/Main.css';

import Loader from 'react-loaders';

import TestSummaryCharComponent from '../components/TestSummaryCharComponent';
import MultipleTestSearchComponent from '../components/MultipleTestSearchComponent';
import SelectComponent from '../components/SelectComponent';

import * as AverageTestSummaryAction from '../actions/AverageTestSummaryAction';
import * as TestIdsAction from '../actions/testIdsAction';
import * as AndroidVersionsAction from '../actions/AndroidVersionsAction';

class AverageTestSummaryPage extends React.Component {
    constructor(props) {
        super(props);

        //Multiselect neccessary functions:
        this.onMultiSelectOptionClicked = this.onMultiSelectOptionClicked.bind(this);
        this.onMultiSelectSelectedBadgeClicked = this.onMultiSelectSelectedBadgeClicked.bind(this);
        this.onMultipleSearchResultsButtonClicked = this.onMultipleSearchResultsButtonClicked.bind(this);
        this.onAndroidVersionSearchButtonClicked = this.onAndroidVersionSearchButtonClicked.bind(this);
        this.onAndroidVersionSelected = this.onAndroidVersionSelected.bind(this);
        this.preparePageContent = this.preparePageContent.bind(this);
        this.prepareLoaderContent = this.prepareLoaderContent.bind(this);
        this.calculateMultiSelectArray = this.prepareMultiSelectArray.bind(this);

        if(this.props.allTestIds == null)
            store.dispatch(TestIdsAction.getTestIds());

        if(this.props.androidVersions == null)
            store.dispatch(AndroidVersionsAction.getAndroidVersions());

        this.state = {
            multiSelect: this.prepareMultiSelectArray(this.props.allTestIds),
            allIds: this.props.allTestIds,
            selectedAndroidVersion: this.props.androidVersions == null ? "" : this.props.androidVersions[0],
            androidVersions: this.props.androidVersions
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.allTestIds != null && this.state.multiSelect.length == 0) {
            const multiSelect = this.prepareMultiSelectArray(nextProps.allTestIds);

            this.setState({
                multiSelect: multiSelect,
            });
        }

        if(nextProps.androidVersions != null) {
            this.setState({
                androidVersions: nextProps.androidVersions,
                selectedAndroidVersion: nextProps.androidVersions == null ? "" : nextProps.androidVersions[0]
            });
        }
    }

    onAndroidVersionSelected(selectedAndroidVersion) {
        this.setState({selectedAndroidVersion: selectedAndroidVersion});
    }

    prepareMultiSelectArray(allTestIds) {
        const multiSelect = [];

        if(allTestIds == null)
         return [];

        for(let testSummaryId of allTestIds) {
            multiSelect.push(
                {id: testSummaryId, label: testSummaryId, value: false}
            );
        }
        return multiSelect;
    }

    onMultiSelectOptionClicked(optionsList) {
        this.setState({ multiSelect: optionsList });
    }

    onMultiSelectSelectedBadgeClicked(optionsList) {
        this.setState({ multiSelect: optionsList });
    }

    onMultipleSearchResultsButtonClicked(event) {
        const selectedTestSummaryIds = [];
        for(let multiSelectItem of this.state.multiSelect) {
            if (multiSelectItem.value == true) 
                selectedTestSummaryIds.push(multiSelectItem.id);
        }

        store.dispatch(AverageTestSummaryAction.getAverageTestSummaryAction(selectedTestSummaryIds));
    }

    onAndroidVersionSearchButtonClicked(event) {
        store.dispatch(
            AverageTestSummaryAction.getAverageTestSummaryByAndroidVersionAction(this.state.selectedAndroidVersion)
        )
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
            <div className="m-t-15 m-b-15">
                <MultipleTestSearchComponent onSearchResultsButtonClicked={this.onMultipleSearchResultsButtonClicked}
                                            label="Search summary average by ids"
                                            multiSelect={this.state.multiSelect}
                                            optionClicked={this.onMultiSelectOptionClicked}
                                            selectedBadgeClicked={this.onMultiSelectSelectedBadgeClicked}/>
                <br/>
                <SelectComponent label="Choose android version" 
                                 values={this.state.androidVersions}
                                 onSearchButtonClicked={this.onAndroidVersionSearchButtonClicked}
                                 onSelectChange={this.onAndroidVersionSelected}/>
            </div>
        )
    }

    render() {
        const { isBusy, averageTestSummary, success } = this.props;
        console.log(this.props);
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
            content = this.prepareLoaderContent(isBusy);
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
        isBusy: store.averageTestSummaryState.isBusy,
        averageTestSummary: store.averageTestSummaryState.averageTestSummary,
        success: store.averageTestSummaryState.success,
        allTestIds: store.testIdsState.testIds,
        androidVersions: store.androidVersionsState.androidVersions
    };
}

const mapDispatchToProps = dispatch => {
    return { 

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AverageTestSummaryPage);