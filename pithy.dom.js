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
    "use strict";
    var w= window;
    if (w[_]) throw new Error(_ + ' is already defined.');
    var e = Element.prototype,
        $ = w[_] = document,
        ap = Array.prototype,
        m=['forEach','map','reduce','filter','reduceRight','every','slice','some'],
        s=['insertBefore','insertAfter','on','off','raise','attr','addClass','toggleClass','removeClass','appendChild','removeChild','replaceChild'];
    
    // DOM manipulation
    e.insertAfter = function(x, c){
        this.insertBefore(x, c.nextSibling);
    };
    // event registration shorthands
    function v(t){
        var b = t.prototype;
            b.on = b.addEventListener;
            b.off = b.removeEventListener;
            b.raise = b.dispatchEvent;
    }
    (typeof EventTarget !== "undefined" ? v(EventTarget) : (v(Element), v(Document), v(Window), v(XMLHttpRequest), v(DocumentFragment)));

    // create an event type in a way compatible with IE9
    $.event=function(k,t){
        var v=$.createEvent(k);
        v['init'+k].apply(v,ap.slice.call(arguments, 1));
        return v;
    };
    // DOM querying operations
    function a(b){
        b.filter = b.querySelectorAll;
        b.first = b.querySelector;
        b.byTag = b.getElementsByTagName;
        b.byClass = b.getElementsByClassName;
        b.attr = function(k,v){
            return v
                ? this.setAttribute(k, v)
                : this.getAttribute(k);
        };
    }
    a(e);
    a($);
    a(DocumentFragment);
    
    // document root-specific queries
    $.byName = $.getElementsByName;
    $.byId = $.getElementById;
    $.tag = function(t,f) {
        var x = $.createElement(t);
        if (f) f(x);
        return x;
    };

    // class manipulation
    e.addClass = function() {
        this.className += ' ' + ap.join.call(arguments, ' ');
        return this;
    };
    e.removeClass = function() {
        for (var i=0, j=0, a=arguments, c=this.className.split(' '); i < a.length; ++i)
            if ((j=c.indexOf(a[i])) >= 0)
                c[j] = '', --i;
        this.className = c.join(' ');
        return this;
    };
    e.hasClass = function(c) {
        // an efficient non-allocating class search
        for (var _=this.className, i=_.indexOf(c); 0 <= i && i < _.length; i = _.indexOf(c, i+1))
            if ((i == 0 || _[i-1] == ' ') && (i+c.length == _.length || _[i+c.length] == ' '))
                return true;
        return false;
    };
    e.toggleClass = function(c) {
        return (this.hasClass(c) ? this.removeClass : this.addClass)(c);
    };
    e.replaceClass = function(o,n) {
        for (var i=0, c=this.className.split(' '); i < c.length; ++i)
            if (c[i]===o)
                c[i] = n;
        this.className=c.join(' ');
        return this;
    };
    
    // apply f transitively to all collection elements
    function fwd(f){
        return function() {
            for (var i=0; i < this.length; ++i)
                try {
                    f.apply(this[i], arguments);
                } catch(e) {
                    console.log(e);
                }
            return this;
        }
    }
    // load the standard operations into the given collection prototype
    function c(n){
        for (var i=0;i<m.length;++i)
            n[m[i]]=n[m[i]]||Array.prototype[m[i]];
        // register element methods that should apply across collections
        for (var i = 0; i < s.length; ++i)
            n[s[i]] = fwd(e[s[i]]);
    }
    c(HTMLCollection.prototype);
    c(NodeList.prototype);
    c(NamedNodeMap.prototype);

    // delay function until the next tick
    var c = new MessageChannel(), nx=0, q = {};
    c.port1.onmessage = function(e) {
        try {
            q[e.data]();
        } finally{
            delete q[e.data];
        }
    };
    $.delay = function(f){
        var i = nx++;
        q[i] = f;
        c.port2.postMessage(i);
    };
}(this.exports || '$');