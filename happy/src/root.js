/**
 * Created by wangl on 2017/5/4.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

'use strict';

import { Provider } from 'react-redux';
import configureStore from './store/store';
import App from './containers/app';

const store = configureStore();

export default class together extends Component {
    constructor(props) {
        super(props);
        this.netStatus = '';
    }

    render() {
        return (
            <Provider store={ store }>
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('together', () => together);
