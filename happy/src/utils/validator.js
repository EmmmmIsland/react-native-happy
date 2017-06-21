const isPhoneNumber = (phoneNumber) => {
	const reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
	return reg.test(phoneNumber)
}

// 数字、字母两者组合6-12位
const isPassword = (password) => {
	const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
	return reg.test(password);
}

export default {
	isPhoneNumber,
	isPassword
}