export default function reduce(state = {
    androidVersions: null,
    isBusy: false,
    success: true
}, action) {

    switch(action.type) {
        case "FETCH_ANDROID_VERSIONS_START_ACTION":
            return {
                ...state,
                androidVersions: null,
                isBusy: true,
                success: false
            };

        case "FETCH_ANDROID_VERSIONS_COMPLETE_ACTION":
            return {
                ...state,
                androidVersions: action.payload.androidVersions,
                isBusy: false,
                success: true
            };

        case "FETCH_ANDROID_VERSIONS_ERROR_ACTION":
            return {
                ...state,
                androidVersions: null,
                isBusy: false,
                success: false
            };
        default:
            return state;
    }
}