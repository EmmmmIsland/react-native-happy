import React, { Component } from 'react';
import {
	View,
	Image,
	Dimensions,
	Platform,
	NativeModules,
	InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';
import Storage from '../../utils/storage';
import SplashImg from '../../../assets/img/spppp.jpg';
import { IS_FIRST_FLAG, UDID } from '../../constants/setting';
import MainContainer from '../../containers/app/main';
import Guide from '../../components/app/guide';
// import { getInitStateFromDB } from '../../action/app';
import LoginContainer from '../../containers/mine/login'
import UUID from '../../utils/uuid'
import {loginSuccessAction} from '../../action/user'
import * as RouteType from '../../constants/routeType'
const { width, height } = Dimensions.get('window');

class Splash extends Component {

	constructor(props) {
	  super(props);
	}

	componentWillMount() {

		console.log('componentWillMount')
	}

	componentDidMount() {
		// this.props.getInitStateFromDB();
		Storage.get(UDID).then((value)=>{
			if (value) {
				global.UDID = value;
				console.log("-- UDID From Storage --",global.UDID);
			}else{
				const NewUUID = UUID();
				global.UDID = NewUUID;
				Storage.save(UDID,global.UDID);
				console.log("-- Create New UDID  --",global.UDID);
			}
		});
		global.platform = Platform.OS === 'ios' ? 1 : 2;
		const { navigator } = this.props;
		let desComponent;
		let title;
		Storage.get(IS_FIRST_FLAG).then((value) => {
			if (value && value * 1 === 1) {
				Storage.get('userInfo').then((userInfo) => {
					console.log(">>>>>>>> userinfo is login ",userInfo);
					if (!userInfo) {
						title = RouteType.LOGIN_PAGE;
						desComponent = LoginContainer;
					}else{
						this.props.dispatch(loginSuccessAction(userInfo));
						title = 'Main';
						desComponent = MainContainer;
					}
					if (Platform.OS === 'ios') {
						navigator.resetTo({
							component: desComponent,
							name: title,
							key: title
						});
						NativeModules.SplashScreen.close();
					};
					if (Platform.OS === 'android') {
						this.timer = setTimeout(() => {
							InteractionManager.runAfterInteractions(() => {
								navigator.resetTo({
									component: desComponent,
									name: title,
									key: title
								});
							});
						}, 3000);
					};
				})
			} else {
				if (Platform.OS === 'ios') {
					navigator.resetTo({
						component: Guide,
						name: 'Guide',
					});
					NativeModules.SplashScreen.close();
				};
				if (Platform.OS === 'android') {
					this.timer = setTimeout(() => {
						InteractionManager.runAfterInteractions(() => {
							navigator.resetTo({
								component: Guide,
								name: 'Guide',
							});
						});
					}, 3000);
				};
			}
		});

	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}

	render() {
		if (Platform.OS === 'ios') {
			return null;
		}else{
			return (
				<Image
					resizeMode='stretch'
					style={{ flex: 1, width, height }}
					source={ SplashImg }/>
			);
		}
	}
}

function mapStateToProps(state) {
	return {

	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
		// getInitStateFromDB: () => dispatch(getInitStateFromDB()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
