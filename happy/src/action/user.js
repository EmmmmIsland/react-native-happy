
import * as ActionTypes from '../constants/actionType';
import {changeAppLoadingAction} from './app'
import Http from '../utils/http';


export const loginAction = (params) => {
	return dispatch => {
		return Http({...params}).then(response => {
			params.successCallBack && params.successCallBack(response)
		},err => {
			params.failCallBack && params.failCallBack(err)
		}).catch(error => console.log(error));
	}
}

export const loginSuccessAction = (data) =>{
	return {
		type: ActionTypes.ACTION_LOGIN_SUCCESS,
		payload: data
	}
}

export const loadUserFromLocalAction = (userInfo) => {
	return {
		type: ActionTypes.ACTION_LOAD_USER_FROMLOCAL,
		payload: userInfo
	}
}


export const getVCodeForLoginAction = (params) => {
	return dispatch => {
		return Http({...params}).then(response => {
			params.successCallBack && params.successCallBack(response)
		},err => {
			params.failCallBack && params.failCallBack(err)
		})
		.catch(error => console.log(error));
	}
}

export const stopVcodeTimerRunningAction = () => {
	return {
		type: ActionTypes.ACTION_SET_TIMER_RUNNING,
		payload: false
	}
}