angular.module('gdgXBoomerang')
.controller('SlackController', function ($sce, Config, NavService) {
    var vm = this;
    vm.loading = false;
    NavService.setNavTab(7);
    
    vm.slackRegistration = '';
    if (Config.slackRegistration) {
        vm.slackRegistration = $sce.trustAsResourceUrl(Config.slackRegistration);
    }
});
