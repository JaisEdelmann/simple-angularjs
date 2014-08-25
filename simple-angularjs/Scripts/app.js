var simpleapp = angular.module('simpleapp', []);

simpleapp.controller('HelloController', function ($scope) {
    $scope.hello = "Hello world";
    $scope.description = "This is a simple AngularJS app, talking with Danmarks Radio MU API";
});

simpleapp.controller('TvController', function ($scope, $http, $q) {
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

    var promiseEpgData = $http.get('http://www.dr.dk/mu-online/api/1.0/schedule/nownext-for-all-active-dr-tv-channels');
    var promiseChannelData= $http.get('http://www.dr.dk/mu-online/api/1.0/channel/all-active-dr-tv-channels');

    $q.all([promiseEpgData, promiseChannelData]).then(function (resultarray)
    {
        var epgdatalist = resultarray[0].data;
        var channeldatalist = resultarray[1].data;
        for (var i = 0; i < epgdatalist.length; i++) {
            var test = $.grep(channeldatalist, function (e) {
                return e.Slug == epgdatalist[i].ChannelSlug;
            });

            epgdatalist[i].ChannelInformation = test[0];
            var CurrentTime = parseInt(new Date().getTime().toString());
            var StartTime = parseInt(new Date(epgdatalist[i].Now.StartTime).getTime().toString());
            var EndTime = parseInt(new Date(epgdatalist[i].Now.EndTime).getTime().toString());
            var a = (CurrentTime - StartTime);
            var b = (EndTime - StartTime);
            epgdatalist[i].procentage = Math.round((a / b * 100));
        }
        

        $scope.channels = epgdatalist;
    });

    

    //$http.get('http://www.dr.dk/mu-online/api/1.0/schedule/nownext-for-all-active-dr-tv-channels').success(function (data) {
    //    for (var i = 0; i < data.length; i++) {
    //        var CurrentTime = parseInt(new Date().getTime().toString());
    //        var StartTime = parseInt(new Date(data[i].Now.StartTime).getTime().toString());
    //        var EndTime = parseInt(new Date(data[i].Now.EndTime).getTime().toString());
    //        var a = (CurrentTime - StartTime);
    //        var b = (EndTime - StartTime);
    //        data[i].procentage = Math.round((a / b * 100));
    //        data[i].channelinfo = [];
    //    }
    //    $scope.channels = data;
    //});

     
});