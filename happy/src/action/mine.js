/**
 * Created by wangl on 2017/4/10.
 */
import * as ActionTypes from '../constants/actionType';
import Http from '../utils/http';

//获取接单拒单数量
export const receiveOrRefuseOrderCountAction = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            console.log('mini action log ______ ', response);
            dispatch(getReceiveOrRefuseOrderCountSucc(response));
        }).catch(error => console.log('---error--', error))
    }
}
const getReceiveOrRefuseOrderCountSucc = (data) => {
    return {
        type: ActionTypes.ACTION_GET_RECEIVER_OR_REFUSE_ORDER_COUNT,
        payload: data
    }
}

//获取车辆信息
export const getCarInfoAction = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            console.log('app action log ______ ', response);
            dispatch(gotCarInfoSucc(response));
        }).catch(error => console.log('---error--', error))
    }
}
const gotCarInfoSucc = (data) => {
    return {
        type: ActionTypes.ACTION_GET_CAR_INFO,
        payload: data
    }
}
//获取司机信息
export const getPersonInfoAction = ({...params}) => {
    return dispatch => {
        return Http({...params}).then(response => {
            console.log('app action log ______ ', response);
            dispatch(gotPersonInfoSucc(response));
        }).catch(error => console.log('---error--', error))
    }
}
const gotPersonInfoSucc = (data) => {
    return {
        type: ActionTypes.ACTION_GET_PERSON_INFO,
        payload: data
    }
}