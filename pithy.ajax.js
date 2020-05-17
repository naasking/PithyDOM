/*
 * Simple javascript AJAX library.
 * Copyright Sandro Magi 2020
 * */
!function(_){
    "use strict";
    //if (this[_]) throw new Error(_ + ' is already defined.');
    var e = Element.prototype,
        $ = window[_] = document,
        lg = console.log;
    $.uriPart = encodeURIComponent;
    $.url = function(o, pre) {
        var q = [];
        for (var p in o) {
          if (o.hasOwnProperty(p)) {
            var v = o[p],
                k = pre ? (isNaN(parseInt(p)) ? pre + '.' + p : pre + '[' + p + ']') : p;
            if (v !== null && typeof v === 'object'){
                q.push($.url(v, k));
            } else {
                q.push($.uriPart(k));
                q.push('=');
                q.push($.uriPart(v));
                q.push('&');
            }
          }
        }
        return q.join('');
    };
    $.ajax = function(m,u,a,l,p) {
        var r = new XMLHttpRequest(),
            t = [], v = [], d = [],
            c = null;
        r.open(m,u,a||true,l,p);
        function app(q, r, e){
            for(var i=0; i < q.length; ++i)
                try { q[i](r, e); } catch(e) {lg(e);}
        }
        r.on('load', function(e){
            if (c)
                r.responseType = c;
            app(t, r, e);
            app(d, r, e);
        });
        function err(e){
            app(v, r, e);
            app(d, r, e);
        }
        r.on('error', err);
        r.on('abort', err);
        return Object.create({
            on: function(e,f) { r.on(e,f); return this; },
            off: function(e,f) { r.on(e,f); return this; },
            abort: r.abort.bind(r),
            header: function(k,v) { r.setRequestHeader(k,v); return this; },
            as: function(m){ c = m; return this; },
            timeout: function(t) { r.timeout=t; return this; },
            ok: function(f) { t.push(f); return this; },
            fail: function(f) { v.push(f); return this; },
            send: function(b) { r.send(b); return this; },
            dispose: function(f) { d.push(f); return this; }
        });
    };
    // $.ajax("GET", "http://sdfsdfs", true, "smagi@...", "foo")
    //  .timeout(100)
    //  .on('load', function(e) {})
    //  .result(function(r,e){})
    //  .catch(function(r,e){})
    //  .send();
}(this.exports || '$');