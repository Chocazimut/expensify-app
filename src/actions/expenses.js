import uuid from 'uuid';
//import db from '../firebase/firebase';

//ADD EXPENSE

const addExpense = (
{
	description = '', 
	note = '', 
	amount = 0, 
	createdAt = 0 
} = {}
) => ({	
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
});

/*const addExpense = (expense) =>({
	type: 'ADD_EXPENSE',
	expense
});*/

/*export const startAddExpense = (expenseData = {}) => {
	return (dispatch) => {
		const {
			description = '', 
			note = '', 
			amount = 0, 
			createdAt = 0 
		} = expenseData;
		const expense = { description, note, amount, createdAt };
		db.ref('expense').push(expense).then((ref) => {
			dispatch(addExpense({
				id: ref.key,
				...expense
			}));
		});
	};
};*/

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