export function getAndroidVersions() {
    return function(dispatch) {
        dispatch({type: "FETCH_ANDROID_VERSIONS_START_ACTION"});  
    
        setTimeout(() => {
            fetch('http://localhost:9999'+'/api/v1/results/androidVersions', {
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
                    type: "FETCH_ANDROID_VERSIONS_COMPLETE_ACTION",
                    payload: {
                        androidVersions: result
                    }
                })
            })
            .catch(error => {
                dispatch({type: "FETCH_ANDROID_VERSIONS_ERROR_ACTION"});
            });
        }, 1);
    }
}