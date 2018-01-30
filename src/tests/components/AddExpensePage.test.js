import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

//permet de générer ces 4 lignes au début de chaque test pour 
//ne pas avoir à les réécrire à chaque test
beforeEach(() => {
	startAddExpense = jest.fn();
	history =  { push: jest.fn() };
	wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle on submit', () => { 
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});