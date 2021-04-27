import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shop from "./components/Shop/Shop";
import DettaglioProdotto from "./components/DettaglioProdotto/DettaglioProdotto";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Carrello from "./components/Carrello/Carrello";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login"
import Account from "./components/Account/Account"
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	return (
		<Router>
			<Nav></Nav>

			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/shop/:id" exact component={DettaglioProdotto} />
				<Route path="/carrello" exact component={Carrello} />
				<Route path="/account" exact component={Account} />
			</Switch>
			<AuthProvider>
				<Switch>
					<Route path="/signup" exact component={Signup}></Route>
					<Route path="/login" exact component={Login}></Route>
				</Switch>
			</AuthProvider>
		</Router>
	);
}

export default App;
