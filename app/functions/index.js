/**
	{
		"GET@path":functionName
	}
*/

// leggo tutti file js
const path = require('path');

// Specifica la directory che contiene i file
const directoryPath = __dirname; // Oppure il percorso relativo/assoluto della directory

// Leggi tutti i file della directory in modo sincrono
const files = fs.readdirSync(directoryPath);

// Filtra i file con estensione .js escludendo 'index.js'
const jsFiles = files.filter(file => file.endsWith('.js') && file !== 'index.js');
var MAP = {};

console.log('File trovati:', jsFiles);
var obj;
// Ora puoi fare qualsiasi cosa con i file trovati
jsFiles.forEach(file => {
  const filePath = path.join(directoryPath, file);
  console.log(`File: ${filePath}`);
  obj=require(filePath);
  MAP[obj.method+'@'+obj.path] = obj.fn;
  // Se necessario, puoi importare i file dinamicamente
});
module.exports = MAP;
