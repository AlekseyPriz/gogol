app.controller('exchangersCtrl', function ($scope, $http) {
  console.log('Гоголь контроллер подключен');

  $scope.rates = [];
  $scope.volutesFrom = [];
  $scope.volutesTo = [];

  $scope.currencyPare = {
    from: null,
    to: null
  };

  $scope.activeCurrencyFrom = function (currencyItemFrom) {
    if (currencyItemFrom === $scope.currencyPare.from) return true;
  };

  $scope.activeCurrencyTo = function (currencyItemTo) {
    if (currencyItemTo === $scope.currencyPare.to) return true;
  };

  $scope.setCurrencyPareFrom = function (from) {
    $scope.currencyPare.from = from;
    $scope.volutesTo = _.map(_.filter($scope.rates, (rate) => { return rate.from[0] === from }), (n) => { return { currencyTo: n.to[0]}});
    if ($scope.currencyPare.from != null && $scope.currencyPare.to != null) {
      $scope.getExchangeRate($scope.currencyPare.from , $scope.currencyPare.to)
    }
  };

  $scope.setCurrencyPareTo = function (to) {
    $scope.currencyPare.to = to;
    //console.log($scope.currencyPare);
    if ($scope.currencyPare.from != null && $scope.currencyPare.to != null) {
      $scope.getExchangeRate($scope.currencyPare.from , $scope.currencyPare.to)
    }
  };

  let host = 'https://evening-falls-64086.herokuapp.com';
  // let host = 'http://localhost:3000';


  $scope.getExchangeRate = function (from, to) {
    $scope.exchs = _.filter($scope.rates, (rate) => {
      return rate.from[0] === from && rate.to[0] === to;
    });
    // Запрос на сервер для получения результатов обмена:
    // $http.get(host +'/exchange/'+ from + '/' + to)
    //   .then(function (result) {
    //     console.log('Курсы получены', result.data);
    //     $scope.exchs = result.data;
    //   }, function (err) {
    //     console.log('Err', err);
    //   });
  };

// Стартовый запрос для отображения курса Биткоина на Доллары
  // $http.get(host + '/start')
  //   .then(function (result) {
  //     console.log('Курсы получены', result.data);
  //     $scope.exchs = result.data;
  //   }, function (err) {
  //     console.log('Err', err);
  //   });

  $http.get(host + '/big')
    .then(function (result) {
      console.log('Курсы получены => ', result.data);
      $scope.rates = result.data;
      $scope.volutesFrom = _.uniqBy(_.map(result.data, (n) => { return { currencyFrom: n.from[0]}}), 'currencyFrom');
      $scope.volutesTo = _.uniqBy(_.map(result.data, (n) => { return { currencyTo: n.to[0]}}), 'currencyTo');


        console.log('Uniq => ',  $scope.volutesFrom);
    }, function (err) {
      console.log('Err', err);
    });

});

