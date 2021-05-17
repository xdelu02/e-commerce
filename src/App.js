import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Shop from './components/Shop/Shop';
import DettaglioProdotto from './components/DettaglioProdotto/DettaglioProdotto';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Carrello from './components/Carrello/Carrello';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Account from './components/Account/Account';
import Admin from './components/Admin/Admin';
import NotFound from './components/NotFound/NotFound';
import Checkout from './components/Checkout/Checkout';

function App() {
	const RenderNavBar = withRouter(({ location }) => {
		let a = '/admin';

		switch (location.pathname) {
			case '/login':
			case '/signup':
			case a:
			case a + '/':
			case a + '/prodotti':
			case a + '/prodotti/':
			case a + '/ordini':
			case a + '/admins':
				return null;
			case a + '/prodotti/' + parseInt(location.pathname.replace( /^\D+/g, ''), 10):
				return null;
			default:
				return <Nav />;
		}
	});

	return (
		<Router>
			<RenderNavBar />
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/shop' exact component={Shop} />
				<Route path='/shop/:id' exact component={DettaglioProdotto} />
				<Route path='/account' exact component={Account} />
				<Route path='/admin' component={Admin} />
				<Route path='/checkout' component={Checkout} />
				<Route path='/404' exact component={NotFound} />
				<AuthProvider>
					<Route path='/carrello' exact component={Carrello} />
					<Route path='/signup' exact component={Signup} />
					<Route path='/login' exact component={Login} />
				</AuthProvider>
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
}

export default App;
