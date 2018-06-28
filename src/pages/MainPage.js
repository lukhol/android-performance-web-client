import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import './css/MainPage.css';
import TestIdsList from '../components/TestIdsList';
import * as TestIdsActions from '../actions/testIdsAction'

class MainPage extends Component {
    constructor(props) {
        super(props);
        store.dispatch(TestIdsActions.getTestIds());
    }

    render() {
        const { isBusy, testIds, success } = this.props;

        return (
            <div className="app-container">
                <h3>Provide testId of your test to explore results.</h3>
                <p>Ids of existing tests: </p>
                {testIds == null ? "" : <TestIdsList testIds={testIds} />}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        isBusy: store.testIdsState.isBusy,
        testIds: store.testIdsState.testIds,
        success: store.testIdsState.success
    }
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);