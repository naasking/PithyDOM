/*
 * Simple javascript DOM library.
 * Copyright Sandro Magi 2017
 * */

/*
 * References:
 * Maybe add XHR: https://github.com/honza/140medley/blob/master/140medley.js
 * See also: https://github.com/dciccale/ki.js
 * */
!function(_){
    if (window[_]) throw new Error(_ + ' is already defined.');
    var e = Element.prototype;
    var $ = window[_] = document;
    
    // standard collection operations
    var m=['forEach','map','reduce','filter','reduceRight','every','slice','some'];
    
    // add event listener to collection
    function x(e,f,c){
        for (var i=0;i<this.length;++i)
            this[i].on(e,f,c);
        return this;
    }
    // remove event listener from collection
    function y(e,f,c){
        for (var i=0;i<this.length;++i)
            this[i].off(e,f,c);
        return this;
    }
    // dispatch the event e to every element of the collection
    function z(e){
        for (var i=0;i<this.length;++i)
            this[i].raise(e);
        return this;
    }
    // load the standard operations into the given collection prototype
    function c(n){
        for (var i=0;i<m.length;++i)
            n[m[i]]=n[m[i]]||Array.prototype[m[i]];
        // event registration shorthands
        n.on = x;
        n.off = y;
        n.raise = z;
    }
    c(HTMLCollection.prototype);
    c(NodeList.prototype);
    c(NamedNodeMap.prototype);
    
    // create an event type in a way compatible with IE9
    $.event=function(k,t){
        var v=$.createEvent(k);
        v['init'+k].apply(v,[].slice.call(arguments, 1));
        return v;
    };
    // event registration shorthands
    function v(b){
        // event handling
        b.on = b.addEventListener;
        b.off = b.removeEventListener;
        b.raise = b.dispatchEvent;
    }
    v(window);
    // DOM querying operations
    function a(b){
        b.filter = b.querySelectorAll;
        b.first = b.querySelector;
        b.byTag = b.getElementsByTagName;
        b.byClass = b.getElementsByClassName;
        v(b);
    }
    a(e);
    a($);
    
    // document root-specific queries
    $.byName = $.getElementsByName;
    $.byId = $.getElementById;
    
    // DOM manipulation
    $.new = $.createElement;
    e.insertAfter = function(x, c){
        this.insertBefore(x, c.nextSibling);
    };

    // class manipulation
    if (Element['classList']) {
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
        return (this.hasClass(c) ? this.removeClass : this.addClass)(c);
    };
}(window.exports || '$');