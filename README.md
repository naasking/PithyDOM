# PithyJS

A small, concise DOM library for modern browsers and IE9+ that currently
stands at 713 bytes minified+gzipped.

## DOM Querying

Exposes more concise names for the standard query facilities so you can
choose the most appropriate one. These extend Element.prototype so they
are available everywhere.

    $.any       // alias for querySelectorAll
    $.first     // alias for querySelector
    $.byTag     // alias for getElementsByTagName
    $.byClass   // alias for getElementsByClassName
    $.byName    // alias for getElementsByName
    $.byId      // alias for getElementsById

Caveats: the semantics are sometimes not consistent across browsers.
For instance, getElementsByName works applies to all elements in most
browsers, but in IE9 it will only return those elements that typically
have name attributes, like 'a' and 'input' elements.

## Collection Extensions

The standard suite of purely functional array-processing functions are
added to HTMLCollection.prototype and NodeList.prototype.

    list.forEach     // alias for Array.prototype.forEach
    list.map         // alias for Array.prototype.map
    list.reduce      // alias for Array.prototype.reduce
    list.reduceRight // alias for Array.prototype.reduceRight
    list.filter      // alias for Array.prototype.filter
    list.every       // alias for Array.prototype.every
    list.some        // alias for Array.prototype.some
    list.slice       // alias for Array.prototype.slice

## Event Handling

Pithy exposes more concise names for the standard event facilities. These
methods extend Element.prototype, HTMLCollection.prototype and
NodeList.prototype, so they are available everywhere.

    $.on         // alias for addEventListener
    $.off        // alias for removeEventListener
    $.raise      // alias for dispatchEvent

You can use the new event APIs that support event constructors:

    element.raise(new MouseEvent('click'));

Or to support IE9, use the DOM level 3 API with this convenience
function:

    element.raise($.event('Event', 'click', true, true));

The first argument is the kind of event, and defines which event init
method is called, ie. 'MouseEvent' will call initMouseEvent, 'UIEvent'
will call initUIEvent. This means you must provide all the non-optional
parameters that initMouseEvent expects or you will get a runtime error.

## CSS Class Manipulation

Exposes convenient methods for adding and removing classes, and provides
implementations for versions of IE that don't support classList.

   $.addClass       // add a single CSS class to an Element
   $.removeClass    // remove a single CSS class
   $.hasClass       // check whether

add/remove support chaining, in that they return the element for further
operations. Since add/remove only operate on a single class at a time,
you can add multiple classes as:

    element.addClass('foo').addClass('bar');

This was for conciseness and simplicity of implementation, since adding
multiple classes isn't necessarily supported even by browsers that
support classList.

## DOM Manipulation

Methods to manipulate the DOM:

    element.insertAfter     // complement to standard element.insertBefore

## Browser Support

Works in IE9+ and other standard browsers. I don't have access to some
mobile browsers, but this library doesn't do anything overly complex,
so they should be fine.

## Status

Let's say alpha quality for now, although the tests are pretty
comprehensive given how simple Pithy is.

Not sure if extending prototypes is the best approach, but it's certainly
concise and usable. May switch to Object.defineProperty to make the
properties immutable.

## License

MIT License