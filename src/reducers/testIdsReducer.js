export default function reduce(state = {
    testIds: null,
    isBusy: false,
    success: true
}, action) {

    switch(action.type) {
        case "FETCH_TEST_IDS_START_ACTION":
            return {
                ...state,
                testIds: null,
                isBusy: true,
                success: false
            };

        case "FETCH_TEST_IDS_COMPLETE_ACTION":
            return {
                ...state,
                testIds: action.payload.testIds,
                isBusy: false,
                success: true
            };

        case "FETCH_TEST_IDS_ERROR_ACTION":
            return {
                ...state,
                testIds: null,
                isBusy: false,
                success: false
            };
        default:
            return state;
    }
}