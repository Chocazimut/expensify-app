import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';


//export de du component non connecté pour les tests unitaires
export const ExpenseList = (props) => (
	<div className="content-container">
		<div className="list-header">
			<div className="show-for-mobile">Expenses</div>
			<div className="show-for-desktop">Expense</div>
			<div className="show-for-desktop">Amount</div>
		</div>
		<div className="list-body">
			{
				props.expenses.length === 0 ? (
				<div	className="list-item list-item__message">
					<span> No expense </span>
				</div>
				) : (
					props.expenses.map((expense) => {
						return <ExpenseListItem key={expense.id}{...expense} />;
					})
				)
			}
		</div>
	</div>
);

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	};
};

//connect permet de définir les choses que l'on veut récupérer du store (ici mapStateProps)
// et définit le component qui va comprendre la version connectée (ici ExpenseList)

export default connect(mapStateToProps)(ExpenseList);
