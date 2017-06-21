
import { NativeModules, Platform, ToastAndroid } from 'react-native';

const NativeToast = NativeModules.ToastModule;

const ToastMessage = (msg) => {
	if (!msg) {
		if (__DEV__) {
			msg = '提示信息不能为空'
		}else{
			return
		}
	};
	if (Platform.OS === 'android') {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	} else if (Platform.OS = 'ios') {
		NativeToast.showMessage(msg);
	}
}
export {
	ToastMessage
}