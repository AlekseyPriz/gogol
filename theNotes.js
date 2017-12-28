const format = require("node.date-time");

function logTime() {
  return new Date().format('y-M-d H:M:S') + ' ';
}

module.exports = {
  courseString: (item, i) => {
    return console.log(i + ') ' + item.in + ' (' + item.from + ') => ' + item.out + ' (' + item.to + ')'
      + ' (Остаток: ' + item.amount + '. Минимум: ' + item.minamount + ')');
  },
  logString: (item, i) => {
    return i + ') ' + item.in + ' (' + item.from + ') => ' + item.out + ' (' + item.to + ')'
      + ' (Остаток: ' + item.amount + '. Минимум: ' + item.minamount + ')' + '\n';
  },
  btcCardrub: (item) => {
    return logTime() + ' - ' + item.in + ' (' + item.from + ') => ' + item.out + ' (' + item.to + ')'
      + ' (Остаток: ' + item.amount + '. Минимум: ' + item.minamount + ')' + '\n';
  },
  btcCardrubGroup: (item, name) => {
    return name + ' - ' + logTime() + ' - ' + item.in + ' (' + item.from + ') => ' + item.out + ' (' + item.to + ')'
      + ' (Остаток: ' + item.amount + '. Минимум: ' + item.minamount + ')' + '\n';
  },
  btcCardRubObj: (item, name) => {
    item.exchanger = [name];
    return item;
  }
}


