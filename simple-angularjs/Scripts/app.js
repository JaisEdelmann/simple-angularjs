var simpleapp = angular.module('simpleapp',[]);

simpleapp.controller('HelloController', function ($scope) {
    $scope.hello = "Hello world";
    $scope.description = "This is a simple AngularJS app, talking with Danmarks Radio MU API";
});

simpleapp.controller('TvController', function ($scope, $http) {
    $scope.channelsheadline = "Channels";
    $http.get('http://www.dr.dk/mu-online/api/1.0/channel/all-active-dr-tv-channels').success(function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].Title == "DR Update") data.splice(i, 1);
                data[i].Title = data[i].Title.replace(" ", "-");
        }
        $scope.channels = data;
    });

    $scope.NoWebChannels = function (channel) {
        if (channel.WebChannel == false)
            return true;
        return false;
    }
});
