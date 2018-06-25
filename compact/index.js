var codialog = new codialog();

var COMPACT_ARRAY = [{header: '我是头部', body: '我是主体', footer: '我是底部'}];
// or
var COMPACT_ARRAY = [{
	header: '我是头部', 
	body: '我是主体', 
	footer: { 
		type: Object,
		use: ['input'],
		value: '', 
		placeholder: '请输入手机号'
		_type: 'text'
	}
}];
// or
var COMPACT_ARRAY = [{
	header: '`<h1> 我是头部 </h1>`', 
	body: '`<div> 我是主体 </div>`', 
	footer: `<button> 我是底部 </button>`', 
}];



/** 例(2-2) ** 
var COMPACT_ARRAY = [{
	header: '我是头部', 
	body: '我是主体', 
	footer: { // 参考如下 例(4-4)
		type: Object,
		use: ['input'],
		value: '', // string or array
		placeholder: '请输入手机号'
		_type: 'text' // tel or email or password等等
	}
}];

or

var COMPACT_ARRAY = [{
	header: '`<h1> 我是头部 </h1>`', 
	body: '`<div> 我是主体 </div>`', 
	footer: `<button> 我是底部 </button>`', 
}];
*/

// 基础弹出框
codialog.app('.base').use(COMPACT_ARRAY);
// or
codialog.app('.base').layout('notify animation:zoom simple').use(COMPACT_ARRAY);

/** 例(3-3) ** 
// layout布局使用' '空白符分割来加UI效果
codialog.app('.base').layout('
	alert / 警告
	toast:success or error or none / 成功或错误或空 
	loading / 加载中 
	scroll / 基于滚动
	notify / 通知
	animation:zoom / 动画效果 参考co-ani

	base / 基础 
	simple / 简单 
	compact / 精致
')
.use(COMPACT_ARRAY);
*/


/** 例(4-4) **
 ** footer **
 -  footer 默认 type:String
	footer: '我是底部'

 -  否则 type:Object
	footer: {
		type: Object,

		// string or array 如果是数组就是显示多少个 
		// 如果有很多人button 那么就在button前面添加... 
		// 等价于['...button'] 
		// 最终根据value数组遍历
		use: ['button','button'], 
		
		value: ['我知道了','我知道了'], // string or array
	}
	如果use: 'img',那么就会设置src: 的属性
	footer: {
		type: Object,
		use: ['img'],
		src: './img/icom.png',
		alt: ''
	}
	如果是use: 'input' 那么就会设置placeholder的属性
	footer: {
		type: Object,
		use: ['input'],
		value: '', // string or array
		placeholder: '请输入手机号'
		_type: 'text' // tel or email or password等等
	}
*/


// 第一种情况下
codialog.app('.base').layout('notify animation:zoom base').use({ methods: function () {
	this.$header.$refs.name.
	this.$body.style.color = "red"
	this.$footer.input.value = '1'
}})
.render(function () {
	return {
		header: '<h1 refs."name"> 我是头部 </h1>',
		body: '<div> 我是主体 </div>',
		footer: '<button> 我是底部 </button>',
	}
});
// or
// 第二种情况下
codialog.app('.base').layout('animation:zoom simple').use(COMPACT_ARRAY，{ methods: function () {
	this.$header.title = '我是头部'
	this.$body.message = '我是主体'
	this.$footer.button = '我是底部'

	this.$header.$refs.name.style.fontSize = '12px'
	this.$body.style.color = "red"
	this.$footer.input.value = '1'
}});
// or
// 第三种情况下
	/*默认情况下 header body footer 都已经封装时 基于base 和 simple 和 compact 使用只会调用simple显示
	发现另一种情况产生 如下
	base：header or body or footer or all 默认body
	simple : header or body or footer or all 默认all
	compact：header or body or footer or all 默认all*/
codialog
.app('.base')
.layout('animation:zoom simple:all')
.use({ methods: function () {
	this.$header.title = '我是头部'
	this.$body.message = '我是主体'
	this.$footer.button = '我是底部'

	this.$header.style.fontSize = '12px'
	this.$body.style.color = "red"
	this.$footer.input.value = '1'
}});

// 新的方式
codialog
.app('.base')
.layout('simple:body  [alert,loading]')
.use(function () {
	this.hide();
	this.$header.title = '我是头部'
	this.$body.message = '我是主体'
	this.$footer.button = '我是底部'
	this.$body.style.fontSize = '12px'
	this.$body.style.color = 'red'
});
// 拆解分离 .layout('simple:body  [alert,loading]')
codialog
.app('.base')
.base('<body>')
.effect('loading')
.use(function () {
	this.hide();
	this.$body.message = '我是主体'
	this.$body.style.fontSize = '12px'
	this.$body.style.color = 'red'
});
// 输出的方式很简单
codialog
.app('.base')
.callback(function () {
	this.show({timeout:3000});
	// 三秒之后改变输出效果
	this.effect('alert');
	this.$body.message = '加载完成'
});
// or
codialog
.app('.base')
.callback(function () {
	var slef = this;
	this.show();
	// 三秒改变输出效果
	this.effect('alert');
	this.$body.message = '加载完成'
})
.hide({
	timeout:3000,
	methods:function () {
		for(var i = 0; i < 3; i--) {
			setTimeout(function () {
				self.$body.children.$refs.spanName = i
			},1000*i)
		}
	}
});


/** 例(5-5) **
	methods方法使用
	[{header: '我是头部', body: '我是主体', footer: '我是底部'，methods: function () { // do something } }];
	这是一个bind绑定在configuration opation上面的方法，内部的数据使用方式如下
	header: '<div> <span refs."name"> </div> <div>',
	methods: function () {
		this.$header.$refs.name
		this.$body.
		this.$footer.input.value
	}
*/


/** 例(6-6) ** 
a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,
bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,
col,colgroup,command,datalist,dd,del,details,dfn,dialog,dir,div,dl,
dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,
frameset,head,header,hr,html,i,iframe,img,input,ins,kbd,keygen,
label,legend,li,link,main,map,mark,menu,menuitem,meta,meter,nav,
noframes,noscript,object,ol,optgroup,option,output,p,param,pre,
progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,
span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,
tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,
*/



/*
a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,标签,head,header,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,menu,menuitem,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,
*/