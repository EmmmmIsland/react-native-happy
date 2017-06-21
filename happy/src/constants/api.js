import { HOST } from '../constants/setting'

export const API_TEMPLATE = 'http://116.211.167.106/api/live/aggregation?uid=133825214&interest=1'

export const API_FORGET_IDENTIFY_CODE = HOST + 'app/message/getForgetIdentifyCode' //忘记密码获取验证码接口

export const API_LOGIN_WITH_PWD = HOST +'app/login/loginWithPassword'


export const API_LOGIN_WITH_MSM_CODE = HOST + 'app/login/loginWithVerificationCode'

export const API_GET_VCODE_FOR_LOGIN = HOST + 'app/message/getLoginIdentifyCode'


export const API_GET_RECEIVER_OR_REFUSE_ORDER_COUNT = HOST+'app/transport/receiveOrRefuseOrderCount'//获取接单拒单数量接口

