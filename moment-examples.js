//moment js send time in String --> convert to int using valueOf();
var moment = require('moment');

var now = moment();

//console.log(now.format('x').valueOf());
console.log(now);
var timeStamp = 1460185842774;

var momentTimeStamp = moment.utc(timeStamp);
console.log(momentTimeStamp.local().format('h:mm a'));

// console.log(now.format());

// console.log(now.format('MMM Do YYYY h:mm a')); 