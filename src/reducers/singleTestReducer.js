export default function reduce(state = {
    testResults: null,
    isBusy: false,
    success: true
}, action) {

    switch(action.type) {
        case "FETCH_SINGLE_TEST_START_ACTION":
            return {
                ...state,
                testResults: null,
                isBusy: true,
                success: false
            };

        case "FETCH_SINGLE_TEST_COMPLETE_ACTION":
            return {
                ...state,
                testResults: action.payload.testResults,
                isBusy: false,
                success: true
            };

        case "FETCH_SINGLE_TEST_ERROR_ACTION":
            return {
                ...state,
                testResults: null,
                isBusy: false,
                success: false
            };
        default:
            return state;
    }
}