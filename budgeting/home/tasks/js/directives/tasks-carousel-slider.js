//  Tasks Carousel Slider Directive

angular.module("budgeting").directive('tasksCarouselSlider', ['timeout', 'dataShare', 'deviceInfoSvc', 'point', 'rectangle',

    function (timeout, dataShare, deviceInfoSvc, point, rectangle) {
        var hasTouch = deviceInfoSvc.hasTouch(),
            taskZoneVersion = dataShare('taskZoneVersion'),
            screenWidth = dataShare('tasksCarouselScreenWidth');

        function Slider(element) {
            var s = this;
            s.element = angular.element(element);
            s.init();
        }

        var p = Slider.prototype;

        p.init = function () {
            var s = this;
            s.sliderWidth = 0;
            s.bindEvents();
            s.taskIdList = [];
            s.hasTouch = hasTouch;
            screenWidth.watch(function () {
                s.updateZone().setSlideStops().setSwipeStops().updateButtonState();
            });
            return s;
        };

        p.updateZone = function () {
            var s = this;
            s.dragZone = rectangle().fromElement(s.element);
            s.dragZone.shiftY(30).shiftHeight(-30);
            return s;
        };

        p.animate = function (marginLeft, time) {
            var s = this;
            s.element.animate({
                marginLeft: marginLeft
            }, time);
            return s;
        };

        p.swipeTo = function (currentSwipeStop) {
            var s = this;

            s.animate(-currentSwipeStop * s.swipeStep, 250);

            setTimeout(function () {
                taskZoneVersion.set(Date.now());
            }, 300);
            return s;
        };

        p.bounce = function (dir) {
            var s = this,
                ml = parseInt(s.element.css('marginLeft').replace('px', ''));

            s.animate(ml + dir * 200, 150);

            setTimeout(function () {
                s.animate(ml, 200);
            }, 150);
            return s;
        };

        p.onSwipeLeft = function () {
            var s = this;
            if (s.disableSwipe) {
                return s;
            }

            if (s.currentSwipeStop == s.swipeMax) {
                s.bounce(-1);
                return s;
            }

            s.currentSwipeStop++;
            s.swipeTo(s.currentSwipeStop);
            return s;
        };

        p.onSwipeRight = function () {
            var s = this;
            if (s.disableSwipe) {
                return s;
            }

            if (s.currentSwipeStop === 0) {
                s.bounce(1);
                return s;
            }

            s.currentSwipeStop--;
            s.swipeTo(s.currentSwipeStop);
            return s;
        };

        p.onTouchStart = function (e) {
            var s = this,
                marginLeft,
                point = point().fromTouchEvent(e);

            clearTimeout(s.touchStartTimer);
            s.touchStartTimer = setTimeout(function () {
                s.disableSwipe = true;
                if (s.dragZone.contains(point)) {
                    s.dragEnabled = true;
                    s.dragStart = point().fromTouchEvent(e);
                    s.element.bind('touchmove.slider', s.onTouchMove.bind(s));
                    marginLeft = s.element.css('marginLeft').replace('px', '');
                    s.dragStartMarginLeft = parseInt(marginLeft);
                }
            }, 290);
            return s;
        };

        p.onTouchMove = function (e) {
            var s = this,
                currentLocation = point().fromTouchEvent(e),
                distance = currentLocation.xDistanceFrom(s.dragStart);

            s.dragCurrentMarginLeft = s.dragStartMarginLeft - distance;
            s.element.css('marginLeft', s.dragCurrentMarginLeft);
            return s;
        };

        p.onTouchEnd = function () {
            var stop, s = this;
            s.disableSwipe = false;
            if (s.dragEnabled) {
                s.dragEnabled = false;
                s.element.unbind('touchmove.slider');
                stop = -1 * Math.round(s.dragCurrentMarginLeft / s.taskWidth);
                if (stop <= 0) {
                    s.swipeTo(0);
                    s.currentSwipeStop = 0;
                }
                else if (stop > s.swipeMax) {
                    s.swipeTo(s.swipeMax);
                    s.currentSwipeStop = s.swipeMax;
                }
                else {
                    s.swipeTo(stop);
                    s.currentSwipeStop = stop;
                }
            }
            clearTimeout(s.touchStartTimer);
            return s;
        };

        p.bindEvents = function () {
            var s = this;
            if (hasTouch) {
                s.element
                    .bind('swipeleft.slider', s.onSwipeLeft.bind(s))
                    .bind('swiperight.slider', s.onSwipeRight.bind(s))
                    .bind('touchstart.slider', s.onTouchStart.bind(s))
                    .bind('touchend.slider', s.onTouchEnd.bind(s));
            }
            return s;
        };

        p.setSwipeStops = function () {
            var s = this,
                scWd = screenWidth.get();

            s.disableSwipe = false;
            if (s.sliderWidth === 0 || s.sliderWidth <= scWd) {
                s.disableSwipe = true;
                return s;
            }

            s.currentSwipeStop = 0;
            s.swipeStep = s.taskWidth;

            s.swipeMax = Math.ceil((s.sliderWidth - scWd) / s.swipeStep);

            return s;
        };

        p.setSlideStops = function () {
            var step, count, leftOver, s = this,
                scWd = screenWidth.get();

            s.element.css('marginLeft', '');

            s.currentStop = 0;
            s.slideStops = [];

            if (s.sliderWidth === 0 || s.sliderWidth <= scWd) {
                return s;
            }

            step = scWd > s.taskWidth ? s.taskWidth * Math.floor(scWd / s.taskWidth) : s.taskWidth;
            count = Math.ceil(s.sliderWidth / step) - 1;

            for (var i = 0; i < count; i++) {
                s.slideStops[i] = i * step;
            }

            leftOver = s.sliderWidth - s.slideStops[s.slideStops.length - 1] - scWd;
            leftOver = s.taskWidth * Math.ceil(leftOver / s.taskWidth);

            s.slideStops.push(leftOver + s.slideStops[s.slideStops.length - 1]);

            return s;
        };

        p.updateButtonState = function () {
            var s = this;

            if (!s.slideStops) {
                return s;
            }

            s.showSlideLeft = true;
            if (s.currentStop + 1 >= s.slideStops.length) {
                s.showSlideLeft = false;
            }

            s.showSlideRight = true;
            if (s.currentStop - 1 <= -1) {
                s.showSlideRight = false;
            }

            if (hasTouch) {
                s.showSlideLeft = false;
                s.showSlideRight = false;
            }
            return s;
        };

        p.setWidth = function (width) {
            var s = this;
            s.sliderWidth += width;
            s.taskWidth = width > 0 ? width : s.taskWidth;
            timeout.cancel(s.timer);
            s.timer = timeout(function () {
                s.element.width(s.sliderWidth);
                s.updateZone().setSlideStops().setSwipeStops().updateButtonState();
            });
            return s;
        };

        p.updateWidth = function () {
            var s = this;
            s.sliderWidth = 0;
            s.hideOverflow = true;
            s.tasks.forEach(function (task) {
                if (task.isActive.get()) {
                    s.setWidth(task.outerWidth.get());
                }
            });
            timeout(function () {
                s.hideOverflow = false;
            }, 100);
            return s;
        };

        p.setTasks = function (tasks) {
            var s = this;
            s.tasks = tasks;
            tasks.forEach(function (task) {
                if (s.taskIdList.contains(task.id) || task.id == 'placeholder') {
                    return;
                }
                s.taskIdList.push(task.id);
                task.isActive.watch(s.updateWidth.bind(s));
                task.outerWidth.watch(s.updateWidth.bind(s));
            });
            return s;
        };

        p.slideTo = function (index) {
            var s = this;
            s.element.animate({
                marginLeft: -s.slideStops[index]
            }, 250);

            setTimeout(function () {
                taskZoneVersion.set(Date.now());
            }, 300);
            return s;
        };

        p.slideLeft = function () {
            var s = this;
            if (s.currentStop + 1 >= s.slideStops.length) {
                return s;
            }
            s.currentStop++;
            s.updateButtonState().slideTo(s.currentStop);
            return s;
        };

        p.slideRight = function () {
            var s = this;
            if (s.currentStop - 1 <= -1) {
                return s;
            }
            s.currentStop--;
            s.updateButtonState().slideTo(s.currentStop);
            return s;
        };

        function link(scope, element, attributes) {
            scope.slider = new Slider(element);

            scope.$watch('model', function (model) {
                scope.slider.setTasks(scope.model);
            });
        }

        return {
            link: link,
            restrict: 'C'
        };
    }
]);
