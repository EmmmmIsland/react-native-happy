/**
 * Created by wangl on 2017/4/10.
 */
import * as ActionTypes from '../constants/actionType';
import Http from '../utils/http';

export const getOrderSearchByNO_Action = (params) => {
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}
export const gotOrderSearchByNO_SuccAction = (data) => {
    return {
        type: ActionTypes.ACTION_GET_ORDER_SEARCH_BY_NO,
        payload: data
    }
}

//获取货源列表
export const requestGoodsSourceData = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}

export const receiverGoodsSourceData = (data,pageNo) => {
    return {
        type: ActionTypes.ACTION_GET_GOOD_LIST,
        payload: data,
        pageNo
    }
}

//接单action
export const receiverOrderAction = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}
//获取接单结果
export const receiverOrderSucc = data => {
    return {
        type: ActionTypes.ACTION_RECEIVER_ORDER,
        payload: data
    }
}


//拒单action
export const refuseOrderAction = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            params.successCallBack && params.successCallBack(response)
        },err => {
            params.failCallBack && params.failCallBack(err)
        }).catch(error => console.log(error));
    }
}
//获取拒单结果
export const refuseOrderSucc = data => {
    return {
        type: ActionTypes.ACTION_REFUSE_ORDER,
        payload: data
    }
}

// 刷新（状态）
export const changeProductListRefreshing= (data) => {
    return {
        type: ActionTypes.ACTION_CHANGE_PRODUCT_LIST_REFRESHING,
        payload: data
    }
}
// 加载更多（状态）
export const changeProductListLoadingMore = (data) =>{
    console.log(" changeProductListLoadingMore ",data);
    return {
        type: ActionTypes.ACTION_CHANGE_PRODUCT_LIST_LOADINGMORE,
        payload: data
    }
}

//获取最大数量
export const getTotalProduct= (data) => {
    return {
        type: ActionTypes.ACTION_GET_TOTAL_PRODUCT,
        payload: data
    }
}