import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { View } from 'react-native';

import TabBar from '../../components/app/tabBar';
import { changeTabBarAction } from '../../action/app';
import commonStyle from '../../../assets/css/common';


class MainContainer extends Component {

	constructor(props) {
	  super(props);
	  this._changeTab = this._changeTab.bind(this);
	}

  static propTypes = {
    currentTab: PropTypes.string.isRequired,
    routes: PropTypes.instanceOf(Immutable.List),
  };

	_changeTab(tab) {
		this.props.dispatch(changeTabBarAction(tab));
	}

	render() {
		const { upgrade } = this.props;
		return (
			<View style={ commonStyle.container }>
				<TabBar
					{ ...this.props }
					changeTab={ this._changeTab }/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	const { app } = state;
	return {
		routes: app.get('routes'),
		currentTab: app.get('currentTab'),
		// upgrade: app.get('upgrade'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
