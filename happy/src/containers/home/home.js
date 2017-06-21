import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
 	Dimensions,
    DeviceEventEmitter,
	Platform,
    NativeAppEventEmitter
} from 'react-native';
import HomeCell from '../../components/home/homeCell';
import Swiper from 'react-native-swiper';
import stylesCommon from '../../../assets/css/common';
import * as API from '../../constants/api';
import bannerImg1 from '../../../assets/img/uzi1.jpg';
import bannerImg2 from '../../../assets/img/uzi2.jpg';
import bannerImg3 from '../../../assets/img/uzi3.jpg';

import * as RouteType from '../../constants/routeType'



import {
	WHITE_COLOR,
    BLUE_TEXT_COLOR,
    BLUE_CIRCLE_COLOR,
    ORANGE_CIRCLE_COLOR,
    RED_CIRCLE_COLOR,
    DEVIDE_LINE_COLOR
} from '../../constants/staticColor';

import { changeTabBarAction,mainPressAction } from '../../action/app';

//获取屏幕宽高尺寸
const { width, height } = Dimensions.get('window');

class Home extends Component {

	constructor(props) {
	  super(props);

        this.images=[
            bannerImg1,
            bannerImg2,
            bannerImg3,
        ];
        this._changeTab = this._changeTab.bind(this);
	}
	componentDidMount() {

	}


	//切换tabBar
    _changeTab(tab) {
        this.props.dispatch(changeTabBarAction(tab));
    }

    //切换订单tab
	_changeOrderTab(orderTab){
		this.props.dispatch(mainPressAction(orderTab))
	}

    renderImg(){
        var imageViews=[];
        for(var i=0;i<this.images.length;i++){
            imageViews.push(
				<Image
					key={i}
					style={{alignItems:'center',width:width,height:214}}
					source={this.images[i]}
				/>
            );
        }
        return imageViews;
    }

	render() {
    const { mine, app } = this.props;
		// const name = mine.get('minename');
		// const data = mine.get('data');
		return (
			<View style={stylesCommon.container}>
				<Swiper height={214}
						width={width}
						paginationStyle={{bottom:5}}
						autoplay={true}
						dot={<View style={{width:6,height:6,backgroundColor:WHITE_COLOR,borderRadius:3,marginLeft:3,marginRight:3}}></View>}
						activeDot={<View style={{width:6,height:6,backgroundColor:BLUE_TEXT_COLOR,borderRadius:3,marginLeft:3,marginRight:3}}></View>}
				>
                    {this.renderImg()}
				</Swiper>
				<View style={{flexDirection:'row',marginTop:10}}>
					<HomeCell
						title='接单'//文字
						padding={3}//文字与图片间距
						badgeStyle={{flex:1}}
						backgroundColor={{backgroundColor:BLUE_CIRCLE_COLOR}}//大圆背景色
						badgeText={1}//消息提示
						renderImage={()=><Text style={styles.icon}>&#xe60d;</Text>}//图标
						clickAction={()=>{//点击事件
							//this._changeTab('goodsSource');
                            this.props.router.redirect(RouteType.GOODS_SOURCE_DETAILS,
                                {
                                    goods_transCode: '333',
                                });
						}}
					/>
					<View style={styles.line}></View>
					<HomeCell
						title='发运'
						padding={2}
						badgeStyle={{flex:1}}
						backgroundColor={{backgroundColor:ORANGE_CIRCLE_COLOR}}
						badgeText={'...'}
						renderImage={()=><Text style={styles.icon}>&#xe611;</Text>}
						clickAction={()=>{
                            this._changeTab('order');
							this._changeOrderTab(1);
                        }}
					/>
				</View>
				<View style={{backgroundColor:DEVIDE_LINE_COLOR,height:0.5}}/>
				<View style={{flexDirection:'row'}}>
					<HomeCell
						title='签收'
						padding={3}//文字与图片间距
						badgeStyle={{flex:1}}
						backgroundColor={{backgroundColor:RED_CIRCLE_COLOR}}
						badgeText={20}
						renderImage={()=><Text style={styles.icon}>&#xe60c;</Text>}
						clickAction={()=>{
                            this._changeTab('order');
                            this._changeOrderTab(2);
                        }}
					/>
					<View style={styles.line}></View>
					<HomeCell
						title='回单'
						padding={3}
						badgeStyle={{flex:1}}
						backgroundColor={{backgroundColor:BLUE_CIRCLE_COLOR}}
						badgeText={0}
						renderImage={()=><Text style={styles.icon}>&#xe60e;</Text>}
						clickAction={()=>{
                            this._changeTab('order');
                            this._changeOrderTab(3);
                        }}
					/>
				</View>
			</View>
		);
	}
}


const styles =StyleSheet.create({
	line:{
   	 	backgroundColor:DEVIDE_LINE_COLOR,
		width:0.5
  	},
	icon:{
		fontFamily:'iconfont',
		fontSize:23,
		color:WHITE_COLOR
	}
})

function mapStateToProps(state) {
	// console.log('===? ',state.mine)
	return {
		// mine:state.mine,
		// app: state.app,
	}
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
