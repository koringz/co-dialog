;(function (glb,$) {
var co = typeof coani !== 'undefined' ? coani : function () {};
co.listItems = new Array();
co.bufferTimer = new Array();
co.saveAnimation = new Array();
co.saveApiMethods = new Array();
co.saveAllNodeAnimation = new Array();
co.delay = new Array();
co.animatiomApi = new Array();
co.count = null;

co.prototype.animation = function (nodelist,currentNodeAnimation,x,fallback) {
	$(nodelist).addClass(x + ' animated show').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
		$(this).removeClass(x + ' animated');
		fallback(nodelist,currentNodeAnimation);
	});
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
co.prototype.delay = function (options,callback) {
	if(typeof options !== 'undefined') co.delay.push(Number(options));
	if(typeof callback == 'function') {
		var ct = setTimeout(callback(), options-10);
		if(ct) clearTimeout(ct);
	}
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

function _coani (options) {
	return co.listItems.push(options ? options : null), new co;
}

_coani.render = function (options) {
	var instReadyRender = new readyRender();
	return instReadyRender.invokeRender.apply(instReadyRender, [options]);
}

// co.saveAllNodeAnimation表示保存所有节点的动画效果
// 每一个节点执行一次resolve方法
glb['coani'] = _coani;
}(this ? window : global,jQuery ? jQuery : $))