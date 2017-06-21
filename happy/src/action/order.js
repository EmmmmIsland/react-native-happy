/**
 * Created by wangl on 2017/4/10.
 */
import * as ActionTypes from '../constants/actionType';
import Http from '../utils/http';


export const getOrderDetailAction = (params) => {
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}
export const gotOrderDetailSuccAction = (data,pageNo) => {
    return {
        type: ActionTypes.ACTION_GET_ORDER_DETAIL,
        payload: data,
        pageNo
    }
}

export const getOrderSearchAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}

//待发运Action
export const getOrderDetaiToBeShippedAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}

//待签收Action
export const getOrderDetaiToSingInAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}

//待回单Action
export const getOrderDetaiWaitingSureAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}
//待回单订单详情->点击 "上传回单"
export const getOrderDetaiWaitingSureToUpLoadAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}
//回单Action
export const getOrderDetaiSureAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}

//发运Action
export const sendOrderAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}
//收款Action
export const getMoneyAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}

//签收Action
export const SignInAction = (params) =>{
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}

// 刷新（状态）
export const changeOrderListRefreshing= (data) => {
    return {
        type: ActionTypes.ACTION_CHANGE_ORDER_LIST_REFRESHING,
        payload: data
    }
}
// 加载更多（状态）
export const changeOrderListLoadingMore = (data) =>{
    console.log(" changeOrderListLoadingMore ",data);
    return {
        type: ActionTypes.ACTION_CHANGE_ORDER_LIST_LOADINGMORE,
        payload: data
    }
}

//获取最大数量
export const getTotalOrders= (data) => {
    return {
        type: ActionTypes.ACTION_GET_TOTAL_ORDER,
        payload: data
    }
}