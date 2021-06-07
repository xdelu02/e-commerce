import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Shop from './components/Shop/Shop';
import DettaglioProdotto from './components/DettaglioProdotto/DettaglioProdotto';
import NavigationBarShop from './components/Nav/NavigationBarShop';
import Home from './components/Home/Home';
import Carrello from './components/Carrello/Carrello';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Account from './components/Account/Account';
import Admin from './components/Admin/Admin';
import NotFound from './components/NotFound/NotFound';
import Checkout from './components/Checkout/Checkout';
import Success from './components/Success/Success';

function App() {
	const RenderNavBar = withRouter(({ location }) => {
		let a = '/admin';

		switch (location.pathname) {
			case '/login':
			case '/signup':
			case '/404':
			case a:
			case a + '/':
			case a + '/404':
			case a + '/prodotti':
			case a + '/prodotti/':
			case a + '/prodotti/add':
			case a + '/prodotti/add/':
			case a + '/ordini':
			case a + '/admins':
				return null;
			case a + '/prodotti/' + parseInt(location.pathname.replace(/^\D+/g, ''), 10):
				return null;
			default:
				return <NavigationBarShop />;
		}
	});

	return (
		<Router>
			<RenderNavBar />
			<Switch>
				<Route path='/shop' exact component={Shop} />
				<Route path='/shop/:id' exact component={DettaglioProdotto} />
				<Route path='/admin' component={Admin} />
				<Route path='/success' exact component={Success} />
				<Route path='/404' exact component={NotFound} />
				<AuthProvider>
					<Route path='/' exact component={Home} />
					<Route path='/carrello' exact component={Carrello} />
					<Route path='/checkout' exact component={Checkout} />
					<Route path='/account' exact component={Account} />
					<Route path='/signup' exact component={Signup} />
					<Route path='/login' exact component={Login} />
				</AuthProvider>
				<Route path='' component={NotFound} />
			</Switch>
		</Router>
	);
}

export default App;
