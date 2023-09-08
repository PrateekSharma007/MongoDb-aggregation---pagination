const fs = require('fs');
const { Readable } = require('stream');

const jsonData = {
  name: 'Virat Kohli',
  age: 34,
  city: 'Delhi',
};

const jsonStream = new Readable({
  read() {
    this.push(JSON.stringify(jsonData));//push karega stream mai 
    this.push(null);
  },
});

const consoleLogStream = fs.createWriteStream(1);

jsonStream.pipe(consoleLogStream);

consoleLogStream.on('finish', () => {
  console.log('JSON data has been logged.');
});
