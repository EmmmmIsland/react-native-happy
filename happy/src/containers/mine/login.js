import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as RouteType from '../../constants/routeType';
import * as StaticColor from '../../constants/staticColor'
import stylesCommon from '../../../assets/css/common'
import MainContainer from '../../containers/app/main';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import loginbg from '../../../assets/img/loginbg.png'
import Button from 'apsl-react-native-button'
import {loginAction,loginSuccessAction} from '../../action/user'
import {changeAppLoadingAction} from '../../action/app'
import * as API from '../../constants/api'
import {ToastMessage} from '../../utils/toast'

// import {delChangeCodeAction} from '../../action/app'

import LoadingView from '../../common/loading'

const {width, height} = Dimensions.get('window');

class Login extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	phoneNumber: __DEV__ ? '18611908428' : '',
	  	password: __DEV__ ? '123456' : ''
	  }
	  this._login = this._login.bind(this);
		// this.props.delChangeCodeAction();
	  this._changeAppLoading = this._changeAppLoading.bind(this)
	  this._loginSuccessCallBack = this._loginSuccessCallBack.bind(this)
	}


	_login(loginSuccessCallBack){
		this.props._login({
			body:{
				phoneNum: this.state.phoneNumber,
				password:this.state.password
			}
		},loginSuccessCallBack);
	}
	_loginSuccessCallBack(result){
		console.log("============= login success call back ",result);
		const current = this.props.router.getCurrentRoute()
		if (current.key === RouteType.LOGIN_PAGE || current.name === 'login') {
			const forwardRoute = this.props.router.getForwardRoute()
			if (forwardRoute) {
				this.props.router.replaceWithHome();
			}else{
				this.props.navigator.resetTo({
					component: MainContainer,
					name: 'Main',
          key: 'Main'
				});
			}
		}
	}
	_changeAppLoading(appLoading){
		this.props._changeAppLoading(appLoading)
	}


  render() {
      const {navigator, mine} = this.props;
  		const { phoneNumber, password } = this.state
      return (
          <View style={stylesCommon.container}>
              <View style={styles.backgroundImageView}>
                  <Image source={loginbg} style={{width,height}}/>
              </View>
              <View style={{alignItems: 'center',paddingTop: 122}}>
                  <Text>图标</Text>
              </View>
              <View style={styles.contentView}>
                  <TextInput
                      underlineColorAndroid={ 'transparent' }
                      placeholder='手机号'
                      placeholderTextColor='white'
                      textAlign='center'
                      style={styles.textInput}
                      onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                      value={phoneNumber}/>
                  <View style={styles.lineUnderInput}></View>
                  <TextInput
                      underlineColorAndroid={ 'transparent' }
                      secureTextEntry={true}
                      placeholder='密码'
                      placeholderTextColor='white'
                      textAlign='center'
                      style={styles.textInput}
                      onChangeText={(password) => this.setState({password})}
                      value={password}/>
                  <View style={styles.lineUnderInput}></View>
                  <Button isDisabled={!(phoneNumber && password)} onPress={()=>{
                      this.props.navigator.resetTo({
                          component: MainContainer,
                          name: 'Main',
                          key: 'Main'
                      });
										}} style={styles.loginButton} textStyle={styles.loginButtonText}>
                      登录
                  </Button>
                  <View style={styles.bottomView}>
                      <Text onPress={()=>{
													this.props.router.redirect(RouteType.LOGIN_SMS_PAGE)
												}} style={styles.bottomViewText}>短信验证登录</Text>
                      <Text onPress={()=>{
													this.props.router.redirect(RouteType.FORGETPWD_PAGE)
												}} style={styles.bottomViewText}>忘记密码？</Text>
                  </View>
              </View>
              <LoadingView showLoading={this.props.appLoading}/>
          </View>
      );
    }
}
const styles = StyleSheet.create({
    backgroundImageView: {
        position: 'absolute'
    },
    contentView: {
        width,
        height: 180,
        marginTop: (height - 490) * 0.6
    },
    textInput: {
        height: 40,
        color: 'white'
    },
    lineUnderInput: {
        height: 1,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    loginButton: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 0,
        height: 46,
        borderRadius: 5,
        marginBottom: 0
    },
    loginButtonText: {
        fontSize: 18,
        color: StaticColor.COLOR_MAIN
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30,
        width: width - 20,
        marginLeft: 10,
        marginTop: 15,
    },
    bottomViewText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        backgroundColor: 'rgba(255,255,255,0)'
    }
})

function mapStateToProps(state) {
    console.log('------ state', state);
    return {
        mine: state.mine,
        user: state.user,
        appLoading: state.app.get('appLoading')
    }
}

function mapDispatchToProps(dispatch) {


	return {
		_changeAppLoading: (appLoading) => dispatch(changeAppLoadingAction(appLoading)),
		_login: (params,loginSuccessCallBack) => dispatch(loginAction({
			url: API.API_LOGIN_WITH_PWD,
			successMsg: '登录成功',
			successCallBack: (response)=>{
				loginSuccessCallBack(response.result);
				dispatch(loginSuccessAction(response));
				dispatch(changeAppLoadingAction(false))
			},
			failCallBack:(err)=>{
				// 模拟成功
				// console.log("登录失败，这里模拟登录成功",err);
				// if (__DEV__) {
				// 	dispatch(loginSuccessAction(err));
				// 	loginSuccessCallBack();
				// }
				dispatch(changeAppLoadingAction(false))
			},
			...params
		})),

	};

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
