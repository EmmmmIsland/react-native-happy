/**
 * Created by xizhixin on 2017/3/28.
 * 首页grid网格布局
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
    WHITE_COLOR,
    RED_TEXT_COLOR
} from '../../constants/staticColor'

export default class HomeCell extends Component {
    constructor(props) {
        super(props);
    }

    //定义相关属性类型
    static propTypes = {
        badgeStyle: View.propTypes.style,
        backgroundColor: View.propTypes.style,
        title: PropTypes.string.isRequired,
        padding: PropTypes.number,
        renderImage: PropTypes.func,
        clickAction: PropTypes.func,
        badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }

    //render外部传递的组件
    renderImage(props) {
        if (this.props.renderImage) {
            //这里将引用外部renderImage方法
            return React.cloneElement(this.props.renderImage(), props);
        } else {
            return null;
        }
    }

    render() {
        let {title, renderImage, padding, badgeText, clickAction} = this.props;
        return (
            <TouchableOpacity style={[{
                paddingTop: 40,
                paddingBottom: 40,
                paddingLeft: 54,
                paddingRight: 54,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: WHITE_COLOR
            }, this.props.badgeStyle]}
                              onPress={() => {
                                  clickAction()
                              }} activeOpacity={0.6}>
                <View style={[{width: 80, height: 80, borderRadius: 40}, this.props.backgroundColor]}>
                    <View style={{alignSelf: 'center'}}>
                        {
                            badgeText ?
                                <View style={styles.badgeIcon}><Text style={{
                                    color: WHITE_COLOR, fontSize: 11,
                                    backgroundColor: 'transparent'
                                }}>{badgeText}</Text></View>
                                : <View style={styles.badgeNull}/>
                        }

                        {this.renderImage(this.props)}
                    </View>
                    <Text style={{
                        marginTop: padding,
                        fontSize: 14,
                        color: WHITE_COLOR,
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({
    badgeIcon: {
        backgroundColor: RED_TEXT_COLOR,
        width: 18,
        height: 18,
        alignSelf: 'center',
        borderRadius: 9,
        alignItems: 'center',
        zIndex: 3,
        justifyContent: 'center',
        position: 'relative',
        top: 6,
        right: -12
    },
    badgeNull: {
        width: 18,
        height: 18,
        alignSelf: 'center',
        borderRadius: 9,
        alignItems: 'center',
        zIndex: 3,
        justifyContent: 'center',
        position: 'relative',
        top: 6,
        right: -12
    },
})