import React, {Component} from 'react';
import {connect} from 'react-redux';
// import * as ActionTypes from '../../constants/actionType'
import {loadUserFromLocalAction} from '../../action/user'
import Storage from '../../utils/storage'
import * as RouteType from '../../constants/routeType';
import * as StaticColor from '../../constants/staticColor'
import stylesCommon from '../../../assets/css/common'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';
import NavigationBar from '../../common/navigationBar'


import SettingCell from '../../components/mine/settingCell'


import {receiveOrRefuseOrderCountAction} from '../../action/mine'
import * as API from '../../constants/api';

const {width, height} = Dimensions.get('window');

class Mine extends Component {

    constructor(props) {
        super(props);
        this._getreceiveOrRefuseOrderCount = this._getreceiveOrRefuseOrderCount.bind(this)
    }

    componentDidMount() {
        this._pushToSetting = this._pushToSetting.bind(this);
        this._pushToMsgList = this._pushToMsgList.bind(this);

        Storage.get('userInfo').then((userInfo) => {
            this.props._loadUserFromLocal(userInfo)
        })

        this._getreceiveOrRefuseOrderCount()
    }

    _pushToSetting() {
        this.props.router.redirect(RouteType.SETTING_PAGE);
    }

    _pushToMsgList() {
        this.props.router.redirect(RouteType.MSGLIST_PAGE)
    }

    _getreceiveOrRefuseOrderCount() {
        // const userId = this.props.userInfo.result.userId
        const userId = '88888'
        this.props.receiveOrRefuseOrderCountAction({
            userId: userId
        })
    }

    render() {
        const {navigator, mine, user, result} = this.props;
        //const userInfo = user.get('userInfo');
        const userInfo = '66666';
        console.log('result---', result)
        return (
            <View style={stylesCommon.container}>
                <NavigationBar
                    title={ '我的' }
                    navigator={ navigator }
                    leftButtonConfig={{
                        type: 'string',
                        title: '设置',
                        onClick: () => {
                            this._pushToSetting()
                        }
                    }}
                    rightIconFont='&#xe617;'
                    rightButtonConfig={{
                        type: 'font',
                        onClick: () => {
                            this._pushToMsgList()
                        }
                    }}/>
                <View style={{flex: 1}}>
                    <ScrollView>

                            <Text onPress={() => {
                                if (!userInfo) {
                                    this.props.router.redirect(RouteType.LOGIN_PAGE);
                                }
                                ;
                            }} style={{
                                marginLeft: 40,
                                marginRight: 40,
                                backgroundColor: 'rgba(0,0,0,0)',
                                color: 'white'
                            }}>
                                {/*{userInfo ? this.props.userInfo.result.phone : '点击登录'}*/}
                                {userInfo ? 188888888 : '点击登录'}
                            </Text>

                        <View style={styles.numberView}>
                            <View style={styles.orderNmuberView}>
                                <Text style={styles.numberContent}>{result.accessNum}</Text>
                                <Text style={styles.numberText}>接单</Text>
                            </View>
                            <View style={styles.numberLine}></View>
                            <View style={styles.carNmuberView}>
                                <Text style={styles.numberContent}>{result.refuseNum}</Text>
                                <Text style={styles.numberText}>拒单</Text>
                            </View>
                        </View>
                        <View style={styles.contentView}>
                            <View style={styles.separateView}></View>
                            <SettingCell leftIcon='&#xe62a;' content={'个人信息'} showBottomLine={true} clickAction={() => {
                                this.props.router.redirect(RouteType.PERSON_INFO_PAGE);
                            }}/>
                            <SettingCell leftIcon='&#xe62b;' content={'车辆信息'} clickAction={() => {
                                this.props.router.redirect(RouteType.CAR_INFO_PAGE);
                            }}/>
                            <View style={styles.separateView}></View>
                            <SettingCell leftIcon='&#xe62e;' content={'修改密码'} clickAction={() => {
                                this.props.router.redirect(RouteType.CHANGE_PWD_PAGE);
                            }}/>
                            <View style={styles.separateView}></View>
                            <SettingCell leftIcon='&#xe630;' content={'关于我们'} clickAction={() => {
                                this.props.router.redirect(RouteType.ABOUT_US_PAGE);
                            }}/>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerImage: {
        width,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: StaticColor.WHITE_COLOR,
        height: 44,
        alignItems: 'center',
    },
    orderNmuberView: {
        flex: 1,
        width: width * 0.5 - 0.5,
    },
    carNmuberView: {
        flex: 1,
        width: width * 0.5 - 0.5,
    },
    numberLine: {
        backgroundColor: StaticColor.COLOR_SEPARATE_GRAY_LINE,
        width: 0.5,
        height: 27
    },
    numberText: {
        textAlign: 'center',
    },
    numberContent: {
        color: StaticColor.RED_TEXT_COLOR,
        textAlign: 'center',
    },
    separateView: {
        height: 10,
        backgroundColor: StaticColor.COLOR_VIEW_BACKGROUND
    },
    contentView: {
        backgroundColor: StaticColor.WHITE_COLOR
    }
})

function mapStateToProps(state) {
    console.log('------ state', state);
    return {
        mine: state.mine,
        user: state.user,
        userInfo: '5555555',
        result: '66666'
        // userInfo: state.user.get('userInfo'),
        // result: state.mine.get('receiverOrRefuseResult')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        _loadUserFromLocal: (userInfo) => {
            dispatch(loadUserFromLocalAction(userInfo))
        },
        receiveOrRefuseOrderCountAction: (params) =>
            dispatch(receiveOrRefuseOrderCountAction({
                url: API.API_GET_RECEIVER_OR_REFUSE_ORDER_COUNT,
                body: {
                    userId: params.userId
                },
                successMsg: '操作成功',
            }))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
