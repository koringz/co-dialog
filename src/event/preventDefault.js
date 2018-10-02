
codialog.prototype.preventDefault = function (ev) {
    if(ev.preventDefault) {
        ev.preventDefault();
    }
    else if(ev.stopPropagation) {
        ev.stopPropagation()
    }
    else return false;
}
