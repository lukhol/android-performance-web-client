export function getSingleTestResults(testId) {
    return function(dispatch) {
        dispatch({type: "FETCH_SINGLE_TEST_START_ACTION"});  
    
        setTimeout(() => {
            fetch('http://localhost:9999'+'/api/v1/results/summary/'+testId, {
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
                    type: "FETCH_SINGLE_TEST_COMPLETE_ACTION",
                    payload: {
                        testResults: result
                    }
                })
            })
            .catch(error => {
                dispatch({type: "FETCH_SINGLE_TEST_ERROR_ACTION"});
            });
        }, 1);
    }
}