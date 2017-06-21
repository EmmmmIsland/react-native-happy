import Immutable from 'immutable';
import React from 'react';
import * as ActionTypes from '../constants/actionType';

import Home from '../containers/home/home';
import Mine from '../containers/mine/mine';

import HomeRenderIcon from '../../assets/img/bar_home_nomarl.png'
import HomePressedIcon from '../../assets/img/bar_home_pressed.png'

import CenterRenderIcon from '../../assets/img/bar_center_normal.png';
import CenterPressedIcon from '../../assets/img/bar_center_pressed.png';

const initState = Immutable.fromJS({
    currentTab: 'home',
    appLoading: false, // 加载框状态
    routes: [
        {
            title: '首页',
            key: 'home',
            badgeCount: 0,
            component: <Home />,
            withStatusBar: false,
            renderIcon: HomeRenderIcon,
            renderSelectedIcon: HomePressedIcon,
        },
        {
            title: '我的',
            key: 'mine',
            badgeCount: 0,
            component: <Mine />,
            withStatusBar: false,
            renderIcon: CenterRenderIcon,
            renderSelectedIcon: CenterPressedIcon,
        }
    ],

    forgetVcode: {},
    forgetChangeCode: {},

    modifyPwd:{},

    forgetNextPage:{code: 400},

    getCarInfoData:[],

    getPersonInfoData:{},

});

export default (state = initState, action) => {
    let _state = state;
    switch (action.type) {
        case ActionTypes.CHANGE_TAB:
            _state = _state.set('currentTab', action.payload.tab);
            return _state;

        case  ActionTypes.ACTION_GOT_FORGET_VCODE_SUCC:
            console.log('========== ',action.payload)
            _state = _state.set('forgetVcode',action.payload);
            return _state

        case ActionTypes.ACTION_CHANG_PASSWORD_SUCC:
            _state = _state.set('modifyPwd',action.payload)
            return _state

        case  ActionTypes.ACTION_GOT_FORGET_NEXT_PAGE_SUCC:
            console.log('========== ',action.payload)
            _state = _state.set('forgetNextPage',action.payload);
            return _state

        case  ActionTypes.ACTION_GOT_FORGET_NEXT_PAGE_SUCC_DEL:  //删除跳转下一页状态
            console.log('========== ',action.payload)
            _state = _state.set('forgetNextPage','');
            return _state

        case  ActionTypes.ACTION_GOT_FORGET_CHANGE_CODE_SUCC:
            console.log('========== ',action.payload)
            _state = _state.set('forgetChangeCode',action.payload);
            return _state
        case  ActionTypes.ACTION_GOT_FORGET_CHANGE_CODE_SUCC_DEL:  //删除跳转更改密码状态
            console.log('========== ',action.payload)
            _state = _state.set('forgetChangeCode','');
            return _state
        case  ActionTypes.ACTION_GET_CAR_INFO:
            console.log('========== ',action.payload)
            _state = _state.set('getCarInfoData',action.payload.result);
            return _state
        case ActionTypes.ACTION_CHANGE_APP_LOADING:
            _state = _state.set('appLoading',action.payload)
            return _state;
        case  ActionTypes.ACTION_GET_PERSON_INFO:
            console.log('========== ',action.payload)
            _state = _state.set('getPersonInfoData',action.payload.result);
            return _state;
        case ActionTypes.ACTION_MAIN_PRESS:
            _state = _state.set('mainPress', action.payload.orderTab);
            return _state;

        default:
            return state;
    }
}
