import { combineReducers } from 'redux';
import singleTestState from './singleTestReducer';
import allTestsState from './allTestsReducer';
import testIdsState from './testIdsReducer'

function lastAction(state = null, action) {
	return action;
}

export default combineReducers({
	singleTestState,
	allTestsState,
	testIdsState,
	lastAction
});