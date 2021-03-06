import * as Constants from '../common/Constants';

export function getAverageTestSummaryAction(testSummaryIds) {
    return function(dispatch) {
        dispatch({type: "FETCH_AVERAGE_TEST_SUMMARY_START_ACTION"});

        let testSummaryIdsString = "";
        for(let summaryId of testSummaryIds) {
            testSummaryIdsString = testSummaryIdsString
                .concat("testSummaryIds=", summaryId, "&");
        }

        setTimeout(() => {
            fetch(Constants.ServerURL+'/api/v1/results/summary/average/ids?'+testSummaryIdsString, {
                method: 'GET'
            })
            .then(response => {
                if(response.status !== 200) {
                    throw response;
                }

                return response;
            })
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: "FETCH_AVERAGE_TEST_SUMMARY_COMPLETE_ACTION",
                    payload: {
                        averageTestSummary: result
                    }
                })
            })
            .catch(error => {
                dispatch({type: "FETCH_AVERAGE_TEST_SUMMARY_ERROR_ACTION"});
            });
        });
    }
}

export function getAverageTestSummaryByAndroidVersionAction(androidVersion) {
    return function(dispatch) {
        dispatch({type: "FETCH_AVERAGE_TEST_SUMMARY_START_ACTION"});
        setTimeout(() => {
            fetch(Constants.ServerURL+'/api/v1/results/summary/average/androidVersion?version='+androidVersion, {
                method: 'GET'
            })
            .then(response => {
                if(response.status !== 200) {
                    throw response;
                }

                return response;
            })
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: "FETCH_AVERAGE_TEST_SUMMARY_COMPLETE_ACTION",
                    payload: {
                        averageTestSummary: result
                    }
                })
            })
            .catch(error => {
                dispatch({type: "FETCH_AVERAGE_TEST_SUMMARY_ERROR_ACTION"});
            });
        });
    }
}