import React from 'react';
import { InteractionManager } from 'react-native';
import Storage from '../utils/storage';
import * as RouteType from '../constants/routeType';

import Pages from './pages';


let lastPush = {};
let lastTime = new Date().getTime();

export default class Router {

	constructor(navigator) {
	  this.navigator = navigator;
	}

	push(route) {
    console.log('push -ing to route', route);
		const timestamp = new Date().getTime();
		const needLogin = route.needLogin;
		if (lastPush.key === route.key && timestamp - lastTime < 1500) {
			console.log(' push route too quickly ', route);
		} else {
			lastPush = route;
			lastTime = timestamp;
			// Storage.get('user').then((user) => {
				// if (!user && needLogin) {
				// 	InteractionManager.runAfterInteractions(() => {
				// 		this.navigator.push(LOGIN_PAGE);
				// 	});
				// } else {
					InteractionManager.runAfterInteractions(() => {
						const routes = this.navigator.getCurrentRoutes();
						const nextIndex = routes[routes.length - 1].index + 1;
						route.index = nextIndex;
						this.navigator.push(route);
					});
				// }
			// });
		}
	}


	getCurrentRoute() {
		const routes = this.navigator.getCurrentRoutes();
		return routes[routes.length - 1];
	}

	getForwardRoute() {
		const routes = this.navigator.getCurrentRoutes();
		return routes[routes.length - 2];
	}

	pop() {
		this.navigator.pop();
	}

	popToRoute(indicat) {

		const routes = this.navigator.getCurrentRoutes();
		let matched = false;
		routes.map((aRoute)=>{
			if (aRoute.key === indicat) {
				this.navigator.popToRoute(aRoute);
				matched = true;
			}
		})
		if (!matched) {
			console.error(`target page does not included in the stack history : ${indicat},${routes}`)
		}
	}

	replaceWithHome() {
		this.navigator.popToTop();
	}

	toLogin() {
		this.push(LOGIN_PAGE, true);
	}

	redirect(indicat, params) {

		console.log(" ---- pages ",Pages,indicat);
		let matched = false;
		Pages.map((aPage,index)=>{
			if (indicat === aPage.key && !matched) {
				matched = true;
				aPage.params = params;
				return this.push(aPage);
			};
		})
		if (!matched) {
			console.error(`未配置相关路由, 路由key：${indicat}`,);
		};
	}

}
