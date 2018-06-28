export default function reduce(state = {
    allTests: null,
    isBusy: false,
    success: true
}, action) {

    switch(action.type) {
        case "FETCH_ALL_TESTS_START_ACTION":
            return {
                ...state,
                allTests: null,
                isBusy: true,
                success: false
            };

        case "FETCH_ALL_TESTS_COMPLETE_ACTION":
            return {
                ...state,
                allTests: action.payload.allTests,
                isBusy: false,
                success: true
            };

        case "FETCH_ALL_TESTS_ERROR_ACTION":
            return {
                ...state,
                allTests: null,
                isBusy: false,
                success: false
            };
        default:
            return state;
    }
}