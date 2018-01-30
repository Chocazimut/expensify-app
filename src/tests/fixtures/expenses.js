import moment from 'moment';

const expenses = [{
	id:'1', 
	description: 'titi',
	note: '',
	amount: 100,
	createdAt: 0
}, {
	id:'2', 
	description: 'coco',
	note: '',
	amount: 200,
	createdAt: moment(0).subtract(4, 'days').valueOf(),
},{
	id:'3', 
	description: 'tata',
	note: '',
	amount: 50,
	createdAt: moment(0).add(4, 'days').valueOf(),
},
];

export default expenses;