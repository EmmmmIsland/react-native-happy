import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';

import Swiper from 'react-native-swiper';
import Img01 from '../../../assets/img/welcome1.jpg';
import Img02 from '../../../assets/img/welcome2.jpg';

import Storage from '../../utils/storage';
import {IS_FIRST_FLAG} from '../../constants/setting';
import MainContainer from '../../containers/app/main';
import LoginContainer from '../../containers/mine/login'
import * as RouteType from '../../constants/routeType'
const {width, height} = Dimensions.get('window');

class Guide extends Component {

    constructor(props) {
        super(props);
    }

    _toMain() {
        const {navigator} = this.props;
        Storage.save(IS_FIRST_FLAG, '1');
        Storage.get('userInfo').then((userInfo) => {
            console.log(">>>>>>>> userinfo is login ", userInfo);
            if (!userInfo) {
                title = RouteType.LOGIN_PAGE;
                desComponent = LoginContainer;
            } else {
                title = 'Main';
                desComponent = MainContainer;
            }
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component: desComponent,
                    name: title,
                    key: title
                });
            });
        })
    }

    render() {
        return (
            <Swiper style={ styles.wrapper } showsButtons={ false }
                    height={ height } loop={ false }
                    showsPagination={ false }
                    onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}>
                <View style={ styles.slide }>
                    <Image style={ styles.image } source={ Img01 } resizeMode='stretch'/>
                </View>
                <View style={ styles.slide }>
                    <Image style={ styles.image } source={ Img02 } resizeMode='stretch'>
                        <Text style={{flex: 1,marginTop: height - height / 5}} onPress={ this._toMain.bind(this) }></Text>
                    </Image>
                </View>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: width,
        height: height,
        resizeMode: 'contain',
    }
})

export default Guide;
