// export default function post (params){
// 	const {url} = params;
// 	console.log('%c HTTP Request','color:blue');
// 	console.log(`%c request url ${url}`,'color:green');
// 	console.log(`%c Request params ${params.phoneNum}`,'color:green');
// 	delete params.url;
// 	let body = JSON.stringify(params)
// 	console.log("body ==== ",body);
// 	return new Promise((resolve, reject) => {
// 	  fetch(url,{
// 	  	method: 'post',
// 	  	headers:{
// 	  		"Accept": "application/json",
// 	  		"Content-Type" : "application/json"
// 	  	},
// 	  	timeout: 3000,
// 	  	body,
// 	  })
// 	  	.then((response) => response.json())
// 	    .then((responseData) => {
// 	      console.log('%c responseData is ','color:green', responseData);
// 	    	resolve(responseData);
// 	    })
// 	    .catch((error) => {
// 	      reject(error);
// 	    });
// 	});
// }


import {ToastMessage} from '../utils/toast'
import Global from '../utils/global'

const _fetch = (fetch_promise, timeout=30000) => {
  let abort_fn = null;
  const abort_promise = new Promise((resolve, reject) => {
		abort_fn = () => {
      const err = new Error('timeout')
		  reject(err);
		}
  })
	const abortable_promise = Promise.race([fetch_promise,abort_promise]);
  setTimeout(()=>{
		abort_fn()
  }, timeout)
	return abortable_promise;

}

const post = (params) => {
  const {url, successMsg} = params
  let body = params.body
  console.log('%c HTTP Request', 'color:blue')
  console.log(`%c request url ${url}`, 'color:green')
  if (!body) {body = {}}
  body.deviceId = global.UDID
  body.platform = global.platform

	const jsonBody = JSON.stringify(body)
	console.log(`%c Request params ${jsonBody}`,'color:green');

	const myFetch = fetch(url,{
		method: 'post',
		headers:{
			"Accept": "application/json",
			"Content-Type" : "application/json"
		},
		body:jsonBody,
  })
	return new Promise((resolve, reject) => {
    _fetch(myFetch, 30000)
  	  .then(response => {
    		return response.json();
  	  })
  	  .then(responseData=>{
  	  	console.log('%c responseData is ','color:green', responseData);
  	  	/* 虽然后台返回的数据正确的收到了，但是这里需要具体的判断成功还是失败，例如以code为标志 code = 200 表示成功*/
  	  	if (responseData.code == '200') {
	  	  	if (successMsg) {
						ToastMessage(successMsg);
	  	  	};
	  	  	resolve(responseData)
  	  	}else{
  	  		if (responseData && responseData.message) {
  	  			ToastMessage(responseData.message)
  	  		}
  	  		reject(responseData)
  	  	}
  	  })
  	  .catch(error=>{
        console.log("----http error",error.message);
        if (error.message === 'timeout') {
          ToastMessage('网络超时');
        }else{
    	  	ToastMessage('网络错误？');
        }
  	  	reject(error);
  	  });
	});
}

export default post



