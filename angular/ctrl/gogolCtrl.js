app.controller('exchangersCtrl', function ($scope, $http) {
  console.log('Гоголь контроллер подключен');

  $scope.rates = [];
  $scope.volutesFrom = [];
  $scope.volutesTo = [];
  $scope.nomberOfExchangers = null;
  $scope.nomberOfcurrencyPare = null;


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
    $scope.volutesTo = _.map(_.filter($scope.rates, (rate) => { return rate.from === from }), (n) => { return { currencyTo: n.to}});
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

  // let host = 'https://evening-falls-64086.herokuapp.com';
  // let host = 'http://localhost:3000';
  let host = 'http://www.gogolchange.com';



  $scope.getExchangeRate = function (from, to) {
    $scope.exchs = _.filter($scope.rates, (rate) => {
      return rate.from === from && rate.to === to;
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

  let sortVolutes = function (arr, way) {
    if (way === 'from') {
      return _.uniqBy(_.map(arr, (n) => { return { currencyFrom: n.from}}), 'currencyFrom');
    } else if (way === 'to') {
      return _.uniqBy(_.map(arr, (n) => { return { currencyTo: n.to}}), 'currencyTo');
    } else if (way === 'ex') {
     return _.size(_.uniqBy(_.map(arr, (n) => { return n.ex })));
    } else if (way === 'para') {
      return _.size(arr);
    }
  };
  
  $http.get(host + '/big')
  // $http.get(host + '/crlr')
    .then(function (result) {
      console.log('Курсы получены => ', result.data);
      $scope.rates = result.data;
      $scope.volutesFrom = sortVolutes(result.data, 'from');
      $scope.volutesTo = sortVolutes(result.data, 'to');
      $scope.nomberOfExchangers = sortVolutes(result.data, 'ex');
      $scope.nomberOfcurrencyPare = sortVolutes(result.data, 'para');

        console.log('Uniq from=> ',  $scope.volutesFrom);
        console.log('Uniq to=> ',  $scope.volutesTo);

    }, function (err) {
      console.log('Err', err);
    });

});

