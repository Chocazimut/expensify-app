import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test ('should set default state', ()=> {
	const state = expensesReducer(undefined, {type: '@@INIT'});
	expect(state).toEqual([]);
});

test ('should  remove expenses', ()=> {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test ('should not remove expenses if id not found', ()=> {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test ('should add an expenses', ()=> {
	const action = {
		type: 'ADD_EXPENSE',
		id:4, 
		description: 'papy',
		note: '',
		amount: 100,
		createdAt: 0
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expenses[3]])
});


test ('should edit expenses', ()=> {
	const amount = 200;
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[1].id,
		updates: {
			amount,
		}
	}
	const state = expensesReducer(expenses, action);
	expect(state[1].amount).toBe(amount);
});


test ('should not edit expenses if expense not found', ()=> {
	const amount = 200;
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			amount,
		}
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});