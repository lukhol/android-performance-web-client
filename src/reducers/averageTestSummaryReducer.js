export default function reduce(state = {
    averageTestSummary: null,
    isBusy: false,
    success: true
}, action) {
    switch(action.type) {
        case "FETCH_AVERAGE_TEST_SUMMARY_START_ACTION":
            return {
                ...state,
                averageTestSummary: null,
                isBusy: true,
                success: false
            };
        case "FETCH_AVERAGE_TEST_SUMMARY_COMPLETE_ACTION": {
            return {
                ...state,
                averageTestSummary: action.payload.averageTestSummary,
                isBusy: false,
                success: true
            }
        }
        case "FETCH_TEST_IDS_ERROR_ACTION": {
            return {
                ...state,
                averageTestSummary: null,
                isBusy: false,
                success: false
            }
        }
        default:
            return state;
    }
}