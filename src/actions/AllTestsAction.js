export function getAllTestResults() {
    return function(dispatch) {
        dispatch({type: "FETCH_ALL_TESTS_START_ACTION"});  
    
        setTimeout(() => {
            fetch('http://localhost:9999'+'/api/v1/results/summary', {
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
                    type: "FETCH_ALL_TESTS_COMPLETE_ACTION",
                    payload: {
                        allTests: result
                    }
                })
            })
            .catch(error => {
                dispatch({type: "FETCH_ALL_TESTS_ERROR_ACTION"});
            });
        }, 1);
    }
}