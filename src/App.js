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

function App() {
	const Main = withRouter(({ location }) => {
		return <div>{location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/admin' && location.pathname !== '/404' && <Nav />}</div>;
	});

	return (
		<Router>
			<Main />
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/shop' exact component={Shop} />
				<Route path='/shop/:id' exact component={DettaglioProdotto} />
				<Route path='/carrello' exact component={Carrello} />
				<Route path='/account' exact component={Account} />
				<Route path='/admin' component={Admin} />
				<Route path='/404' exact component={NotFound} />
			</Switch>
			<AuthProvider>
				<Switch>
					<Route path='/signup' exact component={Signup} />
					<Route path='/login' exact component={Login} />
				</Switch>
			</AuthProvider>
		</Router>
	);
}

export default App;
