
angular.module("winLoaderModule", [])
    .directive('winLoader', ['winLoadingService', function (winLoadingService) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template:
            `<div class='win-loader-wrapper'><div class='win-loader'>
             <div class='circle'></div>
             <div class='circle'></div>      
             <div class='circle'></div> <div class='circle'></div>
             <div class='circle'></div> <div class='circle'></div>
             <div class='circle'></div>
            </div><div class='win-loader-overlay'></div></div>`,
            link: function (scope, element, attrs) {
                winLoadingService.$.subscribe(function (value) {
                    if (value)
                        element.addClass("show-win-loader");
                    else
                        element.removeClass("show-win-loader");
                })
            }
        }
    }])
    .service("winLoadingService", [function () {
        var loaderSubject$ = new Rx.Subject(); 
        console.log(loaderSubject$);
        var loader$ = loaderSubject$.asObservable();
        function _start() {
            loaderSubject$.next(true);
        }
        function _end() {
            loaderSubject$.next(false);
        }
        return {
            start: _start,
            end: _end,
            $: loader$
        }
    }]);