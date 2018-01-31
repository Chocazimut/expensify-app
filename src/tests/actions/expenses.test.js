import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	startAddExpense, 
	addExpense, 
	startEditExpense,
	editExpense, 
	startRemoveExpense, 
	removeExpense, 
	setExpenses, 
	startSetExpenses 
} from '../../actions/expenses'
import expenses from '../fixtures/expenses';
import db from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({id, description, amount, note, createdAt}) => {
		expensesData[id] = { description, amount, note, createdAt };
	});
	db.ref(`users/${uid}/expenses`).set(expensesData).then(()=>done());
});

test('should setup remove action object', ()=>{
	const action = removeExpense({id: '123aze'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE', 
		id: '123aze'
	});
});

test('should remove expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[2].id;
	store.dispatch(startRemoveExpense({id})).then(() => {
		const action = store.getActions();
		expect(action[0]).toEqual({
			type: 'REMOVE_EXPENSE', 
			id
		});
		return db.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
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

test('should edit expense from firebase', (done) => {
	//mockstore permet d'utiliser dispatch dans les test pour appeler les actions
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;
	const updates = {
		amount:300
	};
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const action = store.getActions();
		expect(action[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		});
		return db.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual({
			description: 'titi',
			note: '',
			amount: 300,
			createdAt: 0
		});
		done();
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
	const store = createMockStore(defaultAuthState);
	const expenseData = {
		description: 'Mouse', 
		amount: 3000,
		note: '', 
		createdAt: 1000
	};
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
	});
});



//ASYNC test du coup on utiliser mock et done
test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
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

		return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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
	const store = createMockStore(defaultAuthState);
		store.dispatch(startSetExpenses({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});