import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByDate , sortByAmount, setStartDate, setEndDate } from './actions/filters';
//normalize : import de la librairie normalize qui pose un default stylesheet 
//Avant toute modification css, comme ça même base interprétée par 
// tous les browsers
import 'normalize.css/normalize.css';
import './styles/styles.scss';
//css lié aux calendriers indispensables pr la vue du calendar
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

//pour écouter toutes les modif et automatiser une action a chaque changement
/*store.subscribe(()=> {
	console.log('coco');
});*/

store.dispatch(addExpense({description: 'Water bill', amount: 100, createdAt: 100 }));
store.dispatch(addExpense({description: 'Rent ', amount: 300, createdAt: 200}));
store.dispatch(addExpense({description: 'Gas bill', amount: 200, createdAt: 300}));
//store.dispatch(setTextFilter(''));

/*setTimeout (() => {
	store.dispatch(setTextFilter(''));
}, 3000)
*/
const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

const jsx = (
	// Provider permet de donner accès au store à tous les components
	<Provider store={store}> 
		<AppRouter />
	</Provider>
);

//Affiche dans le DOM le parent qui lui meme affiche les enfants.
ReactDOM.render(jsx, document.getElementById('app'));

