import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

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
	const expenseData = {
		description: 'Rent',
		amount: 600,
		createdAt: 1000,
		note: 'this was last month rent',
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String),
		}
	});
});

test('should setup add expense action object with default values', ()=>{
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			description: '', 
			note: '', 
			amount: 0, 
			createdAt: 0 
		}
	});

});