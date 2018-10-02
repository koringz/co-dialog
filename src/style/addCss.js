/*
style
*/
typeof document != 'undefined' && (function (d, s) {
    var sty = d.createElement('style');
    var head = d.getElementsByTagName('head')[0];
    sty.type = 'text/css';
    
    if(head.appendChild(sty),sty.stylesheet) {
        sty.stylesheet.cssText = s;
    }
    else if(document.all) {
        var cssStyle = d.createStyleSheet(); // 兼容ie 8
        cssStyle.cssText = s;
    }
    else {
        try {
            sty.innerHTML = s;
        }
        catch (e) {
            sty.innerText = s;
        }
    }
})(document, cssText);
