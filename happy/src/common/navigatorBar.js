
import React from 'react';
import {
	View,
	Text,
	Image,
	Platform,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import backIcon from '../../assets/img/back.png';

export default class NavigatorBar extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {};
	  this._goback = this._goback.bind(this);
	}

	_goback() {
		if (this.props.backIconClick) {
			this.props.backIconClick();
		} else {
			if (this.props.navigator && !this.props.hiddenBackIcon) this.props.navigator.pop();
		}
	}

	render() {
		const { navigator,
			title,
			centerIcon,
			centerIconStyle,

			rightIcon,
			rightIconFontStyle,
			backIconClick,

			rightTitle,
			rightTitleStyle,
			rightClick,

			hiddenBackIcon,

			leftTitle,
			leftIcon,
			leftClick,
			leftTitleStyle,

			style,
			rightSubIcon,
			rightSubStyle,
			rightSubClick,
			unReadMsgCount
		} = this.props;
		return (
			<View style={ [styles.container, style] }>
				<View style={ styles.contentContainer }>
					<View style={ styles.leftContainer }>
						{
							(() => {
								if(!hiddenBackIcon) {
									return (
										<TouchableOpacity activeOpacity={1} onPress={ this._goback }>
											<View>
												<Image style={ styles.backImg } source={ backIcon }/>
											</View>
										</TouchableOpacity>
									)
								}else{
									if (leftTitle) {
										return (
											<TouchableOpacity
												activeOpacity={ 1 }
												onPress={ leftClick }>
												<Text style={ [styles.rightTitle, leftTitleStyle] }>{ leftTitle }</Text>
											</TouchableOpacity>
										)
									}else{
										return null
									}
								}
							})()
						}
					</View>
					<View style={ styles.centerContainer }>
						{
							title ?
								<Text style={ styles.text }>{ title }</Text>
							:
								<Image resizeMode='stretch' style={ [styles.centerImg, centerIconStyle] } source={ centerIcon }/>
						}
					</View>

					<View style={ styles.rightContainer }>
						{
							(() => {
								if (rightSubIcon) {
									return (
										<View style={{ flexDirection: 'row', justifyContent: 'center',}}>
											<Text onPress={ rightClick } style={ [styles.rightIconFont, rightIconFontStyle] }>{ rightIcon }</Text>
											<Text onPress={ rightSubClick } style={ [styles.rightIconFont, rightSubStyle] }>{ rightSubIcon }</Text>
										</View>
									);
								} else
								if (rightIcon) {
									return (
										<TouchableOpacity
											activeOpacity={ 1 }
											style={ styles.rightContainer }
											onPress={ rightClick }>
											<Text style={ [styles.rightIconFont, rightIconFontStyle] }>{ rightIcon}</Text>
											{
												unReadMsgCount &&
													<View style={ [styles.unreading] }></View>
											}
										</TouchableOpacity>
									);
								} else if (rightTitle) {
									return (
										<TouchableOpacity
											activeOpacity={ 1 }
											style={ styles.rightContainer }
											onPress={ rightClick }>
											<Text style={ [styles.rightTitle, rightTitleStyle] }>{ rightTitle }</Text>
										</TouchableOpacity>
									);
								} else {
									return null;
								}
							})()
						}
					</View>

				</View>
			</View>
		);
	}
}

const propTypes = {
  centerIconStyle: Text.propTypes.style,
  rightIconFontStyle: Text.propTypes.style,
  title: React.PropTypes.string,
  rightTitle: React.PropTypes.string,
  hiddenBackIcon: React.PropTypes.bool,
  rightClick: React.PropTypes.func,
  backIconClick: React.PropTypes.func,
}

NavigatorBar.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		...Platform.select({
			ios: {
				height: 64,
			},
			android: {
				height: 50
			}
		}),
		backgroundColor: '#008dcf',
	},
	contentContainer: {
		flex: 1,
		...Platform.select({
			ios: {
				paddingTop: 15,
			},
			android: {
				paddingTop: 0,
			}
		}),
		flexDirection: 'row',
	},
	leftContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	centerContainer: {
		flex: 2,
		justifyContent: 'center',
	},
	rightContainer: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	backImg: {
		width: 30,
		height: 30,
		marginLeft: 10,
	},
	text: {
		textAlign: 'center',
		color: 'white',
		fontSize: 18,
	},
	rightIconFont: {
		fontSize: 20,
		color: 'white',
		marginRight: 15,
		marginTop: 2,
		fontFamily: 'iconfont',
	},
	rightTitle: {
		color: 'white',
		fontSize: 14,
		marginRight: 15,
		marginLeft: 15
	},
	centerImg: {
		alignSelf: 'center',
	},
	unreading: {
		backgroundColor: 'red',
		borderRadius:6,
		width:12,
		height: 12,
		top: 10,
		right: 10,
		position: 'absolute'
	},
	iconFont: {
		fontFamily: 'iconfont',
	},
});