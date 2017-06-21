import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native'
const screenWidth = Dimensions.get('window').width;

class SegmentView extends Component{
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: props.defaultIndex || 0
		}
	}

	render() {
		const { type='radius', dataSource, selectedWithIndex, defaultIndex, height=44, borderRadius=1, borderWidth=1, mainColor='#2562b4', segStyle} = this.props
		const perWidth = this.props.perWidth || (screenWidth / dataSource.length)
		const selectedIndex = this.state.selectedIndex >= dataSource.length ? 0 : this.state.selectedIndex
		if (type == 'radius') {
			const items = dataSource.map((item,index)=>{
				const currentColor = index == selectedIndex ? mainColor : 'white';
				return (
					<TouchableOpacity activeOpacity={1} onPress={()=>{
							this.setState({selectedIndex: index})
							selectedWithIndex(index)
						}} key={index}>
						{
							(()=>{
								if (index == 0) {
									return (
										<View style={{width: perWidth-borderWidth,height: height-borderWidth*2,backgroundColor: currentColor,borderTopLeftRadius: borderRadius,borderBottomLeftRadius: borderRadius, justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}}>
											<View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
												<Text style={{ color: index == selectedIndex ? 'white' : mainColor}}>{item}</Text>
											</View>
											<View style={{height: height - borderWidth*2,width: borderWidth,backgroundColor: mainColor}}></View>
										</View>
									)
								} else if (index + 1 == dataSource.length) {
									return (
										<View style={{width: perWidth-borderWidth,height: height-borderWidth*2,backgroundColor: currentColor,borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius,justifyContent: 'center',alignItems: 'center'}}>
											<Text style={{ color: index == selectedIndex ? 'white' : mainColor}}>{item}</Text>
										</View>
									)
								} else {
									return (
										<View style={{width: perWidth,height: height-borderWidth*2,backgroundColor: currentColor,justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}}>
											<View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
												<Text style={{ color: index == selectedIndex ? 'white' : mainColor}}>{item}</Text>
											</View>
											<View style={{height: height - borderWidth*2,width: borderWidth,backgroundColor: mainColor}}></View>
										</View>
									)
								}
							})()
						}
					</TouchableOpacity>
				)
			})
			return (
				<View style={[styles.container1,{height: height,width: perWidth*dataSource.length,borderRadius: borderRadius+1.5,borderColor: mainColor,borderWidth:1}]}>
					{items}
				</View>
			)
		} else if (type == 'plain') {
			const items = dataSource.map((item,index)=>{
				return (
					<TouchableOpacity activeOpacity={1} onPress={()=>{
							this.setState({selectedIndex: index})
							selectedWithIndex(index)
						}} key={index}>
						<View style={{width: perWidth, height:height,alignItems: 'center'}}>
							<View style={{height: height-2,justifyContent:'center',alignItems:'center'}}>
								<Text style={{ color: index == selectedIndex ? mainColor : 'gray'}}>{item}</Text>
							</View>
							{
								index == selectedIndex ?
									<View style={{backgroundColor: mainColor,height: 1, width: perWidth * 0.8}}></View>
								: null
							}
						</View>
					</TouchableOpacity>
				)
			})

			return (
				<View style={[styles.container2,{height: height}]}>
					{ items }
				</View>
			)
		} else if (type == 'radius_space_between') {
			const items = dataSource.map((item,index)=>{
				return (
					<TouchableOpacity activeOpacity={1} onPress={()=>{
							this.setState({selectedIndex: index})
							selectedWithIndex(index)
						}} key={index}>
						<View style={{width: perWidth, height:height,alignItems: 'center'}}>
							<View style={{height: height-2,justifyContent:'center',alignItems:'center'}}>
								<View style={{
									borderRadius: index == selectedIndex ? 12 : 12,
									backgroundColor: index == selectedIndex ? '#e0ecf6' :'#f4f4f4',
									borderWidth: index == selectedIndex ? 0.5 : 0,
									borderColor: mainColor
								}}>
									<Text style={{
										marginTop: 5,marginBottom: 5,marginRight: 10,marginLeft:10,
										color: index == selectedIndex ? mainColor : 'gray',
									}}>{item}</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				)
			})

			return (
				<View style={[{flexDirection: 'row',height: height},segStyle]}>
					{ items }
				</View>
			)
		};
	}
}
const styles = StyleSheet.create({
	container1: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container2: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#d9d9d9'
	}
})
SegmentView.propTypes = {
	dataSource: React.PropTypes.array.isRequired,
	selectedWithIndex: React.PropTypes.func.isRequired,
	height: React.PropTypes.number,
	perWidth: React.PropTypes.number.isRequired,
	defaultIndex: React.PropTypes.number,
	borderRadius: React.PropTypes.number,
	borderWidth: React.PropTypes.number,
	selectedIndex: React.PropTypes.number,
	type: React.PropTypes.oneOf(['radius','plain','radius_space_between']),
	mainColor: React.PropTypes.string
}

export default SegmentView