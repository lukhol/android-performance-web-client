import * as Constants from '../common/Constants';

export function getTestIds() {
    return function(dispatch) {
        dispatch({type: "FETCH_TEST_IDS_START_ACTION"});  
    
        setTimeout(() => {
            fetch(Constants.ServerURL+'/api/v1/results/ids', {
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
                    type: "FETCH_TEST_IDS_COMPLETE_ACTION",
                    payload: {
                        testIds: result
                    }
                })
            })
            .catch(error => {
                dispatch({type: "FETCH_TEST_IDS_ERROR_ACTION"});
            });
        }, 1);
    }
}