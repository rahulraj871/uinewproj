import React, {Suspense} from 'react';
import {
	Route, Switch, useHistory
} from 'react-router-dom';
import { withRouter } from "react-router";

import './App.css';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import routes from '../routes';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

export class App extends React.Component {

	constructor(props) {
		super(props);

		const userInfoStr = localStorage.getItem('user');
		if(!userInfoStr) {
			props.history.push('/login');
			return
		}

		props.history.push('/home');
	}

	render(props) {
		const menu = routes.map((route, index) => {
			return (route.component) ? (
				<Route
					key={index}
					path={route.path}
					exact={route.exact}
					name={route.name}
					render={props => (
						<route.component {...props} />
					)}/>
			) : (null);
		});

		return (
			<div>
				<div id="content">
					{this.props.location.pathname !== '/login' ? <Header/> : ''}

					<Suspense fallback={<div>Loading ...</div>}>
						<Switch>
							{menu}
							<Route path="/" component={Home}/>
						</Switch>
					</Suspense>

					{this.props.location.pathname !== '/login' ? <Footer/> : ''}
				</div>
			</div>
		);
	}
}

export default withRouter(App);
