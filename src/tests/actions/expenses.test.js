import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses'
import expenses from '../fixtures/expenses';
import db from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({id, description, amount, note, createdAt}) => {
		expensesData[id] = { description, amount, note, createdAt };
	});
	db.ref('expenses').set(expensesData).then(()=>done());
});

test('should setup remove action object', ()=>{
	const action = removeExpense({id: '123aze'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE', 
		id: '123aze'
	});
});

test('should edit note of the object', ()=> {
	const action = editExpense('123aze', {note: 'titi'});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123aze',
		updates: {
			note: 'titi'
		}
	});
});

test('should setup add expense action object with provided values',()=>{
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});


test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Mouse', 
		amount: 3000,
		note: '', 
		createdAt: 1000
	}
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		return db.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
	});
});


test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore({});
	const expenseDefaults = {
		description: '', 
		amount: 0, 
		note: '', 
		createdAt: 0 
	};

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseDefaults
			}
		});

		return db.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseDefaults);
		done();
	});
});




test('should setup set expense action object with data', ()=>{
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});

});

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore({});
		store.dispatch(startSetExpenses({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});