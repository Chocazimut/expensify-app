import React from 'react'; 
//permet de capter la date
import moment from 'moment';
//necessaire pour utiliser react-date
import 'react-dates/initialize';
//react date permet de générer des calendar pickers
import { SingleDatePicker } from 'react-dates';


// crée la timeline
const now = moment();
//pose le format de la timeline
(now.format('MMM Do YYYY'));

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt:  props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: ''		
		}		
	}

	
	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(()=> ({ description }));
	};
	
	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({ note }))
	};

	onAmountChange = (e) => {
		const amount = e.target.value;
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
			this.setState(()=>({ amount }))
		}
	};

	onDateChange = (createdAt) => {
		if (createdAt){
			this.setState(() => ({ createdAt }))
		}
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};

	onSubmit = (e) => {
		e.preventDefault();

		if (!this.state.description ||!this.state.amount){
			this.setState(() => ({ error: 'Please provide a description and an amount'}));
		} else {
			this.setState(() => ({error: ''}));
			console.log('Submitted !');
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10)* 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			})
		}
	}
	render() {
		return (
			<div>
				{this.state.error &&  <p>{this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
				<input 
					type='text'
					placeholder='Description'
					autoFocus
					value={this.state.description}
					//onChange nécessaire pour pouvoir changer la valeur du champ
					onChange={this.onDescriptionChange}
				/>
				<input
					type='text'
					placeholder='Amount'
					value={this.state.amount}
					onChange={this.onAmountChange}
				/>
				{/* champ de selection de la date via calendrier*/}
				<SingleDatePicker 
				//différentes options du calendrier
					//date selectionnée de base
					date={this.state.createdAt}
					//fonction appelée en cas de changement de date
					onDateChange={this.onDateChange}
					//coloration de la date selectionnée
					focused={this.state.calendarFocused}
					//coloration de la date selectionnée
					onFocusChange={this.onFocusChange}
					//nombre de calendriers qui s'affichent
					numberOfMonths={1}
					//permet de selection une date antérieure à la date du jour
					isOutsideRange={() => false}

				/>
				<textarea
					placeholder='Add a note for yout expense (optional)'
					value={this.state.note}
					onChange={this.onNoteChange}
				>
				</textarea>
				<button>Add Expense</button>
				</form>
			</div>
		);
	}
}