import * as ActionTypes from '../constants/actionType';
import Http from '../utils/http';
import Storage from '../utils/storage';

// export const getInitStateFromDB = () => {
//     return dispatch => {
//         // const user = new User().merge();
//         // Storage.get('user').then(result => {
//         // 	if (result) {
//         // 		dispatch(receiverUser(result));
//         // 	} else {
//         // 		dispatch(receiverUser({}));
//         // 	}
//         // });
//         // Storage.get(ActionTypes.HOME_DATA_CACHE).then(result => {
//         // 	dispatch(getHomeDataCache(result));
//         // });
//     }
// }

export const changeTabBarAction = tab => {
	return {
		type: ActionTypes.CHANGE_TAB,
		payload: { tab }
	};
}

export const changeAppLoadingAction = (appLoading) => {
  return {
    type: ActionTypes.ACTION_CHANGE_APP_LOADING,
		payload:appLoading
  };
}


export const requestData = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            dispatch(receiverData(response.data));
        }).catch(error => console.log(error));
    }
}

const receiverData = data => {
    return {
        type: ActionTypes.GET_DATA_SUCCESS,
        payload: data
    }
}

export const timerShouldRunAction = (shouldRun) => {
    return {
        type: ActionTypes.ACTION_TIMER_SHOULD_RUN,
        payload: shouldRun
    }
}


const gotForgetVcodeSucc = (data) =>{
	return {
		type: ActionTypes.ACTION_GOT_FORGET_VCODE_SUCC,
		payload: data
	}
}

//修改密码
export const changPasswordAction = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}

//修改密码成功后action
export const changePwdSucc = (data) => {
    return {
        type: ActionTypes.ACTION_CHANG_PASSWORD_SUCC,
        payload: data
    }
}

//忘记密码页面 账号验证码效验功能
export const getForgetNextPageAction = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            console.log('app action log ______ ', response);

                dispatch(gotForgetNextPageSucc(response));

        }).catch(error => console.log('---error--', error));
    }
}
const gotForgetNextPageSucc = (data) => {
    return {
        type: ActionTypes.ACTION_GOT_FORGET_NEXT_PAGE_SUCC,
        payload: data
    }
}
//清空响应状态
export const delForNextPage = () => {
    return {
        type: ActionTypes.ACTION_GOT_FORGET_NEXT_PAGE_SUCC_DEL
    };
}

// //忘记密码 通过验证码更改密码
// export const getForgetChangeCodeAction = ({...params}) => {
//     return dispatch => {
//         return Http({...params}).then(response => {
//             console.log('app action log ______ ', response);
//             dispatch(gotForgetChangeCodeSucc(response));
//
//         }).catch(error => console.log('---error--', error));
//     }
// }
// const gotForgetChangeCodeSucc = (data) => {
//     return {
//         type: ActionTypes.ACTION_GOT_FORGET_CHANGE_CODE_SUCC,
//         payload: data
//     }
// }

export const getForgetChangeCodeAction = (params) => {
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}
export const gotForgetChangeCodeSuccAction = (data) => {
    return {
        type: ActionTypes.ACTION_GOT_FORGET_CHANGE_CODE_SUCC,
        payload: data
    }
}

//清空响应状态
export const delChangeCodeAction = () => {
    return {
        type: ActionTypes.ACTION_GOT_FORGET_CHANGE_CODE_SUCC_DEL
    };
}



export const mainPressAction = orderTab => {
    return {
        type: ActionTypes.ACTION_MAIN_PRESS,
        payload: { orderTab }
    };
}

export const getForgetVCodeAction = (params) => {
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        })
            .catch(error => console.log(error));
    }
}