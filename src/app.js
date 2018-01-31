import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import { startSetExpenses, startRemoveExpense, editExpense } from './actions/expenses';
import { login, logout } from './actions/auth';
//normalize : import de la librairie normalize qui pose un default stylesheet 
//Avant toute modification css, comme ça même base interprétée par 
// tous les browsers
import 'normalize.css/normalize.css';
import './styles/styles.scss';
//css lié aux calendriers indispensables pr la vue du calendar
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';
//import './playground/promises';

const store = configureStore();
const jsx = (
	// Provider permet de donner accès au store à tous les components
	<Provider store={store}> 
		<AppRouter />
	</Provider>
);
let hasRendered = false;

const renderApp = () => {
	if (!hasRendered){
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered =true;
	}
};
ReactDOM.render(<p>loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(login(user.uid));
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
			if (history.location.pathname === '/') {
				history.push('/dashboard');
			}
		});
	} else {
		store.dispatch(logout());
		renderApp();
		history.push('/');
	}
});
