/*
* @author:  yinyongqian
* @createTime:  2017-03-22, 11:18:32 GMT+0800
* @description:  description
*/
import React, { Component, PropTypes } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	Dimensions,
	TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');
import backIcon from '../../../assets/img/back.png'
import rightArrow from '../../../assets/img/rightarrow.png'
import * as StaticColor from '../../constants/staticColor'

class SettingCell extends Component{
	constructor(props) {
		super(props);
	}

	static propTypes = {
	  style: PropTypes.object,
	  content: PropTypes.string,
	  clickAction: PropTypes.func,
	  showBottomLine: PropTypes.bool
	};

	render() {
		const {style, leftIcon, content, clickAction, showBottomLine, rightIcon=rightArrow } = this.props;
		return (
			<TouchableOpacity onPress={()=>{clickAction()}} activeOpacity={0.6}>
				<View style={{flex:1}}>
					<View style={[styles.container,{...style}]}>
						<View style={styles.leftPart}>
							<Text style={styles.iconfont}>{leftIcon}</Text>
							<Text style={styles.contentText}>{content}</Text>
						</View>
						<Image style={styles.rightIcon} source={rightIcon}/>
					</View>
				</View>
				{
					showBottomLine ? <View style={styles.separateLine}></View> : null
				}
			</TouchableOpacity>
		)
	}
}
const styles = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: 'row',
		height: 44,
		width,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	leftPart: {
		flex:1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	rightIcon: {
		marginRight: 10,
	},
	contentText: {
		marginLeft: 15,
		textAlign: 'center'
	},
	separateLine: {
		height: 0.5,
		backgroundColor: StaticColor.COLOR_SEPARATE_LINE,
		marginLeft: 45
	},
    iconfont: {
        fontFamily: 'iconfont',
        color: StaticColor.CALENDER_ICON_COLOR,
		paddingTop:3,
        fontSize: 16,
        marginLeft:10,
    }
})
export default SettingCell