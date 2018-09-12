(function (foctory) {
	!function (factory) {
	    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
	        var target = module['exports'] || exports;
	        factory(target);
	    } else if (typeof define === 'function' && define['amd']) {
	        define(['exports'], factory);
	    } else {
	        factory(window['coanimation'] = {});
	    }
	}(function (exports) {
	var coanimation$$ = typeof exports !== "undefined" ? exports : {};

	var co = function () {};
	co.listItems = new Array();
	co.bufferTimer = new Array();
	co.saveAnimation = new Array();
	co.saveApiMethods = new Array();
	co.saveAllNodeAnimation = new Array();
	co.delay = new Array();
	co.animatiomApi = new Array();
	co.count = null;

	co.prototype.addEvent = function (el, type, fallback) {
		if(el.addEventListener) {
			el.addEventListener(type, fallback, false)
		}
		else if(el.attachEvent) {
			el.attachEvent(type, fallback)
		}
	}

	co.prototype.animation = function (nodelist,currentNodeAnimation,x,fallback) {
		var getNodeList = document.querySelector(nodelist);
		if(getNodeList.classList) {
			getNodeList.classList.value += ' ' + x + ' animated show';
		}
		else if(getNodeList.className) {
			getNodeList.className += ' ' + x + ' animated show';
		}
		this.addEvent(getNodeList,'animationend', function () {
			if(getNodeList.classList) {
				getNodeList.classList = getNodeList.classList.value.replace(x + ' animated','');
			}
			else if(getNodeList.className) {
				getNodeList.className = getNodeList.className.replace(x + ' animated','');
			}
			fallback(nodelist,currentNodeAnimation);
		});
		// webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend 
	}

	co.animatiomApi = [
		'bounce','flash','pulse','rubberBand','shake', 'headShake',
		'swing', 'tada', 'wobble', 'jello',	'bounceIn',	'bounceInDown',
		'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft',
		'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft',
		'fadeInLeftBig', 'fadeInRight',	'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut',
		'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig',
		'fadeOutUp', 'fadeOutUpBig', 'flipInX',	'flipInY', 'flipOutX', 'flipOutY',
		'lightSpeedIn',	'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
		'rotateInUpRight',	'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight',
		'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown',
		'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft',
		'zoomOutRight',	'zoomOutUp', 'slideInDown',	'slideInLeft', 'slideInRight', 'slideInUp',
		'slideOutDown',	'slideOutLeft',	'slideOutRight', 'slideOutUp'
	];

	var createAnimationApi = function (param) {
		if(co.prototype.hasOwnProperty(param)) return null;
		else {
			co.prototype[param] = function (options) {
				var _this = this;
				var onceAnimation = function (nodelist,currentNodeAnimation,fallback) {
					_this.animation(nodelist,currentNodeAnimation,param,fallback);

					if(typeof options === 'function') {
						options();
					}
				}
				co.saveAnimation.push(onceAnimation);
				return this;
			}
		}
	}

	for(var k = 0, calen = co.animatiomApi.length; k < calen; k++) {
		createAnimationApi(co.animatiomApi[k]);
	}

	// 延迟处理当前节点整体的动画时间
	co.prototype.delay = function (options) {
		if(typeof options !== 'undefined') co.delay.push(Number(options));
		return this;
	}

	// 停止调用api方法
	// 监听webkitAnimationEnd动画
	co.prototype.stop = function (options) {
		if(co.saveAllNodeAnimation.length > 0) co.saveAllNodeAnimation.push(co.saveAnimation);
		else co.saveAllNodeAnimation[0] = co.saveAnimation;
		co.saveAnimation = [];

		var resolve = function (nodelist,currentNodeAnimation,query) {
			setTimeout(function () {
				if(currentNodeAnimation.length > 0) {
					var getCurrentNodeAnimation = currentNodeAnimation.shift();
				 	getCurrentNodeAnimation(nodelist,currentNodeAnimation,resolve);
				}
				else return null;
			},query ? query : 0);
		}

		co.saveApiMethods.push(resolve);
		return null;
	}

	co.invokeRender = function (options) {
		return this.prototype.render(options);
	}

	// 渲染当前脚本的动画效果
	co.prototype.render = function (options) {
		var len = co.saveApiMethods.length;
		// co.listItems[len]表示需要执行的目前节点
		var i = 0;
		while (i < len) {
			var delay = typeof co.delay[i] !== 'undefined' ? co.delay[i] : 0;
			co.saveApiMethods[i](co.listItems[i],co.saveAllNodeAnimation[i],i+10+delay);
			i++;
		}
		co.animatiomApi = null;
	}

	function readyRender (options) {
		return this;
	}

	readyRender.prototype = co;

	function _coanimation (options) {
		return co.listItems.push(options ? options : null), new co;
	}

	_coanimation.render = function (options) {
		var instReadyRender = new readyRender();
		return instReadyRender.invokeRender.apply(instReadyRender, [options]);
	}

	// co.saveAllNodeAnimation表示保存所有节点的动画效果
	// 每一个节点执行一次resolve方法
	coanimation$$.start = _coanimation;
	})
})(typeof (window) !== 'undefined' ? this : global);