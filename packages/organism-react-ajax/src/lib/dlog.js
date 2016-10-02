// dlog 0.1.1
// http://ddo.github.io/dlog
// (c) 2014 Ddo <http://ddo.me>

function dlog(opts) {
    if(!(this instanceof dlog)) {
        return new dlog(opts);
    }
    
    opts = opts ? opts : {};

    //default name = DLOG
    this.setName(opts.name);

    //default level = info
    this.setLevel(opts.level);

    //default font-size = 14
    this.setSize(opts.size);
}

dlog.prototype.setName = function(name) {
    this.name = name ? name : 'DLOG';
    return this.name;
};

dlog.prototype.setLevel = function(level) {
    this.level = level ? (this.level_map[level] ? level : 'info') : 'info';
    this.level_no = this.level_map[this.level];
    return this.level;
};

dlog.prototype.setSize = function(size) {
    this.size = size ? size : 14;
    return this.size;
};

dlog.prototype.level_map = {
    trace:  1,
    debug:  2,
    info:   3,
    warn:   4,
    error:  5,
    silent: 6
};

dlog.prototype.color_map = {
    name:   'cyan',
    trace:  'black',
    debug:  'green',
    info:   'blue',
    warn:   'orange',
    error:  'red'
};

dlog.prototype.getCSS = function(level) {
    return level ? 'font-size: ' + this.size + 'px;color: ' + this.color_map[level] : 'font-size: ' + this.size + 'px';
};

dlog.prototype.log = function(level, data) {
    if(level === 'silent')
        return;

    if(this.level_map[level] >= this.level_no) {
        this.show(level, data);
    }
};

//do each element of arr is a obj ?
dlog.prototype.isAllObj = function(arr) {
    var is_all_obj = true;
    for (var i = 0; i < arr.length; i++) {
        if(typeof arr[i] !== 'object')
            return false;
    }
    return true;
};

dlog.prototype.show = function(level, data) {
    console.log('%c [%s] %c %s %c %s:', this.getCSS(), new Date().toJSON(), this.getCSS('name'), this.name, this.getCSS(level), level.toUpperCase());

    if(Array.isArray(data[0]) && this.isAllObj(data[0])) {
        console.table(data[0]);
    }
    console[level].apply(console, data);
};

dlog.prototype.trace = function() {
    this.log('info', arguments);
};

dlog.prototype.debug = function() {
    this.log('debug', arguments);
};

dlog.prototype.info = function() {
    this.log('info', arguments);
};

dlog.prototype.warn = function() {
    this.log('warn', arguments);
};

dlog.prototype.error = function() {
    this.log('error', arguments);
};

if(typeof module !== 'undefined' && module.exports) {
    module.exports = dlog;
}
