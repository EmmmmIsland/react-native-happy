import React, {Component} from 'react';
import {connect} from 'react-redux';
// import * as ActionTypes from '../../constants/actionType'
import * as RouteType from '../../constants/routeType';
import Storage from '../../utils/storage'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Switch,
    TouchableOpacity
} from 'react-native';
import NavigatorBar from '../../common/navigatorBar';
import LoginContainer from '../../containers/mine/login'
class Mine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            switchIsOn: true
        }
    }

    componentDidMount() {
        this._press = this._press.bind(this);
    }

    _press() {
        Storage.remove('userInfo');
        this.props.router.redirect(RouteType.LOGIN_PAGE);
    }

    render() {
        const {navigator, mine} = this.props;
        return (
            <View style={styles.container}>
                <NavigatorBar
                    title={ '设置' }
                    navigator={ navigator }
                    hiddenBackIcon={false}/>

                <View style={{height:10}}/>

                <View style={styles.contentItemView}>
                    <Text style={styles.contentItemText}>接收新消息通知</Text>
                    <Switch onTintColor={'#008BCA'}
                            onValueChange={(value) => this.setState({switchIsOn: value})}
                            style={{marginBottom: 10, marginTop: 10}}
                            value={this.state.switchIsOn}/>
                </View>
                <View style={{height:1, color:'black'}}/>
                <View style={styles.contentItemView}>
                    <Text style={styles.contentItemText}>通知显示消息详情</Text>
                    <Switch onTintColor={'#008BCA'}
                            onValueChange={(value) => this.setState({switchIsOn: value})}
                            style={{marginBottom: 10, marginTop: 10}}
                            value={this.state.switchIsOn}/>
                </View>


                <TouchableOpacity onPress={() => {
                    this._press();
                }}>
                    <View style={styles.contentView}>
                        <Text style={styles.contentText}>退出登录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'

    },
    contentView: {
        flexDirection:'row',
        height: 44,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    contentItemView: {
        flexDirection:'row',
        height: 44,
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'space-between',
    },
    contentItemText: {
        fontSize: 16,
        color: 'gray'
    },
    contentText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray'
    }

})

function mapStateToProps(state) {
    console.log('------ state', state);
    return {
        mine: state.mine
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
