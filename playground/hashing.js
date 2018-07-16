const {SHA256} = require('crypto-js');


// Create Hash from message
var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash : ${hash}`);

// Create Hash from object then compare it to another hash

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'secretkey').toString()
}

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString;

var resultHash = SHA256(JSON.stringify(token.data) + 'secretkey').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust!');
}