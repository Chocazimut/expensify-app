import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';




store.subscribe(()=> {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: 1000}));

//store.dispatch(removeExpense({id: expenseOne.expense.id}));
//store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

//store.dispatch(setTextFilter('ffe'));
//store.dispatch(setTextFilter(''));

//store.dispatch(sortByDate());
//store.dispatch(sortByAmount());

//store.dispatch(setStartDate(-1000));
//store.dispatch(setStartDate());

//store.dispatch(setEndDate(1000));

