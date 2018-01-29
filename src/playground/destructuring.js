//NEW SYNTAX ES6 /////////////////////////////////////////


// OBJECT DESTRUCTURING : *************************

const person = {
	name: 'coco',
	age:11,
	location: {
		city: 'titi', 
		temp: 31
	}
};
// Permet d'accéder plus simplement aux variables de l'objet
// Permet de déterminer des valeurs par défault aux variables d'objet
const { name = 'Anonymous', age } = person;
// Poss de cumuler rename et default value 
//const { name:firstname = 'Anonymous', age } = person;

console.log(`${name} is ${age}.`);

//Pemet de renomer les variables d'objet
const { city, temp: temperature } = person.location;

if (city && temperature){
console.log(`It's ${temperature} in ${city}.`);
}


const book = {
	title: "Ego is Enemy",
	author: "Toto",
	publisher: {
		name: 'Penguin'
	}
};

const { title, author }  = book;
const { name:publisherName = Self-Published }  = book.publisher;

console.log(publisherName);


// OBJECT DESTRUCTURING : *************************


const address = ['16 bv coco', 'Lyon', '69007'];

//on peut donner n'import quel nom et des valeurs par default
const [, ville = 'Paris', zip] = address;

console.log(`You are in ${ville} ${zip}.`);

const item = ['coffee (hot)', '$2.00', '$2.50', '$3.00'];

const [coffee, , mediumPrice] = item;

console.log(`a medium ${coffee} costs ${mediumPrice}.`);