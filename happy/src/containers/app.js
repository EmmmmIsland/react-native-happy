/*
* @author:  yinyongqian
* @createTime:  2017-03-20, 16:01:37 GMT+0800
* @description:  description
*/

'use strict';
import React, { Component } from 'react';
import {
	View,
	Navigator,
	StatusBar,
  BackAndroid,
} from 'react-native';
import Splash from '../containers/app/splash';
import Router from '../constants/router';
import {
  DEBUG
} from '../constants/setting'

class App extends Component {
	constructor(props) {
	  super(props);
    this.renderScene = this.renderScene.bind(this);
    if(!DEBUG){
      console.log = () => {};
      console.error = () => {};
      console.warn = () => {};
      global.ErrorUtils.setGlobalHandler(() => {});
    }
	}

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
  }

	handleBack = () => {


	  const navigator = this.refs.navigator;

	  if (navigator && navigator.getCurrentRoutes().length > 1) {

	    navigator.pop();

	    return true;
	  }
	  return false;
	};

	componentWillUnmount () {
	  BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
	}

	renderScene(route, navigator) {
	  this.router = this.router || new Router(navigator);
	  const Component = route.component;
	  return (
	    <Component
	      route={ route }
	      router={ this.router }
	      navigator={ navigator } />
	  );
	}

	configureScene(route, routeStack) {
	  if (route.type === 'bottom') {
	    return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
	  }
	  return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
	}

	render() {
		return (
      <View style={{ flex: 1 }}>
        <StatusBar
         backgroundColor='#2562b4'
         barStyle='light-content'/>
        <Navigator
          ref='navigator'
          style={{ flex: 1 }}
          configureScene={ this.configureScene }
          renderScene={ this.renderScene }
          initialRoute={{
            component: Splash,
            name: 'Splash'
          }}/>
      </View>
		);
	}
}

export default App;

