var simpleapp = angular.module('simpleapp', []);

simpleapp.controller('HelloController', function ($scope) {
    $scope.hello = "Hello world";
    $scope.description = "This is a simple AngularJS app, talking with Danmarks Radio MU API";
});

simpleapp.controller('TvController', function ($scope, $http) {
    $scope.channelsheadline = "Channels";

    $scope.IsNotBroadCasting = function (channel) {
        if (channel.Now)
            return false;
        return true;
    }

    $scope.IsBroadCasting = function (channel) {
      if(channel.Now)
          return true;
      return false;
      
    }
    $http.get('http://www.dr.dk/mu-online/api/1.0/schedule/nownext-for-all-active-dr-tv-channels').success(function (data) {
        $scope.channels = data;

        
    });
});


/*$http.get('http://www.dr.dk/mu-online/api/1.0/channel/all-active-dr-tv-channels').success(function (data) {
       for (var i = 0; i < data.length; i++) {
           if (data[i].Title == "DR Update") data.splice(i, 1);
           data[i].Title = data[i].Title.replace(" ", "-");
       }
       $scope.channels = data;
   });
   */