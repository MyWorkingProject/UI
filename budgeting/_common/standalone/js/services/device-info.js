//  Determine Device Capability

angular.module("budgeting").service('deviceInfoSvc', [
    function () {
        var ua = navigator.userAgent,
            isAndroid = /Android/i.test(ua),
            isBlackBerry = /BlackBerry/i.test(ua),
            isIOS = /iPhone|iPad|iPod/i.test(ua),
            isOperaMini = /Opera Mini/i.test(ua),
            isIEMobile = /IEMobile/i.test(ua),
            isMobile = isAndroid || isBlackBerry || isIOS || isOperaMini || isIEMobile;

        setTimeout(function () {
            if (isMobile) {
                angular.element('html').removeClass('no-touch');
            }
            else {
                angular.element('html').addClass('no-touch');
            }
        }, 1000);

        return {
            hasTouch: function () {
                return isMobile;
            }
        };
    }
]);
