const _ = require('lodash');

let arr = [{id: 1}, {id: 2}, {id: 3}, undefined, undefined];

console.log('Результат =>', _.filter(arr, 'id'));
