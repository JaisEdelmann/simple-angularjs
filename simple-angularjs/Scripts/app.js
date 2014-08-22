var simpleapp = angular.module('simpleapp', []);

simpleapp.controller('HelloController', function ($scope) {
    $scope.hello = "Hello world";
    $scope.description = "This is a simple AngularJS app, talking with Danmarks Radio MU API";
});

simpleapp.controller('TvController', function ($scope, $http) {
    $scope.channelsheadline = "Channels";
    $scope.IsBroadCasting = function (channel) {
        if (channel.Now)
            return true;
        return false;
    }
    $scope.IsNotBroadCasting = function (channel) {
        if (channel.Now)
            return false;
        return true;
    }  
    $http.get('http://www.dr.dk/mu-online/api/1.0/schedule/nownext-for-all-active-dr-tv-channels').success(function (data) {
        for (var i = 0; i < data.length; i++) {
            var CurrentTime =  parseInt(new Date().getTime().toString());
            var StartTime = parseInt(new Date(data[i].Now.StartTime).getTime().toString());
            var EndTime =  parseInt(new Date(data[i].Now.EndTime).getTime().toString());
            var a = (CurrentTime - StartTime);
            var b = (EndTime - StartTime);
            data[i].procentage = Math.round((a / b * 100));
        }
        $scope.channels = data;

        
    });
});