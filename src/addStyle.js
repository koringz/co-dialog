import style from './../assets/css/co-dialog.min.css';

const autoAddStyle = (d, s) => {
    let styl = d.createElement('style');
    let head = d.getElementsByTagName('head')[0];
    styl.type = 'text/css';
    if (head.appendChild(styl), styl.stylesheet) {
        styl.stylesheet.cssText = s;
    } else {
        try {
            styl.innerHTML = s;
        } catch(e) {
            styl.innerText = s;
        }
    }
}

export default autoAddStyle(document, style);