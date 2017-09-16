/*
 * Simple javascript DOM library.
 * Copyright Sandro Magi 2017
 * */

/*
 * References:
 * Maybe add XHR: https://github.com/honza/140medley/blob/master/140medley.js
 * See also: https://github.com/dciccale/ki.js
 * */
(function(_){
    var w = window;
    if (w[_]) throw new Error(_ + ' is already defined.');
    var d = document
    var $ = w[_] = d.documentElement;
    var e = Element.prototype;
    var a = Array.prototype;

    // NodeList processing
    function r(n){
        //var m=['forEach','map','reduce','filter','reduceRight','every','slice','some','find','findIndex'];
        var m=['forEach','map','reduce','filter','reduceRight','every','slice','some'];
        for (var i=0;i<m.length;++i)
            n[m[i]]=n[m[i]]||a[m[i]];
        // event registration
        n.on = function(e,f,c){
            for (var i=0;i<this.length;++i)
                this[i].on(e,f,c);
            return this;
        };
        n.off = function(e,f,c){
            for (var i=0;i<this.length;++i)
                this[i].off(e,f,c);
            return this;
        };
        n.raise = function(e){
            for (var i=0;i<this.length;++i)
                this[i].raise(e);
            return this;
        };
    }
    r(HTMLCollection.prototype);
    r(NodeList.prototype);
    r(NamedNodeMap.prototype);
    
    // event registration
    $.event=function(k,t){
        var v=d.createEvent(k);
        v['init'+k].apply(v,[].slice.call(arguments, 1));
        return v;
    };
    e.on = e.addEventListener;
    e.off = e.removeEventListener;
    e.raise = e.dispatchEvent;

    // DOM querying
    e.any = e.querySelectorAll;
    e.first = e.querySelector;
    e.byId = d.getElementById.bind(d);
    e.byTag = e.getElementsByTagName;
    e.byClass = d.getElementsByClassName.bind(d);
    e.byName = d.getElementsByName.bind(d);
    
    // DOM manipulation
    $.new = d.createElement.bind(d);
    e.insertAfter = function(x, c){
        this.insertBefore(x, c.nextSibling);
    };

    // class manipulation
    if ($['classList']) {
        e.addClass = function(x) {
            this.classList.add(x);
            return this;
        };
        e.removeClass = function(x) {
            this.classList.remove(x);
            return this;
        };
        e.hasClass = function(c) {
            return this.classList.contains(c);
        };
    } else {
        e.addClass = function(x) {
            this.className = this.className + ' ' + x;
            return this;
        };
        e.removeClass = function(x) {
            this.className = this.className.split(' ').filter(function(y){
                return x != y;
            }).join(' ');
            return this;
        };
        e.hasClass = function(c) {
            return 0<=this.className.split(' ').indexOf(c);
        };
    }
    e.toggleClass = function(c) {
        return this.hasClass(c) ? this.removeClass(c) : this.addClass(c);
    };
})(typeof exports === 'undefined' ? '$' : exports);