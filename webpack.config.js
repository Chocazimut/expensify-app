const path = require('path');

module.exports = {
	//dit ou webpack doit commencer pour lancer l'application
	entry: './src/app.js',
	//
	output: {
		//et où sont les fichiers finaux, traduits pour le browser
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		/*configure ici les modules/plugins type babel, webpack, etc*/
		rules: [{
			/*loader appelle le loader du module ne permet d'avoir qu'un loader*/
			/*utilisation de babel pour traduire ES6 to ES5 pour le browser*/
			loader: 'babel-loader',
			/*regex qui applique les loader aux fichiers .js*/ 
			test: /\.js$/,
			/*sauf ceux contenus dans le dossier node_modules*/
			exclude: /node_modules/
		}, {
			/*regex qui applique les loader aux fichiers .scss ou css d'où le ?*/ 
			test: /\.s?css$/,
			/*use permet d'avoir plusieurs loaders*/
			use: [
				/*permet de lier le css au js*/
				'style-loader',
				/*idem*/
				'css-loader', 
				/*permet de traduire le scss en css pour le browser*/
				'sass-loader',
			]
		}]
	},
	/*Permet d'avoir le debugger sur le bons fichiers de 
	développement(app.js etc) et non sur les fichiers de 
	prod (bundle)*/
	devtool: 'cheap-module-eval-source-map',
	/*server local pour lancer l'application*/
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		//history fait que toutes les routes coté client renvoient vers l'index.html
		historyApiFallback: true,
	}
}; 