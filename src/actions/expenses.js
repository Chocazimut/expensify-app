import uuid from 'uuid';
import db from '../firebase/firebase';

//ADD EXPENSE

const addExpense = (expense) =>({
	type: 'ADD_EXPENSE',
	expense
});

export const startAddExpense = (expenseData = {}) => {
	//cette fonction est utilisée via reduc donc dispatch
	return (dispatch) => {
		const {
			description = '', 
			note = '', 
			amount = 0, 
			createdAt = 0 
		} = expenseData;
		const expense = { description, note, amount, createdAt };
		
		return db.ref('expenses').push(expense).then((ref) => {
			dispatch(addExpense({
				id: ref.key,
				...expense
			}));
		});
	};
};

//REMOVE EXPENSE
const removeExpense = ({id} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

//EDIT EXPENSE

const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id, 
	updates,
});

export { addExpense, removeExpense, editExpense };