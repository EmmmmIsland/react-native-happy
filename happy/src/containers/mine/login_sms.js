import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import NavigatorBar from '../../common/navigatorBar';
import NavigationBar from '../../common/navigationBar'
import stylesCommon from '../../../assets/css/common'
import Button from 'apsl-react-native-button'
import CountDownButton from '../../common/countDownButton'
import {ToastMessage} from '../../utils/toast'
import * as StaticColor from '../../constants/staticColor'
import clearIcon from '../../../assets/img/forgetdel.png'
import LoadingView from '../../common/loading.js'
import MainContainer from '../../containers/app/main';
import * as API from '../../constants/api'
import {loginAction,loginSuccessAction,getVCodeForLoginAction} from '../../action/user'
import {changeAppLoadingAction} from '../../action/app'
import Validator from '../../utils/validator'
const { width, height } = Dimensions.get('window');

class Login_sms extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	phoneNumber: '',
	  	smsCode: ''
	  }
	  this._clearPhoneNum = this._clearPhoneNum.bind(this)
		this._clearSmsCodeNum = this._clearSmsCodeNum.bind(this)
		this._login = this._login.bind(this)
		this._requestVCodeForLogin = this._requestVCodeForLogin.bind(this)
		this._changeAppLoading = this._changeAppLoading.bind(this)
		this._loginSuccessCallBack = this._loginSuccessCallBack.bind(this)
	}
	componentDidMount() {

	}

	_clearPhoneNum(){
		this.setState({
			phoneNumber: ''
		})
	}
	_clearSmsCodeNum(){
		this.setState({
			smsCode: ''
		})
	}

	_login(loginSuccessCallBack){
		this.props._login({
			body:{
				phoneNum: this.state.phoneNumber,
				identifyCode:this.state.smsCode,
			}
		},loginSuccessCallBack)
	}
	_requestVCodeForLogin(shouldStartCountting){
		this.props._requestVCodeForLogin({
				body:{
					phoneNum: this.state.phoneNumber
				},
				successMsg: '验证码已发送'
			},shouldStartCountting)
	}
	_loginSuccessCallBack(result){

			const routes = this.props.navigator.getCurrentRoutes();
			console.log(" ======= routesLength",routes.length);
			if (routes.length < 3) {
				this.props.navigator.resetTo({
					component: MainContainer,
					name: 'Main',
					key: 'Main'
				});
			}else{
				this.props.router.replaceWithHome();
			}
			// ToastMessage('登录成功')

	}

	_changeAppLoading(appLoading){
		this.props._changeAppLoading(appLoading);
	}

	render() {
		const {navigator,appLoading} = this.props
		const {phoneNumber, smsCode} = this.state
		return <View style={stylesCommon.container}>
			<NavigationBar
				title={ '登录' }
				navigator={ navigator }/>
			<View style={styles.contentView}>
				<View style={styles.phoneNumView}>
					<View style={styles.leftText}>
						<Text style={styles.leftTextString}>手机号</Text>
					</View>
					<TextInput
						underlineColorAndroid={ 'transparent' }
						style={styles.textInputStyle}
						value={phoneNumber}
						onChangeText={(phoneNumber)=>{this.setState({phoneNumber})}}
						placeholder="手机号"/>
					{
						(()=>{
							if (phoneNumber.length > 0) {
								return (
									<TouchableOpacity onPress={()=>{this._clearPhoneNum()}} activeOpacity={0.8}>
										<Image source={clearIcon} style={styles.clearButton}/>
									</TouchableOpacity>
								)
							}
						})()
					}
				</View>
				<View style={styles.separateLine}></View>
				<View style={styles.smsCodeView}>
					<View style={styles.leftText}>
						<Text style={styles.leftTextString}>验证码</Text>
					</View>
					<TextInput
						underlineColorAndroid={ 'transparent' }
						style={styles.textInputStyle}
						value={this.state.smsCode}
						onChangeText={(smsCode)=>{this.setState({smsCode})}}
						placeholder="请输入验证码"/>
					{
						(()=>{
							if (smsCode.length > 0) {
								return (
									<TouchableOpacity onPress={()=>{this._clearSmsCodeNum()}} activeOpacity={0.8}>
										<Image source={clearIcon} style={styles.clearButton}/>
									</TouchableOpacity>
								)
							}
						})()
					}
					<CountDownButton enable={phoneNumber.length}
						style={{width: 110,marginRight: 10}}
						textStyle={{color: StaticColor.COLOR_MAIN}}
						timerCount={60}
						onClick={(shouldStartCountting)=>{
							if (Validator.isPhoneNumber(phoneNumber)) {
								this._requestVCodeForLogin(shouldStartCountting)
							}else {
								ToastMessage('手机号输入有误，请重新输入');
								shouldStartCountting(false);
							}
						}}/>
				</View>
			</View>
			<Button isDisabled={!(phoneNumber && smsCode)} style={styles.loginButton} textStyle={{color: 'white',fontSize: 16}} onPress={()=>{
					this._changeAppLoading(true)
					this._login(this._loginSuccessCallBack)
			}}>登录</Button>
			<LoadingView showLoading={appLoading}/>
		</View>
	}
}

const mapStateToProps = (state) => {
	return {
		mine: state.mine,
		user: state.user,
		appLoading: state.app.get('appLoading')
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		_changeAppLoading: (appLoading) => dispatch(changeAppLoadingAction(appLoading)),
		_requestVCodeForLogin: (params,shouldStartCountting) => dispatch(getVCodeForLoginAction({
			url: API.API_GET_VCODE_FOR_LOGIN,
			successCallBack: ()=>{
				console.log('获取验证码成功，开始倒计时')
				shouldStartCountting(true);
			},
			failCallBack: ()=>{
				shouldStartCountting(false);
			},
			...params
		})),
		_login: (params,loginSuccessCallBack) => dispatch(loginAction({
			url: API.API_LOGIN_WITH_MSM_CODE,
			successMsg: '登录成功',
			successCallBack: (response) =>{
				dispatch(changeAppLoadingAction(false))
				loginSuccessCallBack(response.result)
			},
			failCallBack: (err) => {
				dispatch(changeAppLoadingAction(false))
				// 模拟成功
				// console.log("登录失败，这里模拟登录成功",err);
				// if (__DEV__) {
				// 	dispatch(loginSuccessAction(err));
				// 	loginSuccessCallBack()
				// }
			},
			...params
		}))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login_sms);

const styles =StyleSheet.create({
	contentView: {
		width,
		height: 44 + 0.5 + 44,
		backgroundColor: StaticColor.WHITE_COLOR,
		marginTop: 10,
	},
	leftText:{
		height: 44,
		width: 50,
		justifyContent:'center'
	},
	leftTextString: {
		color: StaticColor.COLOR_LIGHT_GRAY_TEXT
	},
	phoneNumView: {
		marginLeft: 10,
		height: 44,
		flexDirection: 'row',
		alignItems: 'center'
	},
	textInputStyle:{
		flex: 1,
		height: 44,
		fontSize: 16
	},
	separateLine:{
		height :0.5,
		width,
		backgroundColor:StaticColor.COLOR_SEPARATE_LINE
	},
	smsCodeView: {
		marginLeft: 10,
		height: 44,
		flexDirection: 'row',
		alignItems: 'center'
	},
	smsCodeButton: {
		width: 125,
		borderWidth:0
	},
	loginButton: {
		marginLeft:10,
		marginTop: 15,
		marginRight: 10,
		borderWidth:0,
		backgroundColor: StaticColor.COLOR_MAIN,
		borderRadius: 5
	},
	clearButton: {
		width: 15,
		height: 15,
		marginRight: 15,
		marginLeft: 10
	}
})
