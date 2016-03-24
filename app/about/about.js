angular.module('gdgXBoomerang')
.controller('AboutController', function ($http, $sce, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(0);
    vm.cover = Config.cover;

    var debugDesc = function () {
        console.log("asd");
        console.log(vm.desc);
    }

    debugDesc();

    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
            '?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key=' + Config.googleApi).
        success(function (data) {
            vm.desc = data.aboutMe
                    .replace(/<strong>/g, '<strong style=\'font-size: 20pt;\'>')
                    .replace(/<div>&nbsp;<\/div>/g, '')
                    .replace(/<strong>&nbsp;<\/strong>/g, '');
;

            $sce.trustAsHtml(vm.desc);
            debugDesc();


            if (data.cover && data.cover.coverPhoto.url) {
                vm.cover.url = data.cover.coverPhoto.url;
            }
            vm.loading = false;
            vm.status = 'ready';
        })
        .error(function (error) {
            vm.desc = 'Sorry, we failed to retrieve the About text from the Google+ API.';
            vm.loading = false;
            vm.status = 'ready';
        });
});
