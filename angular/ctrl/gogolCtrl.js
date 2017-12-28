app.controller('exchangersCtrl', function ($scope, $http) {
  console.log('Гоголь контроллер подключен');

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
    console.log($scope.currencyPare);
    if ($scope.currencyPare.from != null && $scope.currencyPare.to != null) {
      $scope.getExchangeRate($scope.currencyPare.from , $scope.currencyPare.to)
    }
  };

  $scope.setCurrencyPareTo = function (to) {
    $scope.currencyPare.to = to;
    console.log($scope.currencyPare);
    if ($scope.currencyPare.from != null && $scope.currencyPare.to != null) {
      $scope.getExchangeRate($scope.currencyPare.from , $scope.currencyPare.to)
    }
  };

  $scope.getExchangeRate = function (from, to) {
    $http.get('http://localhost:3000/exchange/'+ from + '/' + to)
      .then(function (result) {
        console.log('Курсы получены', result.data);
        $scope.exchs = result.data;
      }, function (err) {
        console.log('Err', err);
      });
  };

  $scope.volutesFrom = [
    {currencyFrom: 'BTC'},
    {currencyFrom: 'ETH'},
    {currencyFrom: 'DASH'},
    {currencyFrom: 'WMR'},
    {currencyFrom: 'WMU'},
    {currencyFrom: 'RBKMRUB'},
    {currencyFrom: 'PPRUB'},
    {currencyFrom: 'CARDUSD'},
    {currencyFrom: 'CARDRUB'},
    {currencyFrom: 'CARDUAH'},
    ];

  $scope.volutesTo = [
    {currencyTo: 'CARDRUB'},
    {currencyTo: 'BTC'},
    {currencyTo: 'DASH'},
    {currencyTo: 'WMR'},
    {currencyTo: 'WMU'},
    {currencyTo: 'RBKMRUB'},
    {currencyTo: 'PPRUB'},
    {currencyTo: 'CARDUSD'},
    {currencyTo: 'CARDRUB'},
    {currencyTo: 'CARDUAH'},
  ];


  // $http.get('http://localhost:3000/start')
  //   .then(function (result) {
  //     console.log('Курсы получены', result.data);
  //     $scope.exchs = result.data;
  //   }, function (err) {
  //     console.log('Err', err);
  //   });
});

