var moment = require('moment');

var now = moment();

//console.log(now.format('x').valueOf());
var timeStamp = 1460185842774;

var momentTimeStamp = moment.utc(timeStamp);
console.log(momentTimeStamp.local().format('h:mm a'));

// console.log(now.format());

// console.log(now.format('MMM Do YYYY h:mm a')); 