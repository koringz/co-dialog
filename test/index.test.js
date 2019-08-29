var jdglobal = require('jsdom-global')
var expect = require('chai').expect;


describe('Excute Coog is object and method ', function() {

	let Coog
	jdglobal()

	before(function () {
	    // Coog = require('../dist/co-dialog.js').Coog;
	    Coog = require('../dist/co-dialog.js').Coog;
	})

	it('should return console info', function() {
	    console.log(Coog)
	});


	describe('continue call "Coog" object', function() {
		it('should return works', function() {
		  	Coog
	        .app('.cancle')
	        .use({
	            title: '取消-cancle',
	            message: '显示取消按钮和功能',
	            isGesture: true,
	            isDrag: true,
	            layout: 'center',
	            showCancleButton: true,
	        })
	        .show();
		});
	});


	describe('continue call "Coog" object', function() {
		it('should return value "function" is exist', function() {
		    expect(typeof Coog.app).to.be.equal('function')
		    expect(typeof Coog.use).to.be.equal('function')
		});
	});
});

