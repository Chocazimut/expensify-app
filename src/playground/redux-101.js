import { createStore } from 'redux';

const incrementCount = ({incrementBy = 1} = {})=> ({
	type: 'INCREMENT', 
	incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1}) => ({
	type: 'DECREMENT',
	decrementBy: decrementBy
});

const reserCount = () => ({
	type: 'RESET',
});

const setCount = ({count = 101}) => ({
	type: 'SET',
	count: count
});


// REDUCERS *********************************************
// 1. reducers are pure functions : car ce qu'elles return ne
//dépend que de ce qu'elle reçoit en paramètre (state & action)
//Never change state or action 



const countReducer = (state = { count: 0 }, action) => {
	switch (action.type){
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		case 'RESET':
			return {
				count: 0
			};
		case 'SET':
			return{
				count: action.count
			};
		default:
			return state; 
	}
};

const store = createStore(countReducer);
//Permet de faire nue action a chaque fois qu'il y a 
//un changement et de dire quand on veut ecouter/arrêter d'écouter 
//les changements car la function store.subcribe return une 
//fonction qui permet d'arrêter d'écouter c'est pk on la stock dans
//une variable unsuscribe qui est du coup une fonction
const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 5}));

// on veut arrêter d'écouter donc seule la première action s'exécute pas les suivantes.
//unsubscribe();

store.dispatch(incrementCount());

store.dispatch(reserCount());

store.dispatch(decrementCount({decrementBy: 3}));

store.dispatch(setCount({}));
