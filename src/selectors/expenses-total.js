export default (expenses) => {
	return expenses
	//fait d'une liste d'objet, une liste des amount
	.map((expense) => expense.amount)
	//addition les amounts de la list
	.reduce((sum, value) => sum + value, 0);
};