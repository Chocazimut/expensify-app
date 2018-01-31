import * as firebase from 'firebase';


// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const db = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default };


//avec once on peut utiliser les promesses avec then et catch

/*db.ref('expenses')
	.once('value')
	.then((snapshot) => {
		const expenses = [];
		snapshot.forEach((childSnapshot)=> {
			expenses.push({
				id: childSnapshot.key,
				...childSnapshot.val()
			});
		});
		console.log(expenses);
	});*/


//child removed
/*db.ref('expenses').on('child_removed', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});

db.ref('expenses').on('child_changed', (snapshot) =>{
	console.log(snapshot.key, snapshot.val());
});

db.ref('expenses').on('child_added', (snapshot) =>{
	console.log(snapshot.key, snapshot.val());
});
*/

/*db.ref('expenses').push({
	description: "water bill",
	note: "",
	amount: 300,
	createdAt: "",
});
*/


//avec on on ne peut pas utiliser les promesses, on écrit 
//d'abord si success, puis le (e)=>{} pour catch les erreurs

/*db.ref('expenses').on('value', (snapshot) => {
	const expenses = [];
		snapshot.forEach((childSnapshot)=> {
			expenses.push({
				id: childSnapshot.key,
				...childSnapshot.val()
			});
		;});
	console.log(expenses);
}, (e)=> {
	console.log('Error fetching data')
});*/





//db.ref('notes/-L3hn2--AL-T9Z9cOhqU').remove();


// CREE UN NEW ELEMENT DANS LA DB
/*db.ref('notes').push({
	title: 'course topics',
	body: 'react native'
});*/



/*const onValueChange = db.ref().on('value', (snapshot) => {
	const val = snapshot.val();
	console.log(`${val.name} is a ${val.job} in ${val.location.city}`)
}, (e)=>{
	console.log('Error fetching data');
});		*/



/*const onValueChange = db.ref().on('value', (snapshot)=> {
	console.log(snapshot.val());
}, (e) => {
	console.log('Error fetching data', e);
});

setTimeout(()=> {
	db.ref('age').set(29);
}, 3500);

setTimeout(()=> {
	db.ref('age').off(onValueChange);
}, 7000);


setTimeout(()=> {
	db.ref('age').set(30);
}, 10500);


db.ref().set({
	name: 'Coco',
	age: 26,
	isSingle: true,
	location: {
		city: 'Lyon',
		country: 'France',
	}
}).then(()=> {
	console.log('Date is saved');
}).catch((e)=>{
	console.log('this failed', e);
});*/

//db.ref().set('This is my data');

/*db.ref('age').set(27);

db.ref('location/city').set('Paris');

db.ref('attribute').set({
	height: 163,
	weight: 50
	}).then(()=>{
		console.log('worked');
	}).catch((e)=>{
		console.log("did'nt work", e);
	})
*/
/*
db.ref('isSingle')
.set(null)
.then(()=>{
	console.log('data removed');
}).catch((e)=>{
	console.log("did not worked", e);
})
*/

// OR (to remove) :
/*db.ref('isSingle')
.remove()
.then(()=>{
	console.log('data removed');
}).catch((e)=>{
	console.log("did not worked", e);
})*/


/*db.ref().update({
	name:'Mike', 
	job: 'dev',
	isSingle: false,
	'location/city': 'Lyon',
	age:29,
});*/


/*db.ref('location/city')
	.once('value')
	.then((snapshot)=> {
		const val = snapshot.val();
		console.log(val);
	})
	.catch((e)=>{
		console.log('Error fetching data', e);
	});*/
