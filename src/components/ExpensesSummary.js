import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import { Link } from 'react-router-dom';

export  const ExpensesSummary = ({ expensesCount, expensesTotal}) => {
	const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
	const formatedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00');
	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title"> <span>{expensesCount}</span> {expenseWord} totaling <span>{formatedExpensesTotal}</span></h1>
				<div className="page-header__action">
					<Link className="button"to="/create"> Add Expense </Link>
				</div>
			</div>
		</div>	
	);
};

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: selectExpensesTotal(visibleExpenses)
	};
};

export default connect(mapStateToProps)(ExpensesSummary);