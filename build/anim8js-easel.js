
/**
 * @module anim8
 * @class Core
 */

/**
 * Converts a subject into an animator and returns it. If the subject 
 * is already an animator it's returned immediately. If the subject can't be
 * animated then false is returned.
 *
 * **See:** {{#crossLink "Core/anim8.factoryFor:method"}}{{/crossLink}}
 * 
 * @param {Any} subject
 * @return {Animator|false}
 * @method anim8
 */
m8 = anim8 = function(subject) 
{
  if ( subject instanceof anim8.Animator )
  {
    return subject;
  }

  var factory = anim8.factoryFor( subject, true );

  if ( factory === false )
  {
    return false;
  }

  return factory.animatorFor( subject );
};

/**
 * Converts an array of subjects into an array of Animators.
 *
 * @param {Array} subject
 * @return {Animators}
 * @method anim8s
 */
m8s = anim8s = function(subjects)
{
  var factory = anim8.factoryFor( subjects, true );
  var animators = [];

  if ( factory !== false )
  {
    factory.animatorsFor( subjects, animators );

    return new anim8.Animators( animators );
  }

  if ( !anim8.isArray( subjects ) )
  {
    subjects = [ subjects ];
  }

  var animators = [];

  for (var i = 0; i < subjects.length; i++)
  {
    var animator = anim8( subjects[i] );

    if ( animator !== false )
    {
      animators.push( animator );
    }
  }

  return new anim8.Animators( animators );
};

/**
 * The default values for anim8js properties.
 *
 * @property {Object} anim8.defaults
 */
anim8.defaults = 
{

  /**
   * The default animation duration in milliseconds.
   *
   * @property {Number} duration
   * @for anim8.defaults
   * @default 1000
   */
  duration: 1000,

  /**
   * The default easing.
   * 
   * @property {String|Function|Array} easing
   * @for anim8.defaults
   * @default 'ease'
   */
  easing: 'ease',

  /**
   * The default "total easing" which is the overall easing
   * for an animation which actually has easing values per frame.
   * 
   * @property {String|Function|Array} teasing
   * @for anim8.defaults
   * @default 'linear'
   */
  teasing: 'linear',

  /**
   * The default animation delay in milliseconds.
   * 
   * @property {Number} delay
   * @for anim8.defaults
   * @default 0
   */
  delay: 0,

  /**
   * The default animation sleep in milliseconds.
   * 
   * @property {Number} sleep
   * @for anim8.defaults
   * @default 0
   */
  sleep: 0,

  /**
   * The default number of repeats for an animation.
   * 
   * @property {Number} repeat
   * @for anim8.defaults
   * @default 1
   */
  repeat: 1,

  /**
   * The default scale for an animation.
   * 
   * @property scale
   * @for anim8.defaults
   * @default 1.0
   * @type {Number}
   */
  scale: 1.0,

  /**
   * The default animation offset in milliseconds.
   *
   * @property {Number} offset
   * @for anim8.defaults
   * @default 0
   */
  offset: 0,

  /**
   * The default transition time in milliseconds.
   * 
   * @property {Number} transitionTime
   * @for anim8.defaults
   * @default 500
   */
  transitionTime: 500,

  /**
   * The default transition outroduction time in milliseconds.
   * 
   * @property {Number} transitionOutro
   * @for anim8.defaults
   * @default 100
   */
  transitionOutro: 100,

  /**
   * The default transition introduction time in milliseconds.
   * 
   * @property {Number} transitionIntro
   * @for anim8.defaults
   * @default 100
   */
  transitionIntro: 100,

  /**
   * The default transition easing when none is specified.
   * 
   * @property {String|Function|Array} transitionEasing
   * @for anim8.defaults
   * @default 'linear'
   */
  transitionEasing: 'linear',

  /**
   * The default transition granularity. This is used for smooth transitions to
   * provide a smooth transition from the outro velocity to the intro velocity,
   * the cubic or quadratic path between the two is a curve with unknown length
   * so the length needs to be calculated using a maximum number of points to
   * calculate along the path - summing the distances between the consecutive points.
   * 
   * @property {Number} transitionGranularity
   * @for anim8.defaults
   * @default 0
   */
  transitionGranularity: 0,

  /**
   * TODO
   * 
   * @property {Number} transitionLookup
   * @for anim8.defaults
   * @default 10
   */
  transitionLookup: 10,

  /**
   * Whether animtions are cached whenever possible. Animations that can be
   * cached are strings with options specified in the string and without an
   * option object given. For example 'tada ~1s 3s x3' is cacheable.
   * 
   * **See:** {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}}
   * 
   * @property {Boolean} cache
   * @for anim8.defaults
   * @default false
   */
  cache: false,

  /**
   * Whether parsed options are cached whenever possible. Options that can be
   * cached must be strings.
   * 
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @property {Boolean} cacheOptions
   * @for anim8.defaults
   * @default false
   */
  cacheOptions: false,

  /**
   * Whether parsed transitions are cached whenever possible. Transitions that can be
   * cached must be strings.
   * 
   * **See:** {{#crossLink "Core/anim8.transition:method"}}{{/crossLink}}
   * 
   * @property {Boolean} cacheTransitions
   * @for anim8.defaults
   * @default false
   */
  cacheTransitions: false,

  /**
   * The value to return when options could not be parsed from input.
   * 
   * @property {Object} noOptions
   * @for anim8.defaults
   * @default {}
   */
  noOptions: {},

  /**
   * The value to return when a transition could not be parsed from input.
   * 
   * @property {Object} noTransition
   * @for anim8.defaults
   * @default {}
   */
  noTransition: {},

  /**
   * The target number of milliseconds between frames. This only applies if the
   * browser doesn't support any of the requestAnimationFrame variations.
   * 
   * @property {Number} frameRate
   * @for anim8.defaults
   * @default 33
   */
  frameRate: 33

};

/**
 * @class Core
 */

/**
 * A function that does nothing.
 * 
 * @property anim8.noop
 */
anim8.noop = function() {};

/**
 * Returns true if the given variable is defined.
 *
 * **Examples:**
 *
 *     anim8.isDefined( 0 );     // true
 *     anim8.isDefined( false ); // true
 *     anim8.isDefined();        // false
 * 
 * @method anim8.isDefined
 * @param {Any} x
 * @return {Boolean}
 */
anim8.isDefined = function(x) 
{
  return typeof x !== 'undefined';
};

/**
 * Returns true if the given variable is a function.
 *
 * @method anim8.isFunction
 * @param {Any} x
 * @return {Boolean}
 */
anim8.isFunction = function(x) 
{
  return !!(x && x.constructor && x.call && x.apply);
};

/**
 * Returns true if the given variable is a number.
 *
 * **Examples:**
 *
 *     anim8.isNumber( 0 );     // true
 *     anim8.isNumber( -45.6 ); // true
 *     anim8.isNumber( true );  // false
 *     anim8.isNumber( '1' );   // false
 *     anim8.isNumber();        // false
 *
 * @method anim8.isNumber
 * @param {Any} x
 * @return {Boolean}
 */
anim8.isNumber = function(x) 
{
  return typeof x === 'number';
};

/**
 * Returns true if the given variable is a string.
 *
 * **Examples:**
 *
 *     anim8.isString( '' );    // true
 *     anim8.isString( '1' );   // true
 *     anim8.isString( 4.5 );   // false
 *     anim8.isString();        // false
 *
 * @method anim8.isString
 * @param {Any} x
 * @return {Boolean}
 */
anim8.isString = function(x) 
{
  return typeof x === 'string';
};

/**
 * Returns true if the given variable is an array. This should be checked before
 * anim8.isObject since Arrays are objects.
 *
 * **Examples:**
 *
 *     anim8.isArray( [] );     // true
 *     anim8.isArray( [4, 5] ); // true
 *     anim8.isArray( 4.5 );    // false
 *     anim8.isArray();         // false
 *
 * @method anim8.isArray
 * @param {Any} x
 * @return {Boolean}
 */
anim8.isArray = function(x) 
{
  return x instanceof Array;
};

/**
 * Returns true if the given variable is an object. Arrays are considered 
 * objects.
 *
 * **Examples:**
 *
 *     anim8.isObject( {} );     // true
 *     anim8.isObject( [] );     // true
 *     anim8.isObject( 4.5 );    // false
 *     anim8.isObject();         // false
 *
 * @method anim8.isObject
 * @param {Any} x
 * @return {Boolean}
 */
anim8.isObject = function(x) 
{
  return typeof x === 'object';
};

/**
 * Returns true if the given variable is an HTML element.
 *
 * @method anim8.isElement
 * @param {Any} x
 * @return {Boolean}
 */
anim8.isElement = function(x)
{
  return typeof HTMLElement === "object" ? x instanceof HTMLElement :
  x && typeof x === "object" && x !== null && x.nodeType === 1 && typeof x.nodeName === "string";
};

/**
 * Returns the current time in milliseconds.
 *
 * @method anim8.now
 * @return {Number}
 */
anim8.now = (function() 
{
  return Date.now ? Date.now : function() 
  {
    return new Date().getTime();
  };
  
})();

/**
 * Returns the trimmed version of the given string. A trimmed string has no
 * whitespace in the beginning or end of it.
 *
 * **Examples:**
 *
 *     anim8.trim( 'x' );     // 'x'
 *     anim8.trim( '   x' );  // 'x'
 *     anim8.trim( 'x   ' );  // 'x'
 *     anim8.trim( '  x ' );  // 'x'
 *     anim8.trim( '    ' );  // ''
 * 
 * @method anim8.trim
 * @param  {String} x
 * @return {String}
 */
anim8.trim = (function()
{ 
  if (String.prototype.trim) {
    return function(x) {
      return x.trim();
    };
  }
  return function(x) {
    return x.replace(/^([\s]*)|([\s]*)$/g, '');
  };
})();

/**
 * Determines whether the given variable is empty.
 *
 * **Examples:**
 *
 *     anim8.isEmpty( '' );        // true
 *     anim8.isEmpty( 0 );         // true
 *     anim8.isEmpty( [] );        // true
 *     anim8.isEmpty( {} );        // true
 *     anim8.isEmpty( null );      // true
 *     anim8.isEmpty( true );      // true
 *     anim8.isEmpty( false );     // true
 *     anim8.isEmpty( 'x' );       // false
 *     anim8.isEmpty( 0.3 );       // false
 *     anim8.isEmpty( [0] );       // false
 *     anim8.isEmpty( {x:3} );     // false
 *
 * @method anim8.isEmpty
 * @param {Any} x
 * @return {Boolean}
 */
anim8.isEmpty = function(x)
{
  if ( anim8.isArray( x ) || anim8.isString( x ) )
  {
    return x.length > 0;
  }
  else if ( x === null )
  {
    return true;
  }
  else if ( anim8.isObject( x ) )
  {
    for (var prop in x)
    {
      return false;
    }
  }
  else if ( anim8.isNumber( x ) )
  {
    return x !== 0.0;
  }

  return true;
};

/**
 * Performs a deep copy of the given variable. If the variable is an array or 
 * object a new instance of that type is created where the values are copied as 
 * well. All other types can't be copied (most likely because they're scalar) so
 * they are returned as-is.
 *
 * @method anim8.copy
 * @param {T} x
 * @return {T}
 */
anim8.copy = function(x) 
{
  if ( anim8.isArray(x) ) 
  {
    var copy = [];
    for (var i = 0; i < x.length; i++) 
    {
      copy.push( anim8.copy( x[i] ) );
    }
    x = copy;
  }
  else if ( anim8.isObject(x) ) 
  {
    var copy = {};
    for (var p in x) 
    {
      copy[p] = anim8.copy( x[p] );
    }
    x = copy;
  }
  
  return x;
};

/**
 * Extends the given object by merging the following objects into it, avoiding 
 * overriding any existing properties.
 * 
 * @method anim8.extend
 * @param  {Object} out
 * @return {Object}
 */
anim8.extend = function(out)
{
  for (var i = 1; i < arguments.length; i++)
  {
    var o = arguments[ i ];

    if ( anim8.isObject( o ) )
    {
      for (var prop in o)
      {
        if ( !(prop in out) )
        {
          out[prop] = o[prop];
        }
      }
    }
  }

  return out;
};

/**
 * Extends the given object my merging the following objects into, overriding 
 * existing properties where necessary.
 * 
 * @method anim8.override
 * @param  {Object} out
 * @return {Object}
 */
anim8.override = function(out)
{
  for (var i = 1; i < arguments.length; i++)
  {
    var o = arguments[ i ];

    if ( anim8.isObject( o ) )
    {
      for (var prop in o)
      {
        out[prop] = o[prop];
      }
    }
  }

  return out;
};

/**
 * Returns the first defined variable of a possible 4 variables.
 *
 * **Examples:**
 *
 *     anim8.coalesce( 1, 2, 3 );           // 1
 *     anim8.coalesce( undefined, 2, 3 );   // 2
 *     anim8.coalesce();                    // undefined
 * 
 * @method anim8.coalesce
 */
anim8.coalesce = function(a, b, c, d) 
{
  if (anim8.isDefined(a)) return a;
  if (anim8.isDefined(b)) return b;
  if (anim8.isDefined(c)) return c;
  return d;
};

/**
 * Parses milliseconds from a string or number. If a number is given it's 
 * assumed to be milliseconds and is returned immediately. If a string is given
 * a unit is looked for to determine how to scale the number into milliseconds.
 * If the given time is invalid and returnOnInvalid is not given then zero is
 * returned.
 *
 * **Examples:**
 *
 *     anim8.time( 45 );       // 45
 *     anim8.time( 45.9 );     // 45
 *     anim8.time( -4.1 );     // -5
 *     anim8.time( '5ms' );    // 5
 *     anim8.time( '23' );     // 23
 *     anim8.time( '5c' );     // 500
 *     anim8.time( '5cs' );    // 500
 *     anim8.time( '5jiffy' ); // 833
 *     anim8.time( '5third' ); // 833
 *     anim8.time( '10s' );    // 10000
 *     anim8.time( '10sec' );  // 10000
 *     anim8.time( '1.5m' );   // 90000
 *     anim8.time( '1.5min' ); // 90000
 *     anim8.time( '0.4h' );   // 144000
 *     anim8.time( '0.4hr' );  // 144000
 *
 * @method anim8.time
 * @param {String|Number} time
 * @param {Any} [returnOnInvalid]
 */
anim8.time = (function()
{
  var regex = /^(-?\d*(\.\d+)|-?\d+)(ms|s|c|cs|third|jiffy|sec|m|min|h|hr)?$/;
  
  var conversions = {
    ms:     1,
    c:      100,
    cs:     100,
    jiffy:  1000 / 60,
    third:  1000 / 60,
    s:      1000,
    sec:    1000,
    m:      1000 * 60,
    min:    1000 * 60,
    h:      1000 * 60 * 60,
    hr:     1000 * 60 * 60
  };
  
  return function(time, returnOnInvalid) 
  {  
    if ( anim8.isNumber( time ) )
    {
      // raw numbers are considered milliseconds
      return Math.floor( time );
    }
    if ( anim8.isString( time ) )
    {
      var parsed = regex.exec( time );
      
      if ( parsed )
      {
        var time = parseFloat( parsed[1] );
        var unit = parsed[3];
        
        if ( unit in conversions )
        {
          time *= conversions[ unit ];
        }
        
        return Math.floor( time );
      }
    }
    
    return anim8.coalesce( returnOnInvalid, 0 );
  };
  
})();

/**
 * Parses delay from a string or number. If the input is not a valid time then
 * {{#crossLink "anim8.defaults/delay:property"}}anim8.defaults.delay{{/crossLink}}
 * is returned.
 *
 * **See:** {{#crossLink "Core/anim8.time:method"}}anim8.time{{/crossLink}}
 *
 * @method anim8.delay
 * @param {String|Number} time
 */ 
anim8.delay = function(time)
{
  return anim8.time( time, anim8.defaults.delay );
};

/**
 * Parses sleep from a string or number. If the input is not a valid time then
 * {{#crossLink "anim8.defaults/sleep:property"}}anim8.defaults.sleep{{/crossLink}}
 * is returned.
 *
 * **See:** {{#crossLink "Core/anim8.time:method"}}anim8.time{{/crossLink}}
 *
 * @method anim8.sleep
 * @param {String|Number} time
 */ 
anim8.sleep = function(time)
{
  return anim8.time( time, anim8.defaults.sleep );
};

/**
 * Parses duration from a string or number. If the input is not a valid time then
 * {{#crossLink "anim8.defaults/duration:property"}}anim8.defaults.duration{{/crossLink}}
 * is returned.
 *
 * **See:** {{#crossLink "Core/anim8.time:method"}}anim8.time{{/crossLink}}
 * 
 * @method anim8.duration
 * @param {String|Number} time
 */ 
anim8.duration = function(time)
{
  return anim8.time( time, anim8.defaults.duration );
};

/**
 * Parses offset from a string or number. If the input is not a valid time then
 * {{#crossLink "anim8.defaults/offset:property"}}anim8.defaults.offset{{/crossLink}}
 * is returned.
 *
 * **See:** {{#crossLink "Core/anim8.time:method"}}anim8.time{{/crossLink}}
 * 
 * @method anim8.offset
 * @param {String|Number} time
 */ 
anim8.offset = function(time)
{
  return anim8.time( time, anim8.defaults.offset );
};

/**
 * Parses repeats from a string or number. If a valid repeat is not given then
 * `returnOnInvalid` is returned, if that is not given then
 * {{#crossLink "anim8.defaults/repeat:property"}}anim8.defaults.repeat{{/crossLink}}
 * is returned.
 *
 * **Examples:**
 *
 *     anim8.repeat( 5 );            // 5
 *     anim8.repeat( 'inf' );        // Infinity
 *     anim8.repeat( 'infinity' );   // Infinity
 *     anim8.repeat( 'infinite' );   // Infinity
 *     anim8.repeat( 'once' );       // 1
 *     anim8.repeat( 'twice' );      // 2
 *     anim8.repeat( 'thrice' );     // 3
 *     anim8.repeat( 'dozen' );      // 12
 *     anim8.repeat( 'random' );     // 4
 *     anim8.repeat( 'invalid', 6 ); // 6
 *     anim8.repeat( false, 7 );     // 7
 *     anim8.repeat();               // anim8.defaults.repeat
 *
 * @method anim8.repeat
 * @param {String|Number} time
 * @param {E} [returnOnInvalid]
 * @return {Number|E}
 */
anim8.repeat = (function() 
{
  var conversions = {
    inf:        Number.POSITIVE_INFINITY,
    infinity:   Number.POSITIVE_INFINITY,
    infinite:   Number.POSITIVE_INFINITY,
    once:       1,
    twice:      2,
    thrice:     3,
    dozen:      12,
    random:     4 // chosen by fair dice roll. guaranteed to be random.
  };

  return function(repeat, returnOnInvalid)
  {
    if ( anim8.isNumber( repeat ) )
    {
      return repeat;
    }
    if ( anim8.isString( repeat ) )
    {
      repeat = repeat.toLowerCase();

      if ( repeat in conversions )
      {
        return conversions[ repeat ];
      }
      else
      {
        var parsed = parseInt( repeat );

        if ( !isNaN(parsed) )
        {
          return parsed;
        }
      }
    }

    return anim8.coalesce( returnOnInvalid, anim8.defaults.repeat );
  };

})();

/**
 * Parses a number from the given input and if the input isn't a valid number
 * then returnOnInvalid is returned.
 *
 * **Examples:**
 *
 *     anim8.number( 5 );       // 5
 *     anim8.number( '5' );     // 5
 *     anim8.number( '5e4' );   // 50000
 *     anim8.number( 'x' );     // undefined
 *     anim8.number( 'x', 23 ); // 23
 * 
 * @method anim8.number
 * @param {String|Number} value
 * @param {E} returnOnInvalid
 * @return {Number|E}
 */
anim8.number = function(value, returnOnInvalid)
{
  var parsed = parseFloat( value );

  return isNaN( parsed ) ? returnOnInvalid : parsed;
};

/**
 * Parses scale from a string or number.
 *
 * **See:** {{#crossLink "Core/anim8.number:method"}}anim8.number{{/crossLink}}
 * 
 * @method anim8.scale
 * @param {String|Number} scale
 * @return {Number}
 */
anim8.scale = function(scale)
{
  return anim8.number( scale, anim8.defaults.scale );
};

/**
 * Provides a way to wrap a variable so calculators don't try copying it on parse.
 *
 * **Examples:**
 *
 *     anim8.constant( 5 );   // function() { return 5; }
 *
 * @method anim8.constant
 * @param {T} variable
 * @return {Function}
 */
anim8.constant = function(variable)
{
  return function() 
  {
    return variable;
  };
};

/**
 * Resolves the given variable. If the variable is a function the result is 
 * returned.
 *
 * **Examples:**
 *
 *     anim8.resolve( 5 );                     // 5
 *     anim8.resolve( true );                  // true
 *     anim8.resolve( function(){return 7;} ); // 7
 * 
 * @method anim8.resolve
 * @param  {Function|E} variable
 * @return {E}
 */
anim8.resolve = function(variable)
{
  return anim8.isFunction( variable ) ? variable() : variable;
};

/**
 * Returns a value between the given minimum and maximum.
 *
 * **Examples:**
 *
 *     anim8.clamp( 5, 1, 6 );   // 5
 *     anim8.clamp( 0, 1, 6 );   // 1
 *     anim8.clamp( 7, 1, 6 );   // 6
 * 
 * @method anim8.clamp
 * @param  {Number} v
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
anim8.clamp = function(v, min, max)
{
  return (v < min) ? min : (v > max ? max : v);
};

/**
 * Creates a function which calls a method on all elements in the array or on 
 * the first element.
 *
 * @method anim8.delegate
 * @param {String} functionName
 * @param {String} returning
 */
anim8.delegate = function(functionName, returning) 
{  
  switch (returning)
  {
  case anim8.delegate.RETURN_THIS:
    return function() 
    {
      for (var i = 0; i < this.length; i++) 
      {
        this[i][functionName].apply( this[i], arguments );
      }
      
      return this;  
    };
    
  case anim8.delegate.RETURN_RESULTS:
    return function() 
    {
      var results = [];
    
      for (var i = 0; i < this.length; i++)
      {
        results.push( this[i][functionName].apply( this[i], arguments ) );
      }
    
      return results;
    };
    
  case anim8.delegate.RETURN_FIRST:
    return function()
    {
      return this.length === 0 ? undefined : this[0][functionName].apply( this[0], arguments );
    };

  case anim8.delegate.RETURN_TRUE:
    return function()
    {
      for (var i = 0; i < this.length; i++)
      {
        if ( this[i][functionName].apply( this[i], arguments ) )
        {
          return true;
        }
      }

      return false;
    };

  }
  
  return anim8.noop;
};

/**
 * this is returned at the end.
 *
 * @property RETURN_THIS
 * @for anim8.delegate
 */
anim8.delegate.RETURN_THIS = 'this';

/**
 * An array of results for each method call is returned.
 *
 * @property RETURN_RESULTS
 * @for anim8.delegate
 */
anim8.delegate.RETURN_RESULTS = 'results';

/**
 * The result of the first element.
 *
 * @property RETURN_FIRST
 * @for anim8.delegate
 */
anim8.delegate.RETURN_FIRST = 'first';

/**
 * True if any of the methods return true, otherwise false.
 *
 * @property RETURN_TRUE
 * @for anim8.delegate
 */
anim8.delegate.RETURN_TRUE = 'true';


/**
 * Adds functions to the given object (or prototype) so you can listen for any 
 * number of events on the given object, optionally once. Listeners can be 
 * removed later.
 *
 * The following methods will be added to the given target:
 *
 *     target.on( events, callback, [context] )
 *     target.once( events, callback, [context] )
 *     target.off( events, callback )
 *     target.trigger( event, [argument] )
 *
 * Where... 
 * - `events` is a string of space delimited events.
 * - `callback` is a function to invoke when the event is triggered.
 * - `context` is an object that should be the `this` when the callback is 
 *   invoked. If no context is given the default value is the object which has 
 *   the trigger function that was invoked.
 *
 * @method anim8.eventize
 * @for Core
 * @param {Object} target The object to add `on`, `once`, `off`, and `trigger` 
 *    functions to.
 */
anim8.eventize = function(target)
{
  /**
   * **See:** {{#crossLink "Core/anim8.eventize:method"}}{{/crossLink}}
   * 
   * @class anim8.eventize
   */

  // Adds a listener to $this
  var onListeners = function($this, property, events, callback, context)
  {
    events = events.split(' ');
    
    if ( !anim8.isDefined( $this[ property ] ) )
    {
      $this[ property ] = {};
    }
    
    for (var i = 0; i < events.length; i++)
    {
      if ( !anim8.isDefined( $this[ property ][ events[i] ] ) )
      {
        $this[ property ][ events[i] ] = [];
      }
      
      $this[ property ][ events[i] ].push( [ callback, context || $this ] );
    }
  };
  
  /**
   * Listens for every occurrence of the given events and invokes the callback
   * each time any of them are triggered.
   * 
   * @method on
   * @for anim8.eventize
   * @param {String} events
   * @param {Function} callback
   * @param {Object} context
   * @chainable
   */
  target.on = function(events, callback, context)
  {
    onListeners( this, '$on', events, callback, context );

    return this;
  };
  
  /**
   * Listens for the next occurrence for each of the given events and invokes
   * the callback when any of the events are triggered.
   * 
   * @method once
   * @for anim8.eventize
   * @param {String} events
   * @param {Function} callback
   * @param {Object} context
   * @chainable
   */
  target.once = function(events, callback, context)
  {
    onListeners( this, '$once', events, callback, context );

    return this;
  };
  
  // Removes a listener from an array of listeners.
  var offListeners = function(listeners, event, callback)
  {
    if (listeners && event in listeners)
    {
      var eventListeners = listeners[ event ];
      
      for (var k = eventListeners.length - 1; k >= 0; k--)
      {
        if (eventListeners[ k ][0] === callback)
        {
          eventListeners.splice( k, 1 );
        }
      }  
    }
  };
  
  /**
   * Stops listening for a given callback for a given set of events.
   *
   * @method off
   * @for anim8.eventize
   * @param {String} events
   * @param {Function} callback
   * @chainable
   */
  target.off = function(events, callback)
  {
    events = events.split(' ');
    
    for (var i = 0; i < events.length; i++)
    {
      offListeners( this.$on, events[i] );
      offListeners( this.$once, events[i] );
    }

    return this;
  };
  
  // Triggers listeneers for the given event
  var triggerListeners = function(listeners, event, argument, clear)
  {
    if (listeners && event in listeners)
    {
      var eventListeners = listeners[ event ];
      var max = eventListeners.length;
     
      for (var i = 0; i < max; i++)
      {
        var callback = eventListeners[ i ];
        
        callback[0].call( callback[1], argument );
      }
      
      if ( clear )
      {
        if ( eventListeners.length !== max )
        {
          listeners[ event ] = eventListeners.slice( max );  
        }
        else
        {
          delete listeners[ event ];  
        }
      }
    }
  };
  
  /**
   * Triggers a single event optionally passing an argument to any listeners.
   * 
   * @method trigger
   * @for anim8.eventize
   * @param {String} event
   * @param {Any} argument
   * @chainable
   */
  target.trigger = function(event, argument)
  {
    triggerListeners( this.$on, event, argument, false );
    triggerListeners( this.$once, event, argument, true );

    return this;
  };
};



/**
 * A FastMap has the key-to-value benefits of a map and iteration benefits of an
 * array. This is especially beneficial when most of the time the contents of 
 * the structure need to be iterated and order doesn't matter (since removal 
 * performs a swap which breaks insertion order).
 *
 * @param {FastMap|Object} map
 * @class FastMap
 * @constructor
 */
anim8.FastMap = function(map)
{
  this.reset();

  if ( map instanceof anim8.FastMap )
  {
    this.putMap( map );
  }
  else if ( anim8.isObject( map ) )
  {
    for (var prop in map)
    {
      this.put( prop, map[ prop ] );
    }
  }
};

anim8.FastMap.prototype =
{

  /**
   * Resets the map by initializing the values, keys, and indexes.
   *
   * @method reset
   * @chainable
   */
  reset: function()
  {
    /**
     * An array of the values in this map.
     * 
     * @property {Array} values
     */
    this.values = [];

    /**
     * An array of the keys in this map.
     * 
     * @property {Array} keys
     */
    this.keys = [];

    /**
     * An object of key to index mappings.
     * 
     * @property {Object} indices
     */
    this.indices = {};

    return this;
  },

  /**
   * Puts the value in the map by the given key.
   *
   * @method put
   * @param {String} key
   * @param {V} value
   * @chainable
   */
  put: function(key, value)
  {
    if ( key in this.indices )
    {
      this.values[ this.indices[ key ] ] = value;
    }
    else
    {
      this.indices[ key ] = this.values.length;
      this.values.push( value );
      this.keys.push( key );
    }

    return this;
  },

  /**
   * Puts all keys & values on the given map into this map overwriting any existing values mapped by similar keys.
   *
   * @method putMap
   * @param {FastMap} map
   * @chainable
   */
  putMap: function(map)
  {
    var keys = map.keys;
    var values = map.values;

    for (var i = 0; i < keys.length; i++)
    {
      this.put( keys[ i ], values[ i ] );
    }

    return this;
  },

  /**
   * Returns the value mapped by the given key.
   *
   * @method get
   * @param {String} key
   * @return {V}
   */
  get: function(key)
  {
    return this.values[ this.indices[ key ] ];
  },

  /**
   * Removes the value by a given key
   *
   * @method remove
   * @param {String} key
   * @chainable
   */
  remove: function(key)
  {
    if ( key in this.indices )
    {
      this.removeAt( this.indices[ key ] );
    }

    return this;
  },

  /**
   * Removes the value & key at the given index.
   *
   * @method removeAt
   * @param {Number} index
   * @chainable
   */
  removeAt: function(index)
  {
    var key = this.keys[ index ];
    var lastValue = this.values.pop();
    var lastKey = this.keys.pop();

    if ( index < this.values.length )
    {
      this.values[ index ] = lastValue;
      this.keys[ index ] = lastKey;
      this.indices[ lastKey ] = index;
    }

    delete this.indices[ key ];

    return this;
  },

  /**
   * Returns the index of the value in the array given a key.
   *
   * @method indexOf
   * @param {String} key
   * @return {Number}
   */
  indexOf: function(key)
  {
    return anim8.coalesce( this.indices[ key ], -1 );
  },

  /**
   * Returns whether this map has a value for the given key.
   *
   * @method has
   * @param {String} key
   * @return {Boolean}
   */
  has: function(key)
  {
    return key in this.indices;
  },

  /**
   * Returns whether the given input has overlap with keys in this map.
   *
   * @method hasOverlap
   * @param {FastMap|Object} map
   * @return {Boolean}
   */
  hasOverlap: function(map)
  {
    var keys = this.keys;
    var indices = map.indices;

    for (var i = 0; i < keys.length; i++)
    {
      if ( keys[i] in indices )
      {
        return true;
      }
    }
   
    return false;
  },

  /**
   * Returns the number of elements in the map.
   *
   * @method size
   * @return {Number}
   */
  size: function()
  {
    return this.values.length;
  },

  /**
   * Clears all keys & values from the map.
   *
   * @method clear
   * @chainable
   */
  clear: function()
  {
    this.values.length = 0;
    this.keys.length = 0;
    this.indices = {};

    return this;
  }

};

/**
 * Instantiates a Defer instance. Defer instances keep track of method calls
 * to call at a later time - after an event occurs. The first argument needs
 * to be a function which returns an instance of anim8.Defer when it's invoked.
 * The second argument is an array of methods that can be deferred.
 * 
 * @param {Function} factory
 * @param {Array} methods
 * @class Defer
 * @constructor
 */
anim8.Defer = function(factory, methods)
{
  this.$factory = factory;
  
  for (var i = 0; i < methods.length; i++)
  {  
    this[ methods[i] ] = this.$push( methods[i] );
  }
};

anim8.Defer.prototype = 
{  
  /**
   * Resets the defer instance.
   *
   * @method $reset
   * @param {Object} eventable
   * @param {Any} previous
   * @param {String} eventType
   * @param {String} event
   * @param {Function} callback
   */
  $reset: function(eventable, previous, eventType, event, callback)
  {
    this.$eventable = eventable;
    this.$previous = previous;
    this.$eventType = eventType;
    this.$event = event;
    this.$callback = callback;
    this.$calls = [];
    this.$next = [];
    
    if ( this.$isRoot() )
    {
      this.$register();
    }
  },

  /**
   * Determines whether this Defer instance is at the root.
   *
   * @method $isRoot
   * @return {Boolean}
   */
  $isRoot: function()
  {
    return this.$eventable === this.$previous;
  },

  /**
   * Registers this Defer instance with the eventable.
   *
   * @method $register
   */
  $register: function()
  {
    this.$eventable[ this.$eventType ]( this.$event, this.$run, this );
  },

  /**
   * Creates a defered function which passes the method and arguments for
   * any method call into an array of calls on this Defer instance.
   *
   * @method $push
   * @param {String} methodName
   * @return {Function}
   */
  $push: function(methodName)
  {
    return function() 
    {
      this.$calls.push( [methodName, arguments] );
      
      return this;
    };
  },

  /**
   * Executes all defered method calls and starts any child Defer instances.
   *
   * @method $run
   */
  $run: function() 
  {
    // Invoke the callback if one was given.
    if ( anim8.isFunction( this.$callback ) )
    {
      this.$callback.call( this.$eventable, this );
    }
    
    for (var i = 0; i < this.$calls.length; i++)
    {
      var call = this.$calls[ i ];
      
      this.$eventable[ call[0] ].apply( this.$eventable, call[1] );
    }
    
    for (var k = 0; k < this.$next.length; k++)
    {
      this.$next[ k ].$register();
    }
  },

  /**
   * Returns the object before the defer statement.
   *
   * @method undefer
   * @return {Any}
   */
  undefer: function()
  {
    return this.$previous;
  },

  /**
   * Defers any following method calls to after the given event is triggered. A
   * callback can be specified which is a function invoked after the event is
   * triggered.
   *
   * @method defer
   * @param {String} eventType
   * @param {String} event
   * @param {Function} callback
   * @return {Defer}
   */
  defer: function(eventType, event, callback)
  {
    var next = new this.$factory( this.$eventable, this, eventType, event, callback );
    
    this.$next.push( next );
    
    return next;
  }
  
};

/**
 * Returns an easing based on the given input. If the input is a function it's 
 * assumed to be an easing function and is returned immediately. If the input is
 * a string the easing with that name is returned. If the input is a string in 
 * the format 'easing-easingType' then an easing is returned that is a 
 * combination of the easing with the given name and the easingType with the 
 * given name. If the given input is an array with 4 elements it's assumed to be
 * a bezier path and one is created and returned. If no input is given the 
 * default easing is returned. If an easing cannot be determined then an error
 * is thrown.
 *
 * **Examples:**
 *
 *     anim8.easing();               // anim8.defaults.easing
 *     anim8.easing( 'linear' );     // anim8.easing.linear
 *     anim8.easing( 'reverse' );    // anim8.easingType.reverse( anim8.defaults.easing )
 *     anim8.easing( 'ease-yoyo' );  // anim8.easingType.yoyo( anim8.easing.ease )
 *     anim8.easing( [0,0,1,1] );    // anim8.easing.bezier( 0, 0, 1, 1 )
 *     anim8.easing( 5, false );     // false
 *     anim8.easing( 'invalid', 1 ); // 1
 *     anim8.easing( [0,0,1], 1 );   // 1
 *
 * @method anim8.easing
 * @for Core
 * @param {Function|String|Array} easing
 * @param {E} [returnOnInvalid]
 * @return {Function|E}
 */
anim8.easing = function(easing, returnOnInvalid) 
{
  if ( anim8.isFunction( easing ) ) 
  {
    return easing;
  }
  if ( anim8.isString( easing ) )
  {
    if ( easing in anim8.easing )
    {
      return anim8.easing[ easing ];
    }
    if ( easing in anim8.easingType )
    {
      return anim8.easingType[ easing ]( anim8.easing( anim8.defaults.easing ) );
    }
    
    if ( easing.indexOf('-') !== -1 )
    {
      var pair = easing.split('-');
      var e = pair[0];
      var t = pair[1];
      
      if ( pair.length >= 2 && e in anim8.easing && t in anim8.easingType )
      {        
        return anim8.easingType[ t ]( anim8.easing[ e ] );
      }
    }
  }
  if ( anim8.isArray( easing ) && easing.length === 4 && anim8.isNumber( easing[0] ) && anim8.isNumber( easing[1] ) && anim8.isNumber( easing[2] ) && anim8.isNumber( easing[3] ) ) 
  {
    return anim8.easing.bezier.apply( null, easing );
  }
  if ( !anim8.isDefined( easing ) ) 
  {
    return anim8.easing( anim8.defaults.easing );
  }
  
  if ( anim8.isDefined( returnOnInvalid ) )
  {
    return returnOnInvalid;
  }
  
  throw easing + ' is not a valid easing';
};

/**
 * Returns true if the given string would result in returning an easing.
 *
 * **See:** {{#crossLink "Core/anim8.easing"}}{{/crossLink}}
 * 
 * @method anim8.isEasingName
 * @for Core
 * @param {String} easing
 * @return {Boolean}
 */
anim8.isEasingName = function(easing)
{
  if ( easing in anim8.easing )
  {
    return true;
  }
  
  var pair = easing.split('-');
  var e = pair[0];
  var t = pair[1];
  
  if ( pair.length >= 2 && e in anim8.easing && t in anim8.easingType )
  {        
    return true;
  }
  
  return false;
};

/**
 * A collection of easing functions. An easing functions takes a single number
 * as input that's between 0 and 1 inclusively and returns a number that 
 * progresses from 0 to 1 but in-between values may return a number that's less 
 * than 0 or greater than 1.
 *
 * **See:** {{#crossLink "Core/anim8.easing"}}{{/crossLink}}
 * 
 * @class anim8.easing
 */

/**
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJ4IiwiY29sb3IiOiIjMDAwMDAwIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiLTAuMTkyNTAwMDAwMDAwMDAwMjUiLCIxLjQzMjQ5OTk5OTk5OTk5OTkiLCIwLjAxNzQ5OTk5OTk5OTk5OTg3NyIsIjEuMDE3NDk5OTk5OTk5OTk5OCJdfV0-)
 *
 * @method linear
 * @for anim8.easing
 */
anim8.easing.linear = function(x) 
{
  return x;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJ4KngiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method quad
 * @for anim8.easing
 */
anim8.easing.quad = function(x)
{
  return x * x;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoKDAuMyooMS14KSooMS14KSp4KSsoMy4wKigxLXgpKngqeCkrKHgqeCp4KSkqKDEteCkreCooMS0oMS14KSooMS14KSooMS14KSooMS14KSkiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method quad
 * @for anim8.easing
 */ 
anim8.easing.ease = function(x)
{
  var i = (1.0 - x);
  var i2 = i * i;
  var x2 = x * x;
  var eq1 = (0.3 * i2 * x) + (3.0 * i * x2) + (x2 * x);
  var eq2 = 1.0 - i2 * i2;
  
  return eq1 * i + eq2 * x;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJ4KngqeCIsImNvbG9yIjoiIzAwMDAwMCJ9LHsidHlwZSI6MTAwMCwid2luZG93IjpbIi0wLjE5MjUwMDAwMDAwMDAwMDI1IiwiMS40MzI0OTk5OTk5OTk5OTk5IiwiMC4wMTc0OTk5OTk5OTk5OTk4NzciLCIxLjAxNzQ5OTk5OTk5OTk5OTgiXX1d)
 *
 * @method cubic
 * @for anim8.easing
 */
anim8.easing.cubic = function(x) 
{
  return x * x * x;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJ4KngqeCp4IiwiY29sb3IiOiIjMDAwMDAwIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiLTAuMTkyNTAwMDAwMDAwMDAwMjUiLCIxLjQzMjQ5OTk5OTk5OTk5OTkiLCIwLjAxNzQ5OTk5OTk5OTk5OTg3NyIsIjEuMDE3NDk5OTk5OTk5OTk5OCJdfV0-)
 *
 * @method quartic
 * @for anim8.easing
 */
anim8.easing.quartic = function(x) 
{
  var x2 = x * x;
  return x2 * x2;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJ4KngqeCp4KngiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method quintic
 * @for anim8.easing
 */
anim8.easing.quintic = function(x) 
{
  var x2 = x * x;
  return x2 * x2 * x;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoeCp4KngpKyh4KngpLXgiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method back
 * @for anim8.easing
 */
anim8.easing.back = function(x) 
{
  var x2 = x * x;
  var x3 = x2 * x;
  return x3 + x2 - x;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJzaW4oeCoxLjU3MDc5NjMyNjc5KSIsImNvbG9yIjoiIzAwMDAwMCJ9LHsidHlwZSI6MTAwMCwid2luZG93IjpbIi0wLjE5MjUwMDAwMDAwMDAwMDI1IiwiMS40MzI0OTk5OTk5OTk5OTk5IiwiMC4wMTc0OTk5OTk5OTk5OTk4NzciLCIxLjAxNzQ5OTk5OTk5OTk5OTgiXX1d)
 *
 * @method sine
 * @for anim8.easing
 */
anim8.easing.sine = function(x) 
{
  return Math.sin( x * 1.57079632679 );
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoMS4wLXgqKDcuMC8xMCkpKngqKDEwLjAvMy4wKSIsImNvbG9yIjoiIzAwMDAwMCJ9LHsidHlwZSI6MTAwMCwid2luZG93IjpbIi0wLjE5MjUwMDAwMDAwMDAwMDI1IiwiMS40MzI0OTk5OTk5OTk5OTk5IiwiMC4wMTc0OTk5OTk5OTk5OTk4NzciLCIxLjAxNzQ5OTk5OTk5OTk5OTgiXX1d)
 *
 * @method overshot
 * @for anim8.easing
 */
anim8.easing.overshot = function(x)
{
  return (1.0 - x * (7.0 / 10)) * x * (10.0 / 3.0);
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoeCp4KigoMi4wKngqeCp4KSt4KngtKDQuMCp4KSsyLjApKSotc2luKHgqMTAuOTk1NTc0Mjg3NikiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method elastic
 * @for anim8.easing
 */
anim8.easing.elastic = function(x) 
{
  var x2 = x * x;
  var x3 = x2 * x;
  var scale = x2 * ((2.0 * x3) + x2 - (4.0 * x) + 2.0);
  var wave = -Math.sin(x * 10.9955742876);
  return scale * wave;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJhYnMoeC1zaW4oeCozLjE0MTU5MjY1MzU5KSkiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method revisit
 * @for anim8.easing
 */
anim8.easing.revisit = function(x) 
{
  return Math.abs( x - Math.sin(x * 3.14159265359) );
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoMS4wLWNvcyh4KngqeCozNi4wKSooMS4wLXgpKSIsImNvbG9yIjoiIzAwMDAwMCJ9LHsidHlwZSI6MTAwMCwid2luZG93IjpbIi0wLjE5MjUwMDAwMDAwMDAwMDI1IiwiMS40MzI0OTk5OTk5OTk5OTk5IiwiMC4wMTc0OTk5OTk5OTk5OTk4NzciLCIxLjAxNzQ5OTk5OTk5OTk5OTgiXX1d)
 *
 * @method lasso
 * @for anim8.easing
 */
anim8.easing.lasso = function(x)
{
  return (1.0 - Math.cos(x * x * x * 36.0) * (1.0 - x));
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoMS4wLWFicygoMS4wLXgqeCkqY29zKHgqeCp4KjE0LjgwNDQwNjYwMTYpKSkiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method slowbounce
 * @for anim8.easing
 */
anim8.easing.slowbounce = function(x) 
{
  var x2 = x * x;
  return (1.0 - Math.abs((1.0 - x2) * Math.cos(x2 * x * 14.8044066016)));
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoMS4wLWFicygoMS4wLXgpKmNvcyh4KngqMTQuODA0NDA2NjAxNikpKSIsImNvbG9yIjoiIzAwMDAwMCJ9LHsidHlwZSI6MTAwMCwid2luZG93IjpbIi0wLjE5MjUwMDAwMDAwMDAwMDI1IiwiMS40MzI0OTk5OTk5OTk5OTk5IiwiMC4wMTc0OTk5OTk5OTk5OTk4NzciLCIxLjAxNzQ5OTk5OTk5OTk5OTgiXX1d)
 *
 * @method bounce
 * @for anim8.easing
 */
anim8.easing.bounce = function(x) 
{
  return (1.0 - Math.abs((1.0 - x) * Math.cos(x * x * 14.8044066016)));
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoMS4wLWFicygoMS14KSooMS14KSpjb3MoeCp4KjE0LjgwNDQwNjYwMTYpKSkiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method smallbounce
 * @for anim8.easing
 */
anim8.easing.smallbounce = function(x) 
{
  var inv = 1.0 - x;
  return (1.0 - Math.abs(inv * inv * Math.cos(x * x * 14.8044066016)));
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoMS4wLWFicygoMS14KSooMS14KSpjb3MoeCp4KjcpKSkiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method tinybounce
 * @for anim8.easing
 */
anim8.easing.tinybounce = function(x) 
{
  var inv = 1.0 - x;
  return (1.0 - Math.abs(inv * inv * Math.cos(x * x * 7.0)));
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoY29zKHgqeCoxMi4wKSp4KigxLjAteCkreCkiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method hesitant
 * @for anim8.easing
 */
anim8.easing.hesitant = function(x) 
{
  return (Math.cos(x * x * 12.0) * x * (1.0 - x) + x);
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJzcXJ0KHgpIiwiY29sb3IiOiIjMDAwMDAwIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiLTAuMTkyNTAwMDAwMDAwMDAwMjUiLCIxLjQzMjQ5OTk5OTk5OTk5OTkiLCIwLjAxNzQ5OTk5OTk5OTk5OTg3NyIsIjEuMDE3NDk5OTk5OTk5OTk5OCJdfV0-)
 *
 * @method sqrt
 * @for anim8.easing
 */
anim8.easing.sqrt = function(x)
{
  return Math.sqrt( x );
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoKDEuMC0oMS14KSooMS14KSooMS14KSooMS14KSkreCkqMC41IiwiY29sb3IiOiIjMDAwMDAwIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiLTAuMTkyNTAwMDAwMDAwMDAwMjUiLCIxLjQzMjQ5OTk5OTk5OTk5OTkiLCIwLjAxNzQ5OTk5OTk5OTk5OTg3NyIsIjEuMDE3NDk5OTk5OTk5OTk5OCJdfV0-)
 *
 * @method sqrtf
 * @for anim8.easing
 */
anim8.easing.sqrtf = function(x)
{
  var i = (1.0 - x);
  var i2 = i * i;
  return ((1.0 - i2 * i2) + x) * 0.5;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIobG9nKHgpKzIuMCkqMC41IiwiY29sb3IiOiIjMDAwMDAwIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiLTAuMTkyNTAwMDAwMDAwMDAwMjUiLCIxLjQzMjQ5OTk5OTk5OTk5OTkiLCIwLjAxNzQ5OTk5OTk5OTk5OTg3NyIsIjEuMDE3NDk5OTk5OTk5OTk5OCJdfV0-)
 *
 * @method log10
 * @for anim8.easing
 */
anim8.easing.log10 = function(x)
{
  return (Math.log10(x + 0.01) + 2.0) * 0.5 / 1.0021606868913213;
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoeDwwLjc_KHgqLTAuMzU3KTooKCh4LTAuNykqKHgtMC43KSoyNy41LTAuNSkqMC41KSkiLCJjb2xvciI6IiMwMDAwMDAifSx7InR5cGUiOjEwMDAsIndpbmRvdyI6WyItMC4xOTI1MDAwMDAwMDAwMDAyNSIsIjEuNDMyNDk5OTk5OTk5OTk5OSIsIjAuMDE3NDk5OTk5OTk5OTk5ODc3IiwiMS4wMTc0OTk5OTk5OTk5OTk4Il19XQ--)
 *
 * @method slingshot
 * @for anim8.easing
 */
anim8.easing.slingshot = function(x)
{
  if (x < 0.7) {
    return (x * -0.357);
  } else {
    var d = x - 0.7;
    return ((d * d * 27.5 - 0.5) * 0.5);
  }
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIxLXNxcnQoMS14KngpIiwiY29sb3IiOiIjMDAwMDAwIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiLTAuMTkyNTAwMDAwMDAwMDAwMjUiLCIxLjQzMjQ5OTk5OTk5OTk5OTkiLCIwLjAxNzQ5OTk5OTk5OTk5OTg3NyIsIjEuMDE3NDk5OTk5OTk5OTk5OCJdfV0-)
 *
 * @method circular
 * @for anim8.easing
 */
anim8.easing.circular = function(x)
{
  return 1.0 - Math.sqrt( 1 - x * x );
};

/** 
 * [View Easing Function](http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiIoMy4wKigxLjAteCkqeCp4KSsoeCp4KngpIiwiY29sb3IiOiIjMDAwMDAwIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiLTAuMTkyNTAwMDAwMDAwMDAwMjUiLCIxLjQzMjQ5OTk5OTk5OTk5OTkiLCIwLjAxNzQ5OTk5OTk5OTk5OTg3NyIsIjEuMDE3NDk5OTk5OTk5OTk5OCJdfV0-)
 *
 * @method gentle
 * @for anim8.easing
 */
anim8.easing.gentle = function(x)
{
  return (3.0 * (1.0 - x) * x * x) + (x * x * x);
};

/**
 * Generates a bezier easing function given the two middle control points. The
 * first point is {0,0} and the last point is {1, 1}.
 *
 * @method bezier
 * @for anim8.easing
 * @param {Number} mX1
 * @param {Number} mY1
 * @param {Number} mX2
 * @param {Number} mY2
 * @return {Function}
 */
anim8.easing.bezier = function(mX1, mY1, mX2, mY2) 
{
  // https://gist.githubusercontent.com/gre/1926947/raw/KeySpline.js
  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
  function C(aA1)      { return 3.0 * aA1; }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function CalcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function GetSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function GetTForX(aX) {
    // Newton raphson iteration
    var aGuessT = aX;
    for (var i = 0; i < 4; ++i) {
      var currentSlope = GetSlope(aGuessT, mX1, mX2);
      if (currentSlope == 0.0) return aGuessT;
      var currentX = CalcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
  
  return function(x) {
    return CalcBezier( GetTForX( x ), mY1, mY2 );
  };
};


/**
 * Returns an easing type based on the input. If the input is a function that 
 * function is immediately returned. If the input is a string the easing type 
 * with that name is returned. If no easing type could be determined an error is
 * thrown.
 *
 * @param {Function|String} easingType
 * @param [Boolean] optional
 * @return {Function|false}
 */
anim8.easingType = function(easingType, optional)
{
  if ( anim8.isFunction( easingType ) )
  {
    return easingType;
  }
  if ( anim8.isString( easingType ) && easingType in anim8.easingType )
  {
    return anim8.easingType[ easingType ];
  }
  
  if ( optional )
  {
    return false;
  }
  
  throw easingType + ' is not a valid easing type';
};

/**
 * A collection of easing type functions. An easing type functions takes an
 * easing function as an argument and modifies it's input and output values.
 *
 * **See:** {{#crossLink "Core/anim8.easing"}}{{/crossLink}}
 * 
 * @class anim8.easingType
 */

/**
 * Plays the animation forward normally.
 *
 * @method in
 * @for anim8.easingType
 * @param {Function} easing
 * @return {Function}
 */
anim8.easingType['in'] = function(easing) 
{
  return function(x) 
  {
    return easing( x );
  };
};

/**
 * Plays the animation forward by flipping the easings momentum.
 * 
 * @method out
 * @for anim8.easingType
 * @param {Function} easing
 * @return {Function}
 */
anim8.easingType.out = function(easing) 
{
  return function(x) 
  {
    return 1.0 - easing( 1.0 - x );
  };
};

/**
 * Plays the animation forward by flipping the easings momentum halfway.
 * 
 * @method inout
 * @for anim8.easingType
 * @param {Function} easing
 * @return {Function}
 */
anim8.easingType.inout = function(easing) 
{
  return function(x) 
  {
    if ( x < 0.5 ) 
    {
      return easing( 2.0 * x ) * 0.5;
    } 
    else 
    {
      return 1.0 - (easing( 2.0 - 2.0 * x ) * 0.5);
    }
  };
};

/**
 * Plays the aninmation forwards with the given easing, and backwards with the same easing momentum.
 * 
 * @method yoyo
 * @for anim8.easingType
 * @param {Function} easing
 * @return {Function}
 */
anim8.easingType.yoyo = function(easing) 
{
  return function(x) 
  {
    if ( x < 0.5 ) 
    {
      return easing( 2.0 * x );
    } 
    else 
    {
      return easing( 2.0 - 2.0 * x );
    }
  };
};

/**
 * Plays the animation forwards with the given easing, and backwards reflecting the easing's momentum.
 * 
 * @method mirror
 * @for anim8.easingType
 * @param {Function} easing
 * @return {Function}
 */
anim8.easingType.mirror = function(easing)
{
  return function(x)
  {
    if ( x < 0.5 )
    {
      return easing( 2.0 * x );
    }
    else
    {
      return 1.0 - easing( 2.0 - 2.0 * x );
    }
  };
};

/**
 * Plays the animation backwards with using the same easing momentum.
 * 
 * @method reverse
 * @for anim8.easingType
 * @param {Function} easing
 * @return {Function}
 */
anim8.easingType.reverse = function(easing)
{
  return function(x)
  {
    return easing( 1.0 - x );
  };
};

/**
 * Plays the animation backwards by flipping the easing's momentum.
 * 
 * @method flip
 * @for anim8.easingType
 * @param {Function} easing
 * @return {Function}
 */
anim8.easingType.flip = function(easing)
{
  return function(x)
  {
    return 1.0 - easing( x );
  };
};


/**
 * Easings equivalent to the CSS animations. These are approximations since the
 * exact functions are not performant enough.
 */

anim8.easing.cssEase      = anim8.easing.ease;

anim8.easing.cssEaseIn    = anim8.easing.quad;

anim8.easing.cssEaseOut   = anim8.easingType.out( anim8.easing.quad );

anim8.easing.cssEaseInOut = anim8.easingType.inout( anim8.easing.quad );

anim8.easing.cssLinear    = anim8.easing.linear;


/**
 * Instantiates a new color given red, green, blue, and white components.
 * If a component is missed it's default value is either 255 (white) or
 * 1.0 (opaque).
 *
 * @method anim8.color
 * @for Core
 * @param {Number} [r=255]
 * @param {Number} [g=255]
 * @param {Number} [b=255]
 * @param {Number} [a=1]
 * @return {Object}
 */
anim8.color = function(r, g, b, a) 
{
  return {
    r: anim8.coalesce( r, 255 ),
    g: anim8.coalesce( g, 255 ),
    b: anim8.coalesce( b, 255 ),
    a: anim8.coalesce( a, 1.0 )
  };
};

/**
 * The array of parsing methods to execute sequentally until a color is returned.
 */
anim8.color.parsers = 
[
  { /* already parsed color */
    parse: function(input) {
      if (typeof input === 'object') {
        var color = {
          r: this.parseComponent(input.r, 'parseInt', 255),
          g: this.parseComponent(input.g, 'parseInt', 255),
          b: this.parseComponent(input.b, 'parseInt', 255),
          a: this.parseComponent(input.a, 'parseFloat', 1.0)
        };
        return color;
      }
      return false;
    },
    parseComponent: function(c, parseFunction, max) {
      var t = typeof c;
      var v = max;
      if (t === 'string') {
        var vparsed = window[parseFunction](t, 10);
        if (!isNaN(vparsed)) {
          v = vparsed;
        }
      }
      else if (t === 'number') {
        v = c;
      }
      if (v > max) {
        v = max;
      }
      if (v < 0) {
        v = 0;
      }
      return v;
    }
  }, 
  { /* colorname */
    names: {
      transparent:{r:255,g:256,b:255,a:0.0},
      aliceblue:{r:240,g:248,b:255,a:1.0},
      antiquewhite:{r:250,g:235,b:215,a:1.0},
      aqua:{r:0,g:255,b:255,a:1.0},
      aquamarine:{r:127,g:255,b:212,a:1.0},
      azure:{r:240,g:255,b:255,a:1.0},
      beige:{r:245,g:245,b:220,a:1.0},
      bisque:{r:255,g:228,b:196,a:1.0},
      black:{r:0,g:0,b:0,a:1.0},
      blanchedalmond:{r:255,g:235,b:205,a:1.0},
      blue:{r:0,g:0,b:255,a:1.0},
      blueviolet:{r:138,g:43,b:226,a:1.0},
      brown:{r:165,g:42,b:42,a:1.0},
      burlywood:{r:222,g:184,b:135,a:1.0},
      cadetblue:{r:95,g:158,b:160,a:1.0},
      chartreuse:{r:127,g:255,b:0,a:1.0},
      chocolate:{r:210,g:105,b:30,a:1.0},
      coral:{r:255,g:127,b:80,a:1.0},
      cornflowerblue:{r:100,g:149,b:237,a:1.0},
      cornsilk:{r:255,g:248,b:220,a:1.0},
      crimson:{r:220,g:20,b:60,a:1.0},
      cyan:{r:0,g:255,b:255,a:1.0},
      darkblue:{r:0,g:0,b:139,a:1.0},
      darkcyan:{r:0,g:139,b:139,a:1.0},
      darkgoldenrod:{r:184,g:134,b:11,a:1.0},
      darkgray:{r:169,g:169,b:169,a:1.0},
      darkgreen:{r:0,g:100,b:0,a:1.0},
      darkkhaki:{r:189,g:183,b:107,a:1.0},
      darkmagenta:{r:139,g:0,b:139,a:1.0},
      darkolivegreen:{r:85,g:107,b:47,a:1.0},
      darkorange:{r:255,g:140,b:0,a:1.0},
      darkorchid:{r:153,g:50,b:204,a:1.0},
      darkred:{r:139,g:0,b:0,a:1.0},
      darksalmon:{r:233,g:150,b:122,a:1.0},
      darkseagreen:{r:143,g:188,b:143,a:1.0},
      darkslateblue:{r:72,g:61,b:139,a:1.0},
      darkslategray:{r:47,g:79,b:79,a:1.0},
      darkturquoise:{r:0,g:206,b:209,a:1.0},
      darkviolet:{r:148,g:0,b:211,a:1.0},
      deeppink:{r:255,g:20,b:147,a:1.0},
      deepskyblue:{r:0,g:191,b:255,a:1.0},
      dimgray:{r:105,g:105,b:105,a:1.0},
      dodgerblue:{r:30,g:144,b:255,a:1.0},
      feldspar:{r:209,g:146,b:117,a:1.0},
      firebrick:{r:178,g:34,b:34,a:1.0},
      floralwhite:{r:255,g:250,b:240,a:1.0},
      forestgreen:{r:34,g:139,b:34,a:1.0},
      fuchsia:{r:255,g:0,b:255,a:1.0},
      gainsboro:{r:220,g:220,b:220,a:1.0},
      ghostwhite:{r:248,g:248,b:255,a:1.0},
      gold:{r:255,g:215,b:0,a:1.0},
      goldenrod:{r:218,g:165,b:32,a:1.0},
      gray:{r:128,g:128,b:128,a:1.0},
      green:{r:0,g:128,b:0,a:1.0},
      greenyellow:{r:173,g:255,b:47,a:1.0},
      honeydew:{r:240,g:255,b:240,a:1.0},
      hotpink:{r:255,g:105,b:180,a:1.0},
      indianred:{r:205,g:92,b:92,a:1.0},
      indigo:{r:75,g:0,b:130,a:1.0},
      ivory:{r:255,g:255,b:240,a:1.0},
      khaki:{r:240,g:230,b:140,a:1.0},
      lavender:{r:230,g:230,b:250,a:1.0},
      lavenderblush:{r:255,g:240,b:245,a:1.0},
      lawngreen:{r:124,g:252,b:0,a:1.0},
      lemonchiffon:{r:255,g:250,b:205,a:1.0},
      lightblue:{r:173,g:216,b:230,a:1.0},
      lightcoral:{r:240,g:128,b:128,a:1.0},
      lightcyan:{r:224,g:255,b:255,a:1.0},
      lightgoldenrodyellow:{r:250,g:250,b:210,a:1.0},
      lightgrey:{r:211,g:211,b:211,a:1.0},
      lightgreen:{r:144,g:238,b:144,a:1.0},
      lightpink:{r:255,g:182,b:193,a:1.0},
      lightsalmon:{r:255,g:160,b:122,a:1.0},
      lightseagreen:{r:32,g:178,b:170,a:1.0},
      lightskyblue:{r:135,g:206,b:250,a:1.0},
      lightslateblue:{r:132,g:112,b:255,a:1.0},
      lightslategray:{r:119,g:136,b:153,a:1.0},
      lightsteelblue:{r:176,g:196,b:222,a:1.0},
      lightyellow:{r:255,g:255,b:224,a:1.0},
      lime:{r:0,g:255,b:0,a:1.0},
      limegreen:{r:50,g:205,b:50,a:1.0},
      linen:{r:250,g:240,b:230,a:1.0},
      magenta:{r:255,g:0,b:255,a:1.0},
      maroon:{r:128,g:0,b:0,a:1.0},
      mediumaquamarine:{r:102,g:205,b:170,a:1.0},
      mediumblue:{r:0,g:0,b:205,a:1.0},
      mediumorchid:{r:186,g:85,b:211,a:1.0},
      mediumpurple:{r:147,g:112,b:216,a:1.0},
      mediumseagreen:{r:60,g:179,b:113,a:1.0},
      mediumslateblue:{r:123,g:104,b:238,a:1.0},
      mediumspringgreen:{r:0,g:250,b:154,a:1.0},
      mediumturquoise:{r:72,g:209,b:204,a:1.0},
      mediumvioletred:{r:199,g:21,b:133,a:1.0},
      midnightblue:{r:25,g:25,b:112,a:1.0},
      mintcream:{r:245,g:255,b:250,a:1.0},
      mistyrose:{r:255,g:228,b:225,a:1.0},
      moccasin:{r:255,g:228,b:181,a:1.0},
      navajowhite:{r:255,g:222,b:173,a:1.0},
      navy:{r:0,g:0,b:128,a:1.0},
      oldlace:{r:253,g:245,b:230,a:1.0},
      olive:{r:128,g:128,b:0,a:1.0},
      olivedrab:{r:107,g:142,b:35,a:1.0},
      orange:{r:255,g:165,b:0,a:1.0},
      orangered:{r:255,g:69,b:0,a:1.0},
      orchid:{r:218,g:112,b:214,a:1.0},
      palegoldenrod:{r:238,g:232,b:170,a:1.0},
      palegreen:{r:152,g:251,b:152,a:1.0},
      paleturquoise:{r:175,g:238,b:238,a:1.0},
      palevioletred:{r:216,g:112,b:147,a:1.0},
      papayawhip:{r:255,g:239,b:213,a:1.0},
      peachpuff:{r:255,g:218,b:185,a:1.0},
      peru:{r:205,g:133,b:63,a:1.0},
      pink:{r:255,g:192,b:203,a:1.0},
      plum:{r:221,g:160,b:221,a:1.0},
      powderblue:{r:176,g:224,b:230,a:1.0},
      purple:{r:128,g:0,b:128,a:1.0},
      red:{r:255,g:0,b:0,a:1.0},
      rosybrown:{r:188,g:143,b:143,a:1.0},
      royalblue:{r:65,g:105,b:225,a:1.0},
      saddlebrown:{r:139,g:69,b:19,a:1.0},
      salmon:{r:250,g:128,b:114,a:1.0},
      sandybrown:{r:244,g:164,b:96,a:1.0},
      seagreen:{r:46,g:139,b:87,a:1.0},
      seashell:{r:255,g:245,b:238,a:1.0},
      sienna:{r:160,g:82,b:45,a:1.0},
      silver:{r:192,g:192,b:192,a:1.0},
      skyblue:{r:135,g:206,b:235,a:1.0},
      slateblue:{r:106,g:90,b:205,a:1.0},
      slategray:{r:112,g:128,b:144,a:1.0},
      snow:{r:255,g:250,b:250,a:1.0},
      springgreen:{r:0,g:255,b:127,a:1.0},
      steelblue:{r:70,g:130,b:180,a:1.0},
      tan:{r:210,g:180,b:140,a:1.0},
      teal:{r:0,g:128,b:128,a:1.0},
      thistle:{r:216,g:191,b:216,a:1.0},
      tomato:{r:255,g:99,b:71,a:1.0},
      turquoise:{r:64,g:224,b:208,a:1.0},
      violet:{r:238,g:130,b:238,a:1.0},
      violetred:{r:208,g:32,b:144,a:1.0},
      wheat:{r:245,g:222,b:179,a:1.0},
      white:{r:255,g:255,b:255,a:1.0},
      whitesmoke:{r:245,g:245,b:245,a:1.0},
      yellow:{r:255,g:255,b:0,a:1.0},
      yellowgreen:{r:154,g:205,b:50,a:1.0}
    },
    parse: function(input) {
      if (typeof input === 'string') {
        input = input.toLowerCase();
        if (input in this.names) {
          var named = this.names[input];
          return {
            r: named.r,
            g: named.g,
            b: named.b,
            a: named.a
          };
        }
      }
      return false;
    }
  },
  { /* #rgb */
    regex: /^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i,
    parse: function(input) {
      var matches = this.regex.exec(input);
      if (matches !== null) {
        return {
          r: parseInt(matches[1] + matches[1], 16),
          g: parseInt(matches[2] + matches[2], 16),
          b: parseInt(matches[3] + matches[3], 16),
          a: 1.0
        };
      }
      return false;
    }
  },
  { /* #rrggbb */
    regex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
    parse: function(input) {
      var matches = this.regex.exec(input);
      if (matches !== null) {
        return {
          r: parseInt(matches[1], 16),
          g: parseInt(matches[2], 16),
          b: parseInt(matches[3], 16),
          a: 1.0
        };
      }
      return false;
    }
  },
  { /* RGB(r,g,b) */
    regex: /^rgb\(\s*(\d{3})\s*,\s*(\d{3})\s*,\s*(\d{3})\s*\)$/i,
    parse: function(input) {
      var matches = this.regex.exec(input);
      if (matches !== null) {
        return {
          r: Math.min(255, parseInt(matches[1], 10)),
          g: Math.min(255, parseInt(matches[2], 10)),
          b: Math.min(255, parseInt(matches[3], 10)),
          a: 1.0
        };
      }
      return false;
    }
  },
  { /* RGBA(r,g,b,a) */
    regex: /^rgba\(\s*(\d{3})\s*,\s*(\d{3})\s*,\s*(\d{3})\s*,\s*([01]?\.\d+|[01])\)$/i,
    parse: function(input) {
      var matches = this.regex.exec(input);
      if (matches !== null) {
        return {
          r: Math.min(255, parseInt(matches[1], 10)),
          g: Math.min(255, parseInt(matches[2], 10)),
          b: Math.min(255, parseInt(matches[3], 10)),
          a: Math.min(1.0, parseFloat(matches[4]))
        };
      }
      return false;
    }
  }
];

/**
 * Parses a color from a string.
 *
 * @method anim8.color.parse
 * @for Core
 * @param {String} input
 * @return {Object|False}
 */
anim8.color.parse = function(input)
{
  var cp = m8.color.parsers;
  
  for (var i = 0; i < this.parsers.length; i++)
  {
    var parsed = this.parsers[i].parse(input);
    
    if (parsed !== false) 
    {
      return parsed;
    }
  }
  
  return false;
};

/**
 * Formats a color to a string.
 *
 * @method anim8.color.format
 * @for Core
 * @param {Object} color
 * @return {String}
 */
anim8.color.format = function(color)
{
  var ca = anim8.clamp( anim8.coalesce( color.a, 1.0 ), 0, 1 );
  var cr = Math.floor( anim8.clamp( anim8.coalesce( color.r, 255 ), 0, 255 ) );
  var cg = Math.floor( anim8.clamp( anim8.coalesce( color.g, 255 ), 0, 255 ) );
  var cb = Math.floor( anim8.clamp( anim8.coalesce( color.b, 255 ), 0, 255 ) );
  
  if (ca === 1.0)
  { 
    var r = cr.toString( 16 );
    var g = cg.toString( 16 );
    var b = cb.toString( 16 );
    
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    
    return '#' + r + g + b;
  }
  else
  {
    return 'rgba(' + cr + ',' + cg + ',' + cb + ',' + ca + ')';
  }
};


/**
 * A collection of computed functions. Computed functions are functions that
 * are invoked once at the start of an animation given the 
 * {{#crossLink "Attrimator"}}{{/crossLink}} and 
 * {{#crossLink "Animator"}}{{/crossLink}} and the result replaces the function.
 *
 * **See:** {{#crossLink "anim8.computed/current:method"}}{{/crossLink}},
 *          {{#crossLink "anim8.computed/relative:method"}}{{/crossLink}},
 *          {{#crossLink "anim8.computed/random:method"}}{{/crossLink}}
 * 
 * @class anim8.computed
 */
anim8.computed = {};

/**
 * Calculates and returns the current value for an 
 * {{#crossLink "Animator"}}{{/crossLink}}. If the animator doesn't have a 
 * current value the default value for the attribute is returned.
 *
 * @method current
 * @param {Attrimator} attrimator
 * @param {Animator} animator
 * @return {T}
 */
anim8.computed.current = function(attrimator, animator)
{
  var attr = attrimator.attribute;
  var attribute = animator.getAttribute( attr );

  if ( attr in animator.frame )
  {
    return attribute.calculator.clone( animator.frame[ attr ] );
  }
  else
  {
    return attribute.cloneDefault();
  }
};

// Marks the function as computed which is a signal to paths & events.
anim8.computed.current.computed = true;

/**
 * Calculates a value relative to the attribute value currently in the animator.
 * A mask can be used for mixed relative & absolute values in a single value
 * where 1 makes it relative and 0 makes it absolute.
 *
 * **Examples:**
 *
 *     anim8.computed.relative( 40 ); // returns function which adds 40 to current value
 *     anim8.computed.relative( 40, 0.5 ); // returns function which adds 40 to half of the current value
 *     anim8.computed.relative( {x: 20, y: 10}, {x: 1, y: 0} ); // returns function which adds 20 to the x of the current value and sets the y of the current value to 10
 * 
 * @method relative
 * @param {T} relativeAmount
 * @param {T} mask
 * @return {Function}
 */
anim8.computed.relative = function(relativeAmount, mask)
{
  // If the relativeAmount is already a computed value, return it.
  if ( anim8.isComputed( relativeAmount ) )
  {
    return relativeAmount;
  }

  var relativeFunction = function(attrimator, animator)
  { 
    var attr = attrimator.attribute;
    var attribute = animator.getAttribute( attr );
    var calc = attribute.calculator;
    var current = null;

    if ( attr in animator.frame )
    {
      current = calc.clone( animator.frame[ attr ] );
    }
    else
    {
      current = attribute.cloneDefault();
    }

    if ( mask )
    {
      current = calc.mul( current, mask );
    }

    return calc.add( current, relativeAmount );
  };

  // Marks the function as computed which is a signal to paths & events.
  relativeFunction.computed = true;

  // Place the input on the function if the user wants to modify it live
  relativeFunction.relativeAmount = relativeAmount;
  relativeFunction.mask = mask;

  return relativeFunction;
};

/**
 * Returns a random value based on the given random selection.
 * 
 * 1. If an array is given an item is randomly chosen from that array.
 * 2. If an instance of {{#crossLink "Path"}}{{/crossLink}} is given a point is randomly computed and returned.
 * 3. If an object with min & max values is given a random value between them is returned.
 *
 * **Examples:**
 *
 *     anim8.computed.random( [1, 2, 3] ); // returns function which returns a 1, 2, or 3
 *     anim8.computed.random( {min: 1, max: 5} ); // returns function which returns a value between 1 and 5
 *     anim8.computed.random( {min: {x: 0, y: 0}, max: {x: 100, y: 200}} ); // returns function which returns a point in the rectangle {0,0,100,200}
 *     anim8.computed.random( path ); // returns function which returns a value anywhere along the given path
 * 
 * @method random
 * @param  {Array|Object|Path} randomSelection
 * @return {Function}
 */
anim8.computed.random = function(randomSelection)
{
  var randomFunction = null;

  if ( anim8.isArray( randomSelection ) )
  {
    randomFunction = function(attrimator, animator)
    {
      var attr = attrimator.attribute;
      var attribute = animator.getAttribute( attr );
      var calc = attribute.calculator;
      var selected = randomSelection[ Math.floor( Math.random() * randomSelection.length ) ];

      return calc.parse( selected, calc.ZERO );
    };
  }
  else if ( randomSelection instanceof anim8.Path )
  {
    randomFunction = function(attrimator, animator)
    {
      var attr = attrimator.attribute;
      var attribute = animator.getAttribute( attr );
      var calc = attribute.calculator;

      return randomSelection.compute( calc.create(), Math.random() );
    };
  }
  else if ( anim8.isObject( randomSelection ) && anim8.isDefined( randomSelection.min ) && anim8.isDefined( randomSelection.max ) )
  {
    randomFunction = function(attrimator, animator)
    {
      var attr = attrimator.attribute;
      var attribute = animator.getAttribute( attr );
      var calc = attribute.calculator;
      var resolvedMin = anim8.resolve( randomSelection.min );
      var resolvedMax = anim8.resolve( randomSelection.max );
      var min = calc.parse( resolvedMin, calc.ZERO );
      var max = calc.parse( resolvedMax, calc.ZERO );

      return calc.random( calc.create(), min, max );
    };
  }
  else
  {
    throw 'Invalid random input: ' + randomSelection;
  }

  // Marks the function as computed which is a signal to paths & events.
  randomFunction.computed = true;

  // Place the input on the function if the user wants to modify it live
  randomFunction.randomSelection = randomSelection;

  return randomFunction;
};

/**
 * Determines whether the given value is a computed value. A computed value is
 * function with a variable 'computed' set to a true value.
 * 
 * @param  {any} x
 * @return {Boolean}
 */
anim8.isComputed = function(x)
{
  return anim8.isFunction( x ) && x.computed;
};

/**
 * A collection of calculators. A calculator is responsible for performing
 * mathematical operations for a specific animatable data type.
 * 
 * @class anim8.calculator
 */

/**
 * Returns a calculator based on the input. If the input is an instance of
 * {{#crossLink "Calculator"}}{{/crossLink}} it is immediately returned. If the 
 * input is a string the calculator with that name is returned. If no calculator 
 * could be determined the default calculator is returned.
 *
 * @method anim8.calculator
 * @for Core
 * @param {Calculator|String} calc
 * @return {Calculator}
 */
anim8.calculator = function(calc)
{
  if ( calc instanceof anim8.Calculator )
  {
    return calc;
  }
  if ( anim8.isString( calc ) && calc in anim8.calculator )
  {
    return anim8.calculator[ calc ];
  }
  
  return anim8.calculator['default'];
};

/**
 * Instantiates a new Calculator instance.
 *
 * @class Calculator
 * @constructor
 */
anim8.Calculator = function()
{

};

anim8.Calculator.prototype = 
{

  /**
   * Creates the constants for this calculator.
   *
   * @method createConstants
   */
  createConstants: function()
  {
    this.ZERO = this.create();
    this.ONE = this.parse( 1.0, this.ZERO );
    this.INFINITY = this.parse( Number.POSITIVE_INFINITY, this.ZERO );
  },

  /**
   * Parses the given input for a value this calculator understands.
   *
   * @method parse
   * @param  {T} x
   * @param  {T} defaultValue
   * @return {T|Function|False}
   */
  parse: function(x, defaultValue)
  {
    throw 'Calculator.parse not implemented';
  },

  /**
   * Copies a value and places it in out and returns out.
   *
   * @method copy
   * @param {T} out
   * @param {T} copy
   * @return {T}
   */
  copy: function(out, copy)
  {
    throw 'Calculator.copy not implemented';
  },

  /**
   * Clones the value and returns the clone.
   *
   * @method clone
   * @param {T} clone
   * @return {T}
   */
  clone: function(clone) 
  {
    return this.copy( this.create(), clone );
  },

  /**
   * Creates an empty value equivalent to zero.
   * 
   * @method create
   * @return {T}
   */
  create: function()
  {
    throw 'Calculator.create not implemented';
  },

  /**
   * Scales out by the given scalar value and returns out.
   * 
   * @method scale
   * @param {T} out
   * @param {Number} scale
   * @return {T}
   */
  scale: function(out, scale) 
  {
    return this.adds( out, out, scale - 1 );
  },

  /**
   * Adds an amount to out and returns out.
   * 
   * @method add
   * @param {T} out
   * @param {T} amount
   * @return {T}
   */
  add: function(out, amount) 
  {
    return this.adds( out, amount, 1 );
  },

  /**
   * Adds an amount scaled by a scalar value to out and returns out.
   * 
   * @method adds
   * @param {T} out
   * @param {T} amount
   * @param {Number} amountScale
   * @return {T}
   */
  adds: function(out, amount, amountScale)
  {
    throw 'Calculator.adds not implemented';
  },

  /**
   * Subtracts an amount from out and returns out.
   * 
   * @method sub
   * @param {T} out
   * @param {T} amount
   * @return {T}
   */
  sub: function(out, amount) 
  {
    return this.adds( out, amount, -1 );
  },

  /**
   * Multiplies out by some amount and returns out.
   * 
   * @method mul
   * @param {T} out
   * @param {T} scale
   * @return {T}
   */
  mul: function(out, scale)
  {
    throw 'Calculator.mul not implemented';
  },

  /**
   * Interpolates out between start & end given a delta value and returns out. 
   * A delta value typically lies between 0 and 1 inclusively.
   * 
   * @method interpolate
   * @param {T} out
   * @param {T} start
   * @param {T} end
   * @param {Number} delta
   * @return {T}
   */
  interpolate: function(out, start, end, delta) 
  {
    out = this.zero( out );
    out = this.adds( out, start, 1 - delta );
    out = this.adds( out, end, delta );
    return out;
  },

  /**
   * Returns a random value between the given min and max.
   * 
   * @method random
   * @param {T} out
   * @param {T} min
   * @param {T} max
   * @return {T}
   */
  random: function(out, min, max)
  {
    return this.interpolate( out, min, max, Math.random() );
  },

  /**
   * Calculates the distance between the two values.
   * 
   * @method distance
   * @param {T} a
   * @param {T} b
   * @return {Number}
   */
  distance: function(a, b)
  {
    return Math.sqrt( this.distanceSq( a, b ) );
  },

  /**
   * Calculates the squared distance between the two values.
   * 
   * @method distanceSq
   * @param {T} a
   * @param {T} b
   * @return {Number}
   */
  distanceSq: function(a, b)
  {
    throw 'Calculator.distanceSq not implemented';
  },

  /**
   * Returns the distance the given value is from zero.
   * 
   * @method length
   * @param {T} a
   * @return {Number}
   */
  length: function(a)
  {
    return this.distance( a, this.ZERO );
  },

  /**
   * Returns the squared distance the given value is from zero.
   * 
   * @method lengthSq
   * @param {T} a
   * @return {Number}
   */
  lengthSq: function(a)
  {
    return this.distanceSq( a, this.ZERO );
  },

  /**
   * Determines whether the given value is valid for this calculator.
   * 
   * @method isValid
   * @param {any} a
   * @return {Boolean}
   */
  isValid: function(a)
  {
    throw 'Calculator.isValid not implemented';
  },

  /**
   * Returns whether the given value is not a number or has a component which is
   * not a number.
   * 
   * @method isNaN
   * @param {T} a
   * @return {Boolean}
   */
  isNaN: function(a)
  {
    throw 'Calculator.isNaN not implemented';
  },

  /**
   * Determines whether the given value is equivalent to zero given an 
   * acceptable distance from zero (epsilon).
   * 
   * @method isZero
   * @param {T} a
   * @param {Number} epsilon
   * @return {Boolean}
   */
  isZero: function(a, epsilon)
  {
    throw 'Calculator.isZero not implemented';
  },

  /**
   * Determines whether the given values are equivalent up to an acceptable
   * distance apart.
   * 
   * @method isEqual
   * @param {T} a
   * @param {T} b
   * @param {Number} epsilon
   * @return {Boolean}
   */
  isEqual: function(a, b, epsilon)
  {
    throw 'Calculator.isEqual not implemented';
  },

  /**
   * Sets out to the minimum value between the two values and returns out.
   * 
   * @method min
   * @param {T} out
   * @param {T} a
   * @param {T} b
   * @return {T}
   */
  min: function(out, a, b)
  {
    throw 'Calculator.min not implemented';
  },

  /**
   * Sets out to the maximum value between two values and returns out.
   * 
   * @method max
   * @param {T} out
   * @param {T} a
   * @param {T} b
   * @return {T}
   */
  max: function(out, a, b)
  {
    throw 'Calculator.max not implemented';
  },

  /**
   * Performs the dot product between two values.
   * 
   * @param {T} a
   * @param {T} b
   * @return {Number}
   */
  dot: function(a, b)
  {
    throw 'Calculator.dot not implemented';
  },

  /**
   * Clamps out between the given minimum and maximum values and returns out.
   * 
   * @method clamp
   * @param {T} out
   * @param {T} min
   * @param {T} max
   * @return {T}
   */
  clamp: function(out, min, max)
  {
    var distSq = this.distanceSq( out, this.ZERO );

    if ( distSq < min * min )
    {
      return this.scale( out, min / Math.sqrt( distSq ) );
    }
    else if ( distSq > max * max )
    {
      return this.scale( out, max / Math.sqrt( distSq ) );
    }

    return out;
  },

  /**
   * Sets the length of the given value and returns the new value.
   * 
   * @param {T} out
   * @param {Number} length
   * @return {T}
   */
  setLength: function(out, length)
  {
    var lengthSq = this.lengthSq( out );

    if ( lengthSq !== 0 )
    {
      return this.scale( out, length / Math.sqrt( lengthSq ) );
    }

    return out;
  },

  /**
   * Determines whether the given value appears to be a relative value. Relative
   * values are stored as strings starting with a plus or minus for positive or
   * negative respectively.
   * 
   * @method isRelative
   * @param {Any} x
   * @return {Boolean}
   * @protected
   */
  isRelative: function(x)
  {
    return anim8.isString( x ) && ( x[0] === '-' || x[0] === '+' );
  },

  /**
   * Returns the relative amount of the given relative value. If the value is 
   * not a valid relative value false is returned.
   * 
   * @method getRelativeAmount
   * @param {String} x
   * @return {Number}
   * @protected
   */
  getRelativeAmount: function(x)
  {
    var z = parseFloat( x );

    return isNaN(z) ? false : z;
  }

};


/**
 * A calculator for number primitives.
 *
 * @class CalculatorNumber
 * @constructor
 * @extends Calculator
 */
anim8.CalculatorNumber = function()
{
  this.createConstants();
};

anim8.override( anim8.CalculatorNumber.prototype = new anim8.Calculator(), 
{
  parse: function(x, defaultValue)
  {
    // Values computed live.
    if ( anim8.isFunction( x ) )
    {
      return x;
    }
    // Value computed from current value on animator.
    if ( x === true )
    {
      return anim8.computed.current;
    }
    // A raw number
    if ( anim8.isNumber( x ) )
    {
      return x;
    }
    // A number in a string or a relative number.
    if ( anim8.isString( x ) )
    {
      var amount = this.getRelativeAmount( x );
      
      if ( amount !== false )
      {
        if ( this.isRelative( x ) )
        {
          return anim8.computed.relative( amount );
        }
        else
        {
          return amount;
        }
      }
    }
    
    return defaultValue;
  },
  copy: function(out, copy) 
  { 
    return copy;
  },
  create: function() 
  {
    return 0.0;
  },
  zero: function(out) 
  {
    return 0.0;
  },
  adds: function(out, amount, amountScale) 
  {
    return out += amount * amountScale;
  },
  mul: function(out, scale) 
  {
    return out *= scale;
  },
  interpolate: function(out, start, end, delta) 
  {
    return (end - start) * delta + start;
  },
  distanceSq: function(a, b) 
  {
    var ab = a - b;
    return ab * ab;
  },
  distance: function(a, b)
  {
    return Math.abs( a - b );
  },
  length: function(a)
  {
    return Math.abs( a );
  },
  lengthSq: function(a)
  {
    return a * a;
  },
  isValid: function(a) 
  {
    return typeof a === 'number';
  },
  isNaN: function(a) 
  {
    return isNaN(a);
  },
  isZero: function(a, epsilon) 
  {
    return Math.abs(a) < epsilon;
  },
  isEqual: function(a, b, epsilon) 
  {
    return Math.abs(a - b) < epsilon;
  },
  min: function(out, a, b)
  {
    return Math.min( a, b );
  },
  max: function(out, a, b)
  {
    return Math.max( a, b );
  },
  dot: function(a, b)
  {
    return a * b;
  }
});

/**
 * A calculator for numbers.
 *
 * @property {CalculatorNumber} number
 * @for anim8.calculator
 */
anim8.calculator['number'] = new anim8.CalculatorNumber();

/**
 * The default calculator.
 *
 * @property {CalculatorNumber} default
 * @for anim8.calculator
 */
anim8.calculator['default'] = anim8.calculator['number'];

/*
 * A calculator for objects with an x and y component (number)
 *
 * @class Calculator2d
 * @constructor
 * @extends Calculator
 */
anim8.Calculator2d = function()
{
  this.createConstants();
};

anim8.override( anim8.Calculator2d.prototype = new anim8.Calculator(), 
{
  parse: function(x, defaultValue)
  {
    // Values computed live.
    if ( anim8.isFunction( x ) )
    {
      return x;
    }
    // Value computed from current value on animator.
    if ( x === true )
    {
      return anim8.computed.current;
    }
    // When a number is given a uniform point is returned.
    if ( anim8.isNumber( x ) )
    {
      return {
        x: x,
        y: x
      };
    }
    // When an array is given, assume [x, y]
    if ( anim8.isArray( x ) )
    {
      x = { x: x[0], y: x[1] };
    }
    // When an object is given, check for relative values.
    if ( anim8.isObject( x ) )
    {
      var cx = anim8.coalesce( x.x, defaultValue.x );
      var cy = anim8.coalesce( x.y, defaultValue.y );
      var rx = this.getRelativeAmount( cx );
      var ry = this.getRelativeAmount( cy );

      if ( rx !== false && ry !== false )
      {
        var parsed = { x: rx, y: ry };
        var ix = this.isRelative( cx );
        var iy = this.isRelative( cy );

        if ( ix || iy )
        {
          var mask = {
            x: ix ? 1 : 0,
            y: iy ? 1 : 0
          };

          return anim8.computed.relative( parsed, mask );
        }

        return parsed;
      }
    }
    // Relative values & left/right/middle/center/top/bottom aliases.
    if ( anim8.isString( x ) )
    {
      // If only a relative value is given it will modify the X & Y components evenly.
      if ( this.isRelative( x ) )
      {
        var rx = this.getRelativeAmount( x );

        if ( rx !== false )
        {
          return anim8.computed.relative( { x: rx, y: rx } ); 
        }
      }

      var aliases = {
        'left':   0,
        'right':  100,
        'middle': 50,
        'center': 50,
        'top':    0,
        'bottom': 100
      };
      
      if ( x.indexOf(' ') === -1 )
      {
        var _x = parseFloat( x );
        
        if ( !isNaN(_x) || x in aliases )
        {
          return {
            x: x in aliases ? aliases[x] : _x,
            y: x in aliases ? aliases[x] : _x
          };
        }
      }
      else
      {
        var pair = x.split(' ');
        var _x = parseFloat( pair[0] );
        var _y = parseFloat( pair[1] );
        
        if ((!isNaN(_x) || pair[0] in aliases) && (!isNaN(_y) || pair[1] in aliases))
        {
          return {
            x: pair[0] in aliases ? aliases[pair[0]] : _x,
            y: pair[1] in aliases ? aliases[pair[1]] : _y
          };
        }
      }
    }
    
    // If no value was given but the default value was given, clone it.
    if ( anim8.isDefined( defaultValue ) )
    {
      return this.clone( defaultValue );      
    }
    
    return false;
  },
  copy: function(out, copy) 
  {
    out.x = copy.x;
    out.y = copy.y;
    return out;
  },
  create: function() 
  {
    return {x: 0.0, y:0.0};
  },
  zero: function(out) 
  {
    out.x = 0.0;
    out.y = 0.0;
    return out;
  },
  adds: function(out, amount, amountScale) 
  {
    out.x += amount.x * amountScale;
    out.y += amount.y * amountScale;
    return out;
  },
  mul: function(out, scale) 
  {
    out.x *= scale.x;
    out.y *= scale.y;
    return out;
  },
  interpolate: function(out, start, end, delta) 
  {
    out.x = (end.x - start.x) * delta + start.x;
    out.y = (end.y - start.y) * delta + start.y;
    return out;
  },
  distanceSq: function(a, b) 
  {
    var dx = a.x - b.x;
    var dy = a.y - b.y;    
    return dx * dx + dy * dy;
  },
  isValid: function(a) 
  {
    return typeof a === 'object' && 'x' in a && 'y' in a;
  },
  isNaN: function(a) 
  {
    return isNaN(a.x) || isNaN(a.y);
  },
  isZero: function(a, epsilon) 
  {
    return Math.abs(a.x) < epsilon && 
           Math.abs(a.y) < epsilon;
  },
  isEqual: function(a, b, epsilon) 
  {
    return Math.abs(a.x - b.x) < epsilon && 
           Math.abs(a.y - b.y) < epsilon;
  },
  min: function(out, a, b)
  {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    return out;
  },
  max: function(out, a, b)
  {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    return out;
  },
  dot: function(a, b)
  {
    return a.x * b.x + a.y * b.y;
  },
  random: function(out, min, max)
  {
    out.x = (max.x - min.x) * Math.random() + min.x;
    out.y = (max.y - min.y) * Math.random() + min.y;
    return out;
  }
});

/**
 * A calculator for 2d points; objects with x & y Number components.
 *
 * @property {Calculator2d} 2d
 * @for anim8.calculator
 */
anim8.calculator['2d'] = new anim8.Calculator2d();


/**
 * A calculator for objects with an x, y, and z component (number)
 *
 * @class Calculator3d
 * @constructor
 * @extends Calculator
 */
anim8.Calculator3d = function()
{
  this.createConstants();
};

anim8.override( anim8.Calculator3d.prototype = new anim8.Calculator(), 
{
  parse: function(x, defaultValue)
  {
    // Values computed live.
    if ( anim8.isFunction( x ) )
    {
      return x;
    }
    // Value computed from current value on animator.
    if ( x === true )
    {
      return anim8.computed.current;
    }
    // When a number is given a uniform point is returned.
    if ( anim8.isNumber( x ) )
    {
      return {
        x: x,
        y: x,
        z: x
      };
    }
    // When an array is given, assume [x, y, z]
    if ( anim8.isArray( x ) )
    {
      x = { x: x[0], y: x[1], z: x[2] };
    }
    // When an object is given, check for relative values.
    if ( anim8.isObject( x ) )
    {
      var cx = anim8.coalesce( x.x, defaultValue.x );
      var cy = anim8.coalesce( x.y, defaultValue.y );
      var cz = anim8.coalesce( x.z, defaultValue.z );
      var rx = this.getRelativeAmount( cx );
      var ry = this.getRelativeAmount( cy );
      var rz = this.getRelativeAmount( cz );

      if ( rx !== false && ry !== false && rz !== false )
      {
        var parsed = { x: rx, y: ry, z: rz };
        var ix = this.isRelative( cx );
        var iy = this.isRelative( cy );
        var iz = this.isRelative( cz );

        if ( ix || iy || iz )
        { 
          var mask = {
            x: ix ? 1 : 0,
            y: iy ? 1 : 0,
            z: iz ? 1 : 0
          };

          return anim8.computed.relative( parsed, mask );
        }

        return parsed;
      }
    }
    // If only a relative value is given it will modify the X, Y, & Z components evenly.
    if ( this.isRelative( x ) )
    {
      var rx = this.getRelativeAmount( x );

      if ( rx !== false )
      {
        return anim8.computed.relative( { x: rx, y: rx, z: rx } ); 
      }
    }
    
    // If no value was given but the default value was given, clone it.
    if ( anim8.isDefined( defaultValue ) )
    {
      return this.clone( defaultValue );      
    }
    
    return false;
  },
  copy: function(out, copy) 
  {
    out.x = copy.x;
    out.y = copy.y;
    out.z = copy.z;
    return out;
  },
  create: function() 
  {
    return {x: 0.0, y:0.0, z:0.0};
  },
  zero: function(out) 
  { 
    out.x = 0.0;
    out.y = 0.0;
    out.z = 0.0;
    return out;
  },
  adds: function(out, amount, amountScale) 
  {
    out.x += amount.x * amountScale;
    out.y += amount.y * amountScale;
    out.z += amount.z * amountScale;
    return out;
  },
  mul: function(out, scale) 
  {
    out.x *= scale.x;
    out.y *= scale.y;
    out.z *= scale.z;
    return out;
  },
  interpolate: function(out, start, end, delta) 
  {
    out.x = (end.x - start.x) * delta + start.x;
    out.y = (end.y - start.y) * delta + start.y;
    out.z = (end.z - start.z) * delta + start.z;
    return out;
  },
  distanceSq: function(a, b) 
  {
    var dx = a.x - b.x;
    var dy = a.y - b.y;   
    var dz = a.z - b.z; 
    return dx * dx + dy * dy + dz * dz;
  },
  isValid: function(a) 
  {
    return typeof a === 'object' && 'x' in a && 'y' in a && 'z' in a;
  },
  isNaN: function(a) 
  {
    return isNaN(a.x) || isNaN(a.y) || isNaN(a.z);
  },
  isZero: function(a, epsilon) 
  {
    return Math.abs(a.x) < epsilon && 
           Math.abs(a.y) < epsilon && Math.abs(a.z) < epsilon;
  },
  isEqual: function(a, b, epsilon) 
  {
    return Math.abs(a.x - b.x) < epsilon && 
           Math.abs(a.y - b.y) < epsilon && 
           Math.abs(a.z - b.z) < epsilon;
  },
  min: function(out, a, b)
  {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    out.z = Math.min(a.z, b.z);
    return out;
  },
  max: function(out, a, b)
  {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    out.z = Math.max(a.z, b.z);
    return out;
  },
  dot: function(a, b)
  {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  },
  random: function(out, min, max)
  {
    out.x = (max.x - min.x) * Math.random() + min.x;
    out.y = (max.y - min.y) * Math.random() + min.y;
    out.z = (max.z - min.z) * Math.random() + min.z;
    return out;
  }
});

/**
 * A calculator for 3d points; objects with x, y, & z Number components.
 *
 * @property {Calculator3d} 3d
 * @for anim8.calculator
 */
anim8.calculator['3d'] = new anim8.Calculator3d();


/**
 * A calculator for objects with an x, y, z, and angle components.
 *
 * @class CalculatorQuaternion
 * @constructor
 * @extends Calculator
 */
anim8.CalculatorQuaternion = function()
{
  this.createConstants();
};

anim8.override( anim8.CalculatorQuaternion.prototype = new anim8.Calculator(), 
{
  parse: function(x, defaultValue)
  {
    // Values computed live.
    if ( anim8.isFunction( x ) )
    {
      return x;
    }
    // Value computed from current value on animator.
    if ( x === true )
    {
      return anim8.computed.current;
    }
    // When only a number is given assume it's an angle around the Z-axis.
    if ( anim8.isNumber( x ) )
    {
      return {
        x: 0,
        y: 0,
        z: 1,
        angle: x
      };
    }
    // When an array is given, assume [x, y, z, angle]
    if ( anim8.isArray( x ) )
    {
      x = { x: x[0], y: x[1], z: x[2], angle: x[3] };
    }
    // When an object is given, check for relative values.
    if ( anim8.isObject( x ) )
    {
      var cx = anim8.coalesce( x.x, defaultValue.x );
      var cy = anim8.coalesce( x.y, defaultValue.y );
      var cz = anim8.coalesce( x.z, defaultValue.z );
      var ca = anim8.coalesce( x.angle, defaultValue.angle );
      var rx = this.getRelativeAmount( cx );
      var ry = this.getRelativeAmount( cy );
      var rz = this.getRelativeAmount( cz );
      var ra = this.getRelativeAmount( ca );

      if ( rx !== false && ry !== false && rz !== false && ra !== false )
      {
        var parsed = { x: rx, y: ry, z: rz, angle: ra };
        var ix = this.isRelative( cx );
        var iy = this.isRelative( cy );
        var iz = this.isRelative( cz );
        var ia = this.isRelative( ca );

        if ( ix || iy || iz || ia )
        {
          var mask = {
            x: ix ? 1 : 0,
            y: iy ? 1 : 0,
            z: iz ? 1 : 0,
            angle: ia ? 1 : 0
          };

          return anim8.computed.relative( parsed );
        }

        return parsed;
      }
    }
    // When a relative value is given, assume it's for an angle around the Z-axis.
    if ( this.isRelative( x ) )
    {
      var rx = this.getRelativeAmount( x );

      if ( rx !== false )
      {
        return anim8.computed.relative( { x:0, y:0, z:1, angle: rx }, { x:0, y:0, z:0, angle:1 } );
      }
    }
    
    // If no value was given but the default value was given, clone it.
    if ( anim8.isDefined( defaultValue ) )
    {
      return this.clone( defaultValue );      
    }
    
    return false;
  },
  copy: function(out, copy) 
  {
    out.x = copy.x;
    out.y = copy.y;
    out.z = copy.z;
    out.angle = copy.angle;
    return out;
  },
  create: function() 
  {
    return {x: 0.0, y:0.0, z:0.0, angle:0.0};
  },
  zero: function(out) 
  {
    out.x = 0.0;
    out.y = 0.0;
    out.z = 0.0;
    out.angle = 0.0;
    return out;
  },
  adds: function(out, amount, amountScale) 
  {
    out.x += amount.x * amountScale;
    out.y += amount.y * amountScale;
    out.z += amount.z * amountScale;
    out.angle += amount.angle * amountScale;
    return out;
  },
  mul: function(out, scale) 
  {
    out.x *= scale.x;
    out.y *= scale.y;
    out.z *= scale.z;
    out.angle *= scale.angle;
    return out;
  },
  interpolate: function(out, start, end, delta) 
  {
    out.x = (end.x - start.x) * delta + start.x;
    out.y = (end.y - start.y) * delta + start.y;
    out.z = (end.z - start.z) * delta + start.z;
    out.angle = (end.angle - start.angle) * delta + start.angle;
    return out;
  },
  distanceSq: function(a, b) 
  {
    var dx = a.x - b.x;
    var dy = a.y - b.y;   
    var dz = a.z - b.z; 
    var da = a.angle - b.angle;
    return dx * dx + dy * dy + dz * dz + da * da;
  },
  isValid: function(a) 
  {
    return typeof a === 'object' && 'x' in a && 'y' in a && 'z' in a && 'angle' in a;
  },
  isNaN: function(a) 
  {
    return isNaN(a.x) || isNaN(a.y) || isNaN(a.z) || isNaN(a.angle);
  },
  isZero: function(a, epsilon) 
  {
    return Math.abs(a.x) < epsilon && 
           Math.abs(a.y) < epsilon && 
           Math.abs(a.z) < epsilon && 
           Math.abs(a.angle) < epsilon;
  },
  isEqual: function(a, b, epsilon) 
  {
    return Math.abs(a.x - b.x) < epsilon && 
           Math.abs(a.y - b.y) < epsilon && 
           Math.abs(a.z - b.z) < epsilon && 
           Math.abs(a.angle - b.angle) < epsilon;
  },
  min: function(out, a, b)
  {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    out.z = Math.min(a.z, b.z);
    out.angle = Math.min(a.angle, b.angle);
    return out;
  },
  max: function(out, a, b)
  {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    out.z = Math.max(a.z, b.z);
    out.angle = Math.max(a.angle, b.angle);
    return out;
  },
  dot: function(a, b)
  {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.angle * b.angle;
  },
  random: function(out, min, max)
  {
    out.x = (max.x - min.x) * Math.random() + min.x;
    out.y = (max.y - min.y) * Math.random() + min.y;
    out.z = (max.z - min.z) * Math.random() + min.z;
    out.angle = (max.angle - min.angle) * Math.random() + min.angle;
    return out;
  }
});

/**
 * A calculator for quaternions; objects with x, y, z, & angle Number components.
 *
 * @property {CalculatorQuaternion} quaternion
 * @for anim8.calculator
 */
anim8.calculator['quaternion'] = new anim8.CalculatorQuaternion();


/**
 * A calculator for objects with r, g, & b components (numbers 0 -> 255)
 *
 * @class CalculatorRGB
 * @constructor
 * @extends Calculator
 */
anim8.CalculatorRGB = function()
{
  this.createConstants();
};

anim8.override( anim8.CalculatorRGB.prototype = new anim8.Calculator(), 
{
  parse: function(x, defaultValue)
  {
    // Values computed live.
    if ( anim8.isFunction( x ) )
    {
      return x;
    }
    // Value computed from current value on animator.
    if ( x === true )
    {
      return anim8.computed.current;
    }
    // When a number is given a grayscale color is returned.
    if ( anim8.isNumber( x ) )
    {
      return {
        r: x,
        g: x,
        b: x
      };
    }
    // When an array is given, assume [r, g, b]
    if ( anim8.isArray( x ) )
    {
      x = { r: x[0], g: x[1], b: x[2] };
    }
    // When an object is given, check for relative values.
    if ( anim8.isObject( x ) )
    {
      var cr = anim8.coalesce( x.r, defaultValue.r );
      var cg = anim8.coalesce( x.g, defaultValue.g );
      var cb = anim8.coalesce( x.b, defaultValue.b );
      var rr = this.getRelativeAmount( cr );
      var rg = this.getRelativeAmount( cg );
      var rb = this.getRelativeAmount( cb );

      if ( rr !== false && rg !== false && rb !== false )
      {
        var parsed = { r: rr, g: rg, b: rb };
        var ir = this.isRelative( cr );
        var ig = this.isRelative( cg );
        var ib = this.isRelative( cb );

        if ( ir || ig || ib )
        {
          var mask = {
            r: ir ? 1 : 0,
            g: ig ? 1 : 0,
            b: ib ? 1 : 0
          };

          return anim8.computed.relative( parsed, mask );
        }

        return parsed;
      }
    }
    // If only a relative value is given it will modify the R, G, & B components.
    if ( this.isRelative( x ) )
    {
      var rx = this.getRelativeAmount( x );

      if ( rx !== false )
      {
        return anim8.computed.relative( { r: rx, g: rx, b: rx } ); 
      }
    }
    
    // Try to parse the color.
    var parsed = anim8.color.parse( x );

    if ( parsed !== false )
    {
      return parsed;
    }
    
    // If no value was given but the default value was given, clone it.
    if ( anim8.isDefined( defaultValue ) )
    {
      return this.clone( defaultValue );      
    }
    
    return false;    
  },
  copy: function(out, copy) 
  {
    out.r = copy.r;
    out.g = copy.g;
    out.b = copy.b;
    return out;
  },
  create: function() 
  {
    return {r: 0, g:0, b:0};
  },
  zero: function(out) 
  {
    out.r = 0;
    out.g = 0;
    out.b = 0;
    return out;
  },
  adds: function(out, amount, amountScale) 
  {
    out.r += amount.r * amountScale;
    out.g += amount.g * amountScale;
    out.b += amount.b * amountScale;
    return out;
  },
  mul: function(out, scale) 
  {
    out.r *= scale.r;
    out.g *= scale.g;
    out.b *= scale.b;
    return out;
  },
  interpolate: function(out, start, end, delta) 
  {
    out.r = (end.r - start.r) * delta + start.r;
    out.g = (end.g - start.g) * delta + start.g;
    out.b = (end.b - start.b) * delta + start.b;
    return out;
  },
  distanceSq: function(a, b) 
  {
    var dr = a.r - b.r;
    var dg = a.g - b.g;    
    var db = a.b - b.b;    
    return dr * dr + dg * dg + db * db;
  },
  isValid: function(a) 
  {
    return anim8.isObject( a ) && 'r' in a && 'g' in a && 'b' in a;
  },
  isNaN: function(a) 
  {
    return isNaN(a.r) || isNaN(a.g) || isNaN(a.b);
  },
  isZero: function(a, epsilon) 
  {
    return Math.abs(a.r) < epsilon && 
           Math.abs(a.g) < epsilon && 
           Math.abs(a.b) < epsilon;
  },
  isEqual: function(a, b, epsilon) 
  {
    return Math.abs(a.r - b.r) < epsilon && 
           Math.abs(a.g - b.g) < epsilon && 
           Math.abs(a.b - b.b) < epsilon;
  },
  min: function(out, a, b)
  {
    out.r = Math.min(a.r, b.r);
    out.g = Math.min(a.g, b.g);
    out.b = Math.min(a.b, b.b);
    return out;
  },
  max: function(out, a, b)
  {
    out.r = Math.max(a.r, b.r);
    out.g = Math.max(a.g, b.g);
    out.b = Math.max(a.b, b.b);
    return out;
  },
  dot: function(a, b)
  {
    return a.r * b.r + a.g * b.g + a.b * b.b;
  },
  random: function(out, min, max)
  {
    out.r = (max.r - min.r) * Math.random() + min.r;
    out.g = (max.g - min.g) * Math.random() + min.g;
    out.b = (max.b - min.b) * Math.random() + min.b;
    return out;
  }
});

/**
 * A calculator for opaque colors; objects with r, g, & b Number components.
 *
 * @property {CalculatorRGB} rgb
 * @for anim8.calculator
 */
anim8.calculator['rgb'] = new anim8.CalculatorRGB();


/**
 * A calculator for objects with r, g, & b components 
 * (numbers 0 -> 255) and an a (alpha) component (0.0 -> 1.0).
 *
 * @class CalculatorRGBA
 * @constructor
 * @extends Calculator
 */
anim8.CalculatorRGBA = function()
{
  this.createConstants();
};

anim8.override( anim8.CalculatorRGBA.prototype = new anim8.Calculator(), 
{
  parse: function(x, defaultValue)
  {
    // Values computed live.
    if ( anim8.isFunction( x ) )
    {
      return x;
    }
    // Value computed from current value on animator.
    if ( x === true )
    {
      return anim8.computed.current;
    }
    // When a number is given an opaque grayscale color is returned.
    if ( anim8.isNumber( x ) )
    {
      return {
        r: x,
        g: x,
        b: x,
        a: 1.0
      };
    }
    // When an array is given, assume [r, g, b, a]
    if ( anim8.isArray( x ) )
    {
      x = { r: x[0], g: x[1], b: x[2], a: x[3] };
    }
    // When an object is given, check for relative values.
    if ( anim8.isObject( x ) )
    {
      var cr = anim8.coalesce( x.r, defaultValue.r );
      var cg = anim8.coalesce( x.g, defaultValue.g );
      var cb = anim8.coalesce( x.b, defaultValue.b );
      var ca = anim8.coalesce( x.a, defaultValue.a );
      var rr = this.getRelativeAmount( cr );
      var rg = this.getRelativeAmount( cg );
      var rb = this.getRelativeAmount( cb );
      var ra = this.getRelativeAmount( ca );

      if ( rr !== false && rg !== false && rb !== false && ra !== false )
      {
        var parsed = { r: rr, g: rg, b: rb, a: ra };
        var ir = this.isRelative( cr );
        var ig = this.isRelative( cg );
        var ib = this.isRelative( cb );
        var ia = this.isRelative( ca );

        if ( ir || ig || ib || ia )
        {
          var mask = {
            r: ir ? 1 : 0,
            g: ig ? 1 : 0,
            b: ib ? 1 : 0,
            a: ia ? 1 : 0
          };

          return anim8.computed.relative( parsed, mask );
        }

        return parsed;
      }
    }
    // If only a relative value is given it will modify the R, G, & B components.
    if ( this.isRelative( x ) )
    {
      var rx = this.getRelativeAmount( x );

      if ( rx !== false )
      {
        return anim8.computed.relative( { r: rx, g: rx, b: rx, a: 0 } ); 
      }
    }
    
    // Try to parse the color.
    var parsed = anim8.color.parse( x );

    if ( parsed !== false )
    {
      return parsed;
    }
    
    // If no value was given but the default value was given, clone it.
    if ( anim8.isDefined( defaultValue ) )
    {
      return this.clone( defaultValue );      
    }
    
    return false;  
  },
  copy: function(out, copy) 
  {
    out.r = copy.r;
    out.g = copy.g;
    out.b = copy.b;
    out.a = copy.a;
    return out;
  },
  create: function() 
  {
    return {r: 0, g:0, b:0, a:0};
  },
  zero: function(out) 
  {
    out.r = 0;
    out.g = 0;
    out.b = 0;
    out.a = 0;
    return out;
  },
  adds: function(out, amount, amountScale) 
  {
    out.r += amount.r * amountScale;
    out.g += amount.g * amountScale;
    out.b += amount.b * amountScale;
    out.a += amount.a * amountScale;
    return out;
  },
  mul: function(out, scale) 
  {
    out.r *= scale.r;
    out.g *= scale.g;
    out.b *= scale.b;
    out.a *= scale.a;
    return out;
  },
  interpolate: function(out, start, end, delta) 
  {
    out.r = (end.r - start.r) * delta + start.r;
    out.g = (end.g - start.g) * delta + start.g;
    out.b = (end.b - start.b) * delta + start.b;
    out.a = (end.a - start.a) * delta + start.a;
    return out;
  },
  distanceSq: function(a, b) 
  {
    var dr = a.r - b.r;
    var dg = a.g - b.g;    
    var db = a.b - b.b;    
    var da = a.a - b.a;    
    return dr * dr + dg * dg + db * db + da * da;
  },
  isValid: function(a) 
  {
    return anim8.isObject( a ) && 'r' in a && 'g' in a && 'b' in a && 'a' in a;
  },
  isNaN: function(a) 
  {
    return isNaN(a.r) || isNaN(a.g) || isNaN(a.b) || isNaN(a.a);
  },
  isZero: function(a, epsilon) 
  {
    return Math.abs(a.r) < epsilon && 
           Math.abs(a.g) < epsilon && 
           Math.abs(a.b) < epsilon && 
           Math.abs(a.a) < epsilon;
  },
  isEqual: function(a, b, epsilon) 
  {
    return Math.abs(a.r - b.r) < epsilon && 
           Math.abs(a.g - b.g) < epsilon && 
           Math.abs(a.b - b.b) < epsilon && 
           Math.abs(a.a - b.a) < epsilon;
  },
  min: function(out, a, b)
  {
    out.r = Math.min(a.r, b.r);
    out.g = Math.min(a.g, b.g);
    out.b = Math.min(a.b, b.b);
    out.a = Math.min(a.a, b.a);
    return out;
  },
  max: function(out, a, b)
  {
    out.r = Math.max(a.r, b.r);
    out.g = Math.max(a.g, b.g);
    out.b = Math.max(a.b, b.b);
    out.a = Math.max(a.a, b.a);
    return out;
  },
  dot: function(a, b)
  {
    return a.r * b.r + a.g * b.g + a.b * b.b + a.a * b.a;
  },
  random: function(out, min, max)
  {
    out.r = (max.r - min.r) * Math.random() + min.r;
    out.g = (max.g - min.g) * Math.random() + min.g;
    out.b = (max.b - min.b) * Math.random() + min.b;
    out.a = (max.a - min.a) * Math.random() + min.a;
    return out;
  }
});

/**
 * A calculator for colors; objects with r, g, b, & a Number components.
 *
 * @property {CalculatorRGBA} rgba
 * @for anim8.calculator
 */
anim8.calculator['rgba'] = new anim8.CalculatorRGBA();


/**
 * Parses a path given the input and returns an instance of anim8.Path or throws
 * an error if the path could not be parsed. If the input is an object and has
 * a type property with a value that maps to a path type the path's parsing
 * function is invoked with the object.
 *
 * @method anim8.path
 * @for Core
 * @param  {anim8.Path|String|Object} path
 * @return {anim8.Path}
 * @throws {String} If the input is not a valid path.
 */
anim8.path = function(path)
{
  if ( path instanceof anim8.Path )
  {
    return path;
  }
  if ( anim8.isString( path ) && path in anim8.path )
  {
    return anim8.path[ spring ];
  }
  if ( anim8.isObject( path ) && path.type in anim8.path )
  {
    return anim8.path[ path.type ]( path );
  }
  
  throw path + ' is not a valid path';
};

/**
 * Path class computes a value given a delta value [0, 1].
 *
 * @class Path
 * @constructor
 */
anim8.Path = function()
{
};

anim8.Path.prototype = 
{
  /**
   * Resets the path with the given name, calculator, and points.
   * 
   * @method reset
   * @param {String|false} name
   * @param {anim8.Calculator} calculator
   * @param {Array} points
   */
  reset: function(name, calculator, points)
  {
    this.name = name;
    this.calculator = anim8.calculator( calculator );
    this.points = points;
    this.computed = this.hasComputed();
  },

  /**
   * Computes a value at the given delta setting and returning out.
   * 
   * @method compute
   * @param {T} out
   * @param {Number} delta
   * @return {T}
   */
  compute: function(out, delta) 
  {
    throw 'Path.compute not implemented';
  },

  /**
   * Determines if this path has at least one computed value.
   *
   * **See:** {{#crossLink "anim8.computed"}}{{/crossLink}}
   * 
   * @method reset
   * @return {Boolean}
   */
  hasComputed: function() 
  {
    var ps = this.points;
    
    for (var i = 0; i < ps.length; i++) 
    {
      if ( anim8.isComputed( ps[i] ) )
      {
        return true;
      }
    }

    return false;
  },

  /**
   * Replaces any computed values in this path with the result from invoking
   * the function and returns a clone of this path.
   * 
   * @method replaceComputed
   * @return {anim8.Path}
   */
  replaceComputed: function(event, animator)
  {
    var clone = this.copy();
    var ps = clone.points;

    for (var i = 0; i < ps.length; i++)
    {
      if ( anim8.isComputed( ps[i] ) )
      {
        ps[i] = ps[i]( event, animator );
      }
    }
    
    return clone;
  },

  /**
   * Resolves and returns the point at the given index.
   * 
   * @method resolvePoint
   * @param {Number} i
   * @return {T}
   */
  resolvePoint: function(i)
  {
    return anim8.resolve( this.points[ i ] );
  },

  /**
   * Returns whether the path is linear. Linear paths go directly from point to
   * point where curved paths do not. Linear paths can have their length 
   * calculated fairly easily however curves you must compute length with a 
   * given granularity.
   * 
   * @method isLinear
   * @return {Boolean}
   */
  isLinear: function()
  {
    return true;
  },

  /**
   * Computes the length of the Path with a given granularity. Granularity is 
   * used for non-linear paths - it's the number of segments are calculated on 
   * the path where the length of the segments are summed and returned as the 
   * length.
   * 
   * @method length
   * @param {Number} granularity
   * @return {Number}
   */
  length: function(granularity)
  {
    var distance = 0;
    var calc = this.calculator;

    if ( this.isLinear() )
    {
      var prev = this.resolvePoint( 0 );

      for (var i = 1; i < this.points.length; i++)
      {
        var next = this.resolvePoint( i );

        distance += calc.distance( prev, next );

        prev = next;
      }
    }
    else
    {
      var deltadelta = 1.0 / granularity;
      var delta = delta;
      var prev = calc.clone( this.resolvePoint( 0 ) );
      var temp = calc.create();

      for (var i = 1; i <= granularity; i++)
      {
        var next = this.compute( temp, delta );

        distance += calc.distance( prev, next );

        temp = prev;
        prev = next;
      }
    }

    return distance;
  }

};


/**
 * Instantiates a new Tween.
 * 
 * @param {String|false} name
 * @param {Calculator} calculator
 * @param {T} start
 * @param {T} end
 * @class Tween
 * @constructor
 * @extends Path
 */
anim8.Tween = function(name, calculator, start, end)
{
  this.reset( name, calculator, [ start, end ] );
};

anim8.override( anim8.Tween.prototype = new anim8.Path(),
{
  compute: function(out, delta)
  {
    return this.calculator.interpolate( out, this.resolvePoint( 0 ), this.resolvePoint( 1 ), delta );
  },
  copy: function() 
  {
    return new anim8.Tween( this.name, this.calculator, this.points[0], this.points[1] );
  }
});


/**
 * Parses an object for a tween path.
 * 
 * @param {Object} path
 * @return {Tween}
 */
anim8.path['tween'] = function(path)
{
  var calc = anim8.calculator( path.calculator );
  
  return new anim8.Tween(
    path.name, 
    calc,
    calc.parse( path.start, calc.ZERO ),
    calc.parse( path.end, calc.ZERO )
  );
};


/**
 * Instantiates a new PathCubic.
 * 
 * @param {String|false} name
 * @param {Calculator} calculator
 * @param {T} p0
 * @param {T} p1
 * @param {T} p2
 * @param {T} p3
 * @class PathCubic
 * @constructor
 * @extends Path
 */
anim8.PathCubic = function(name, calculator, p0, p1, p2, p3)
{
  this.reset( name, calculator, [p0, p1, p2, p3] );
};

anim8.override( anim8.PathCubic.prototype = new anim8.Path(),
{
  compute: function(out, d1)
  {
    var calc = this.calculator;
    var d2 = d1 * d1;
    var d3 = d1 * d2;
    var i1 = 1 - d1;
    var i2 = i1 * i1;
    var i3 = i1 * i2;
    
    out = calc.copy( out, this.resolvePoint( 0 ) );
    out = calc.scale( out, i3 );
    out = calc.adds( out, this.resolvePoint( 1 ), 3 * i2 * d1 );
    out = calc.adds( out, this.resolvePoint( 2 ), 3 * i1 * d2 );
    out = calc.adds( out, this.resolvePoint( 3 ), d3 );
    
    return out;
  },
  copy: function() 
  {
    return new anim8.PathCubic( this.name, this.calculator, this.points[0], this.points[1], this.points[2], this.points[3] );
  },
  isLinear: function()
  {
    return false;
  }
});

/**
 * Parses an object for a cubic path.
 * 
 * @param {Object} path
 * @return {PathCubic}
 */
anim8.path['cubic'] = function(path)
{
  var calc = anim8.calculator( path.calculator );
  
  return new anim8.PathCubic(
    path.name,
    calc,
    calc.parse( path.p0 ),
    calc.parse( path.p1 ),
    calc.parse( path.p2 ),
    calc.parse( path.p3 )
  );
};


/**
 * Instantiates a new PathQuadratic.
 * 
 * @param {String|false} name
 * @param {Calculator} calculator
 * @param {T} p0
 * @param {T} p1
 * @param {T} p2
 * @class PathQuadratic
 * @constructor
 * @extends Path
 */
anim8.PathQuadratic = function(name, calculator, p0, p1, p2)
{
  this.reset( name, calculator, [p0, p1, p2] );
};

anim8.override( anim8.PathQuadratic.prototype = new anim8.Path(),
{
  compute: function(out, d1)
  {
    var calc = this.calculator;
    var d2 = d1 * d1;
    var i1 = 1 - d1;
    var i2 = i1 * i1;
    
    out = calc.copy( out, this.resolvePoint( 0 ) );
    out = calc.scale( out, i2 );
    out = calc.adds( out, this.resolvePoint( 1 ), 2 * i1 * d1 );
    out = calc.adds( out, this.resolvePoint( 2 ), d2 );
      
    return out;
  },
  copy: function() 
  {
    return new anim8.PathQuadratic( this.name, this.calculator, this.points[0], this.points[1], this.points[2] );
  },
  isLinear: function()
  {
    return false;
  }
});


/**
 * Parses an object for a quadratic path.
 * 
 * @param {Object} path
 * @return {PathQuadratic}
 */
anim8.path['quadratic'] = function(path)
{
  var calc = anim8.calculator( path.calculator );
  
  return new anim8.PathQuadratic(
    path.name,
    calc,
    calc.parse( path.p0 ),
    calc.parse( path.p1 ),
    calc.parse( path.p2 )
  );
};


/**
 * Instantiates a new PathDelta.
 * 
 * @param {String|false} name
 * @param {Calculator} calculator
 * @param {Array} points
 * @param {Array} deltas
 * @class PathDelta
 * @constructor
 * @extends Path
 */
anim8.PathDelta = function(name, calculator, points, deltas) 
{
  this.reset( name, calculator, points );
  this.deltas = deltas;
};

anim8.override( anim8.PathDelta.prototype = new anim8.Path(),
{
  compute: function(out, delta) 
  {
    var ds = this.deltas;
    var end = ds.length - 2;
    var i = 0;
    while (ds[i + 1] < delta && i < end) i++;
    var d0 = ds[i];
    var d1 = ds[i + 1];
    var pd = (delta - d0) / (d1 - d0);
    var p0 = this.resolvePoint( i );
    var p1 = this.resolvePoint( i + 1 );
    
    return this.calculator.interpolate( out, p0, p1, pd );
  },
  copy: function() 
  {
    return new anim8.PathDelta( this.name, anim8.copy(this.points), anim8.copy(this.deltas), this.calculator );
  }
});

/**
 * Parses an object for a delta path.
 * 
 * @param {Object} path
 * @return {PathDelta}
 */
anim8.path['delta'] = function(path)
{
  var calc = anim8.calculator( path.calculator );
  
  if (!path.deltas)
  {
    path.deltas = [];
    
    for (var i = 0; i < path.points.length; i++)
    {
      path.deltas[ i ] = i / ( path.points.length - 1 );
    }
  }

  for (var i = 0; i < path.points.length; i++)
  {
    path.points[ i ] = calc.parse( path.points[i] );
  }
  
  return new anim8.PathDelta(
    path.name,
    calc,
    path.points,
    path.deltas
  );
};


/**
 * Instantiates a new PathJump.
 * 
 * @param {String|false} name
 * @param {Calculator} calculator
 * @param {Array} points
 * @class PathJump
 * @constructor
 * @extends Path
 */
anim8.PathJump = function(name, calculator, points)
{
  this.reset( name, calculator, points );
};

anim8.override( anim8.PathJump.prototype = new anim8.Path(),
{
  compute: function(out, delta)
  {
    var a = Math.floor( delta * this.points.length );
    var index = Math.min( a, this.points.length - 1 );
    
    return this.calculator.copy( out, this.resolvePoint( index ) );
  },
  copy: function() 
  {
    return new anim8.PathJump( this.name, this.calculator, anim8.copy(this.points) );
  }
});

/**
 * Parses an object for a jump path.
 * 
 * @param {Object} path
 * @return {PathJump}
 */
anim8.path['jump'] = function(path)
{
  var calc = anim8.calculator( path.calculator );
  
  for (var i = 0; i < path.points.length; i++)
  {
    path.points[ i ] = calc.parse( path.points[i] );
  }
  
  return new anim8.PathJump(
    path.name, 
    calc,
    path.points
  );
};



/**
 * Instantiates a new PathCompiled.
 * 
 * @param {String|false} name
 * @param {Path} path
 * @param {Number} pointCount
 * @class PathCompiled
 * @constructor
 * @extends Path
 */
anim8.PathCompiled = function(name, path, pointCount)
{
  var calc = path.calculator;
  var points = [];
  
  for (var i = 0; i < pointCount; i++)
  {
    points.push( path.compute( calc.create(), i / (pointCount - 1) ) );
  }
  
  this.reset( name, calc, points );
};

anim8.override( anim8.PathCompiled.prototype = new anim8.Path(),
{
  compute: function(out, delta)
  {
    var a = Math.floor( delta * this.points.length );
    var index = Math.min( a, this.points.length - 1 );
    
    return this.calculator.copy( out, this.resolvePoint( index ) );
  },
  copy: function() 
  {
    return new anim8.PathCompiled( this.name, this, this.points.length );
  }
});

/**
 * Parses an object for a compiled path.
 * 
 * @param {Object} path
 * @return {PathCompiled}
 */
anim8.path['compiled'] = function(path)
{
  return new anim8.PathCompiled(
    path.name,
    anim8.path( path.path ),
    path.pointCount
  );
};


/**
 * Instantiates a new PathKeyframe.
 * 
 * @param {String|false} name
 * @param {Calculator} calculator
 * @param {Array} points
 * @param {Array} deltas
 * @param {Array} easings
 * @class PathKeyframe
 * @constructor
 * @extends Path
 */
anim8.PathKeyframe = function(name, calculator, points, deltas, easings) 
{
  this.reset( name, calculator, points );
  this.deltas = deltas;
  this.easings = easings;
};

anim8.override( anim8.PathKeyframe.prototype = new anim8.Path(),
{
  compute: function(out, delta) 
  {  
    var ds = this.deltas;
    var end = ds.length - 2;
    
    if ( delta < ds[0] ) {
      return false;
    }
    
    if ( delta > ds[ds.length - 1] ) {
      return this.points[ds.length - 1];
    }
    
    var i = 0;
    while (ds[i + 1] < delta && i < end) i++;
    var d0 = ds[i];
    var d1 = ds[i + 1];
    var pd = (delta - d0) / (d1 - d0);
    var p0 = this.resolvePoint( i );
    var p1 = this.resolvePoint( i + 1 );
    var ea = this.easings[i];
    
    return this.calculator.interpolate( out, p0, p1, ea( pd ) );
  },
  copy: function() 
  {
    return new anim8.PathKeyframe( this.name, this.calculator, anim8.copy(this.points), anim8.copy(this.deltas), anim8.copy(this.easings) );
  }
});

/**
 * Parses an object for a keyframe path.
 * 
 * @param {Object} path
 * @return {PathKeyframe}
 */
anim8.path['keyframe'] = function(point)
{
  var calc = anim8.calculator( path.calculator );
  
  if (!path.deltas)
  {
    path.deltas = [];
    
    for (var i = 0; i < path.points.length; i++)
    {
      path.deltas[ i ] = i / ( path.points.length - 1 );
    }
  }
  
  var defaultEasing = anim8.easing( path.easings, null );
  
  if ( !anim8.isDefined( path.easings ) || !anim8.isArray( path.easings ) || defaultEasing !== null )
  {
    path.easings = [];
    
    for (var i = 0; i < path.points.length; i++)
    {
      path.easings[ i ] = defaultEasing;
    }
  }
  
  for (var i = 0; i < path.easings.length; i++)
  {
    path.easings[ i ] = anim8.easing( path.easings[ i ] );
  }
  
  for (var i = 0; i < path.points.length; i++)
  {
    path.points[ i ] = calc.parse( path.points[i] );
  }
  
  return new anim8.PathKeyframe(
    path.name,
    calc,
    path.points,
    path.deltas,
    path.easings
  );
};


/**
 * Instantiates a new PathPoint.
 * 
 * @param {String|false} name
 * @param {Calculator} calculator
 * @param {T} point
 * @class PathPoint
 * @constructor
 * @extends Path
 */
anim8.PathPoint = function(name, calculator, point)
{
  this.reset( name, calculator, [point] );
};

anim8.override( anim8.PathPoint.prototype = new anim8.Path(),
{
  compute: function(out, delta)
  {
    return this.calculator.copy( out, this.resolvePoint( 0 ) );
  },
  copy: function() 
  {
    return new anim8.PathPoint( this.name, this.calculator, this.points[0] );
  }
});


/**
 * Parses an object for a point path.
 * 
 * @param {Object} path
 * @return {PathPoint}
 */
anim8.path['point'] = function(path)
{
  var calc = anim8.calculator( path.calculator );
  
  return new anim8.PathPoint(
    path.name,
    calc,
    calc.parse( path.point )
  );
};


/**
 * Animates a single attribute over any period of time.
 *
 * @class Attrimator
 * @constructor
 */
anim8.Attrimator = function()
{

};

anim8.Attrimator.prototype =
{

  /**
   * Resets this attrimator for the given attribute created by the given parser.
   *
   * @method reset
   * @param {String} attribute
   * @param {Parser} parser
   * @param {Attrimator} [next]
   */
  reset: function(attribute, parser, next)
  {
    /**
     * The name of the attribute this attrimator is animating.
     * 
     * @property {String} attribute
     */
    this.attribute = attribute;

    /**
     * The parser that created this attrimator (if any).
     * 
     * @property {Parser} parser
     */
    this.parser = parser;

    /**
     * The next attrimator to be played once this one has finished.
     * 
     * @property {Attrimator} next
     */
    this.next = next;

    /**
     * The time the attrimator was started by the animator.
     * 
     * @property {Number} startTime
     */
    this.startTime = 0;

    /**
     * The time the attrimator was last paused.
     * 
     * @property {Number} pauseTime
     */
    this.pauseTime = 0;

    /**
     * The amount of time that has elapsed since the attrimator started.
     * 
     * @property {Number} elapsed
     */
    this.elapsed = 0;

    /**
     * The time this attrimator should stop itself after it started in milliseconds.
     * 
     * @property {Number} stopTime
     */
    this.stopTime = Number.POSITIVE_INFINITY;

    /**
     * Whether or not the attrimator is paused.
     * 
     * @property {Boolean} paused
     */
    this.paused = false;

    /**
     * The cycle this attrimator belongs to.
     * 
     * @type {Number} cycle
     */
    this.cycle = 0;

    /**
     * The amount of time in milliseconds this attrimator is delayed since start.
     * 
     * @property {Number} delay
     */
    this.delay = 0;

    /**
     * The initial elapsed time in milliseconds when the attrimator is started.
     * 
     * @property {Number} offset
     */
    this.offset = 0;
  },

  /**
   * Prepares this attrimator for animation on the given subject 
   * animator. This is called once in anim8.Animator.preupdate before the first 
   * time this attrimator is updated.
   *
   * @method start
   * @param {Number} now
   * @param {Animator} animator
   */
  start: function(now, animator)
  {
    this.startTime = now - this.offset;
    this.elapsed = this.offset;
    this.finished = false;
  },

  /**
   * Invoked once when a new animation cycle is started on an Animator. If this
   * attrimator updated the frame true must be returned.
   *
   * @method startCycle
   * @param {Object} frame
   * @return {Boolean}
   */
  startCycle: function(frame)
  {
    return false;
  },

  /**
   * Updates this attrimator given a time to animate to and the frame to
   * provide with a new value. This method will return true if the attribute
   * this is animating has been updated and needs to be applied to the subject.
   *
   * @method setTime
   * @param {Number} now
   * @param {Object} frame
   * @return {Boolean}
   */
  setTime: function(now, frame)
  {
    if ( this.paused )
    {
      return false;
    }

    var updated = false;
    var elapsed = now - this.startTime;
    var updated = false;

    if ( elapsed > this.stopTime )
    {
      updated = this.finish( frame );
    }
    else if ( elapsed >= this.delay )
    {
      updated = this.update( elapsed, frame );
    }

    this.elapsed = elapsed;

    return updated;
  },

  /**
   * Updates the attrimator given elapsed time in milliseconds, the frame to 
   * apply a value to, and returns whether the frame was updated or not.
   *
   * @method update
   * @param {Number} elapsed
   * @param {Object} frame
   * @return {Boolean}
   */
  update: function(elapsed, frame)
  {
    throw 'Attrimator.update not implemented';
  },

  /**
   * Returns the amount of time that has elapsed in milliseconds.
   *
   * @method getElapsed
   * @return {Number}
   */
  getElapsed: function()
  {
    return this.elapsed;
  },

  /**
   * Stops this attrimator in the given number of milliseconds.
   *
   * @method stopIn
   * @param {Number} milliseconds
   * @chainable
   */
  stopIn: function(milliseconds)
  {
    this.stopTime = this.getElapsed() + milliseconds;

    return this;
  },

  /**
   * If this attrimator repeats its animation this method will stop repitition
   * after the next animation cycle.
   * 
   * @chainable
   */
  nopeat: function()
  {
    return this;
  },

  /**
   * Returns the value at the given time or returns false if it can't be
   * calculated.
   *
   * @method valueAt
   * @param {Number} time
   * @param {Any} out
   * @return {Any|False}
   */
  valueAt: function(time, out)
  {
    return false;
  },

  /**
   * The total amount of time this attrimator will take in milliseconds. This 
   * may be an infinite number.
   *
   * @method totalTime
   * @return {Number}
   */
  totalTime: function()
  {
    return this.stopTime;
  },

  /**
   * The time remaining before this attrimator and any following will be 
   * finished.
   *
   * @method timeRemaining
   * @return {Number}
   */
  timeRemaining: function() 
  {    
    return this.totalTime() - this.elapsed + ( this.next ? this.next.timeRemaining() : 0 );
  },

  /**
   * Clones this attrimator.
   *
   * @method clone
   * @return {Attrimator}
   */
  clone: function()
  {
    throw 'AttributeAnimator.clone not implemented';
  },

  /**
   * Returns whether this attrimator has computed values which need to be 
   * resolved by the subject animator calling prepare on this attrimator.
   *
   * @method hasComputed
   * @return {Boolean}
   */
  hasComputed: function()
  {
    return false;
  },

  /**
   * Determines whether this attrimator will run infinitely.
   *
   * @method isInfinite
   * @return {Boolean}
   */
  isInfinite: function()
  {
    return (this.stopTime === Number.POSITIVE_INFINITY);
  },

  /**
   * Pauses this attrimator if it isn't already paused.
   *
   * @method pause
   * @chainable
   */
  pause: function()
  {
    if ( !this.paused )
    {
      this.pauseTime = anim8.now();
      this.paused = true;
    }

    return this;
  },

  /**
   * Resumes this attrimator if it's paused. This involves resetting the start
   * time of the attrimator.
   *
   * @method resume
   * @chainable
   */
  resume: function()
  {
    if ( this.paused )
    {
      this.startTime += anim8.now() - this.pauseTime;
      this.paused = false;
    }

    return this;
  },

  /**
   * Whether this attrimator is paused.
   *
   * @method isPaused
   * @return {Boolean}
   */
  isPaused: function()
  {
    return this.paused;
  },

  /**
   * Sets the final state of the attrimator to the frame if one exists and 
   * returns true, otherwise false is returned and frame remains unchanged.
   *
   * @method finish
   * @param {Object} frame
   * @return {Boolean}
   */
  finish: function(frame)
  {
    return false;
  },

  /**
   * Whether this attrimator is finished.
   *
   * @method isFinished
   * @return {Boolean}
   */
  isFinished: function()
  {
    return false;
  },

  /**
   * Returns the parser that created this attrimator (if any).
   *
   * @method getParser
   * @return {Parser}
   */
  getParser: function()
  {
    return this.parser;
  },

  /**
   * Places the given attrimator on the end of the chain of attrimators starting
   * with this attrimator.
   *
   * @method queue
   * @param {Attrimator} next
   * @chainable
   */
  queue: function(next)
  {
    if ( this.next )
    {
      this.next.queue( next );
    }
    else
    {
      this.next = next;
    }

    return this;
  },

  /**
   * Parses a value with the calculator given a default value to fallback on.
   *
   * @method parseValue
   * @param {Animator} animator
   * @param {T|Function|True} value
   * @param {T} defaultValue
   * @return {T|Function}
   */
  parseValue: function(animator, value, defaultValue)
  {
    var parsed = this.calculator.parse( value, defaultValue );

    if ( anim8.isComputed( parsed ) )
    {
       parsed = parsed( this, animator );
    }

    return parsed;
  }

};

/**
 * A map of attrimators by their attribute name.
 *
 * @class AttrimatorMap
 * @constructor
 * @extends FastMap
 */
anim8.AttrimatorMap = function()
{
  this.reset();
};

anim8.override( anim8.AttrimatorMap.prototype = new anim8.FastMap(),
{

  /**
   * Queues the attrimator on this map. If the attribute is already on this map
   * this is placed on the end of the Attrimator chain, otherwise the attrimator
   * is added to the map. If there is an attrimator already on the map it's
   * returned.
   *
   * @method queue
   * @param {Attrimator} attrimator
   * @return {Attrimator}
   */
  queue: function(attrimator)
  {
    var attr = attrimator.attribute;
    var current = this.get( attr );

    if ( current )
    {
      current.queue( attrimator );
    }
    else
    {
      this.put( attr, attrimator );
    }

    return current;
  },

  /**
   * Queues the given map to this map. The attrimators placed on this map are
   * queued and delayed in a way that they all start at the same time. If a
   * function is provided as the second argument it is invoked whenever an 
   * attrimator in the given map is new & added to this map.
   *
   * @method queueMap
   * @param {AttrimatorMap} map
   * @param {Function} [onNewAttribute]
   * @param {Object} [context]
   * @chainable
   */
  queueMap: function(map, onNewAttribute, context)
  {
    var maxRemaining = this.timeRemaining();
    var attrimators = map.values;
    
    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      var attrimator = attrimators[ i ];
      var attr = attrimator.attribute;
      var existing = this.get( attr );

      if ( existing )
      {
        if ( existing.isInfinite() )
        {
          existing.stopIn( attrimator.delay + maxRemaining );
        }
        else
        {
          attrimator.delay += (maxRemaining - existing.timeRemaining());
        }

        existing.queue( attrimator );
      }
      else
      {
        attrimator.delay += maxRemaining;

        this.put( attr, attrimator );

        if ( anim8.isFunction( onNewAttribute ) )
        {
          onNewAttribute.call( context || this, attrimator );
        }
      }
    }
    
    return this;
  },

  /**
   * Removes the attrimator at the given index replacing it with the next
   * attrimator if one exists.
   *
   * @method unqueueAt
   * @param {Number} index
   * @chainable
   */
  unqueueAt: function(index)
  {
    var current = this.values[ index ];

    if ( current.next )
    {
      this.values[ index ] = current.next;
    }
    else
    {
      this.removeAt( index );
    }

    return this;
  },

  /**
   * Clones this map returning a deep clone where all attrimators are cloned.
   *
   * @method clone
   * @return {AttrimatorMap}
   */
  clone: function()
  {
    var values = this.values;
    var keys = this.keys;
    var clone = new anim8.AttrimatorMap();

    for (var i = values.length - 1; i >= 0; i--)
    {
      clone.values[i] = values[i].clone();
      clone.keys[i] = keys[i];
      clone.indices[ keys[i] ] = i;
    }

    return clone;
  },

  /**
   * Returns the time remaining for all finite attrimators in this map. The time
   * remaining includes queued attrimators.
   *
   * @method timeRemaining
   * @return {Number}
   */
  timeRemaining: function()
  {
    var maxRemaining = 0;
    var values = this.values;

    for (var i = values.length - 1; i >= 0; i--)
    {
      var attrimator = values[i];

      if ( !attrimator.isInfinite() )
      {
        maxRemaining = Math.max( maxRemaining, attrimator.timeRemaining() );
      }
    }

    return maxRemaining;
  },

  /**
   * Sets the cycle of the attrimators in this map. If there are attrimators
   * queued the are given the next cycle number. The final cycle number is
   * returned.
   *
   * @method applyCycle
   * @param {Number} nextCycle
   * @return {Number}
   */
  applyCycle: function(nextCycle)
  {
    var currentDepth = this.values;
    var nextDepth = null;

    while ( currentDepth.length )
    {
      nextDepth = [];

      for (var i = currentDepth.length - 1; i >= 0; i--)
      {
        var attrimator = currentDepth[ i ];

        attrimator.cycle = nextCycle;

        if ( attrimator.next )
        {
          nextDepth.push( attrimator.next );
        }
      }

      if ( nextDepth.length )
      {
        nextCycle++;
      }

      currentDepth = nextDepth;
    }

    return nextCycle;
  }

});

/**
 * Possible states an event can be in.
 * 
 * @type {Object}
 */
anim8.EventState = 
{
  DELAYED: 1,
  ANIMATING: 2,
  SLEEPING: 4,
  FINISHED: 8
};

/**
 * Instantiates a new Event which extends Attrimator.
 * 
 * @param {String} attribute
 * @param {Path} path
 * @param {String|Number} duration
 * @param {String|Function|Array} easing
 * @param {String|Number} delay
 * @param {String|Number} sleep
 * @param {String|Number} offset
 * @param {String|Number} repeat
 * @param {Number} scale
 * @param {T|Number} scaleBase
 * @param {Boolean} hasInitialState
 * @param {Parser} parser
 * @param {Attrimator} next
 * @class Event
 * @constructor
 * @extends Attrimator
 */
anim8.Event = function(attribute, path, duration, easing, delay, sleep, offset, repeat, scale, scaleBase, hasInitialState, parser, next) 
{
  this.reset( attribute, parser, next )

  /**
   * The path the attribute will be animated along.
   * 
   * @property {Path} path
   */
  this.path             = path;

  /**
   * The easing used to modify the delta value passed to the path.
   *
   * **See:** {{#crossLink "Core/anim8.easing:method"}}{{/crossLink}}
   * 
   * @property {Function} easing
   */
  this.easing           = anim8.easing( easing );

  /**
   * The amount of time in milliseconds to animate an attribute over the path.
   *
   * **See:** {{#crossLink "Core/anim8.duration:method"}}{{/crossLink}}
   * 
   * @property {Number} duration
   */
  this.duration         = anim8.duration( duration );

  /**
   * If this event repeats more than once, this is a pause between animations.
   *
   * **See:** {{#crossLink "Core/anim8.sleep:method"}}{{/crossLink}}
   * 
   * @property {Number} sleep
   */
  this.sleep            = anim8.sleep( sleep );

  /**
   * The number of times to repeat the animation.
   *
   * **See:** {{#crossLink "Core/anim8.repeat:method"}}{{/crossLink}}
   * 
   * @property {Number} repeat
   */
  this.repeat           = anim8.repeat( repeat );

  /**
   * The amount to scale the value computed from the path.
   *
   * **See:** {{#crossLink "Core/anim8.scale:method"}}{{/crossLink}}
   * 
   * @property {T} scale
   */
  this.scale            = anim8.scale( scale );

  /**
   * The base value from which to scale from. This is essentially this data
   * types default value.
   * 
   * @property {T} scaleBase
   */
  this.scaleBase        = path.calculator.parse( scaleBase, path.calculator.ZERO );

  /**
   * Whether or not this event has an initial value which can be applied at the
   * start of the animation (or when 
   * {{#crossLink "Animator/applyInitialState:method"}}{{/crossLink}} is invoked).
   * 
   * @property {Boolean} hasInitialState
   */
  this.hasInitialState  = anim8.coalesce( hasInitialState, true );

  this.delay            = anim8.delay( delay );
  this.offset           = anim8.sleep( sleep );
};

anim8.override( anim8.Event.prototype = new anim8.Attrimator(),
{
  /**
   * Returns the computed value given a base value and a delta along the path.
   *
   * @method computeValue
   * @param {T} baseValue
   * @param {Number} delta
   * @return {T}
   */
  computeValue: function(baseValue, delta)
  {
    var value = this.path.compute( baseValue, this.easing( delta ) );

    if ( value !== false && this.scale !== 1.0 )
    {
      var calc = this.path.calculator;
      var baseValue = calc.clone( this.scaleBase );
      var distance = calc.sub( baseValue, value );

      value = calc.adds( value, distance, -this.scale );
    }

    return value;
  },

  /**
   * Applies the value to the frame and returns true, otherwise returns false.
   *
   * @method applyValue
   * @param {Object} frame
   * @param {T} baseValue
   * @param {Number} delta
   * @return {T}
   */
  applyValue: function(frame, baseValue, delta)
  {
    var value = this.computeValue( baseValue, delta );
    
    if ( value !== false )
    {
      frame[ this.attribute ] = value;
    }

    return value;
  },

  nopeat: function()
  {
    this.repeat = anim8.clamp( Math.ceil( ( this.elapsed - this.delay ) / ( this.duration + this.sleep ) ), 0, this.repeat );
    
    return this;
  },
  finish: function(frame) 
  {
    this.applyValue( frame, this.path.calculator.create(), 1.0 );
    this.state = anim8.EventState.FINISHED;
  },
  start: function(now, animator)
  {
    anim8.Attrimator.prototype.start.apply( this, arguments );
    
    this.state = this.delay ? anim8.EventState.DELAYED : anim8.EventState.ANIMATING;

    if ( this.hasComputed() )
    {
      this.path = this.path.replaceComputed( this, animator );
    }
  },
  startCycle: function(frame)
  {
    if ( this.hasInitialState )
    {
      return this.applyValue( frame, frame[ this.attribute ], 0 );
    }

    return false;
  },
  update: function(elapsed, frame)
  {
    var updated = false;
    var delay = this.delay;
    var duration = this.duration;
    var sleep = this.sleep;
    var repeat = this.repeat;
    var oldState = this.state;
    var newState = this.state;
    var delta = 0;

    elapsed -= delay;

    var cycle = duration + sleep;
    var iteration = Math.floor( ( elapsed + sleep ) / cycle );

    if ( iteration >= repeat )
    {
      newState = anim8.EventState.FINISHED;
      delta = 1;
    }
    else
    {
      elapsed -= iteration * cycle;

      if ( elapsed > duration )
      {
        newState = anim8.EventState.SLEEPING;
        delta = 1;
      }
      else
      {
        newState = anim8.EventState.ANIMATING;
        delta = elapsed / duration;
      }
    }
    
    if ( newState === anim8.EventState.ANIMATING || 
       ( newState !== anim8.EventState.ANIMATING && oldState === anim8.EventState.ANIMATING ) )
    {
      this.applyValue( frame, frame[ this.attribute ], delta );
      updated = true;
    }

    this.state = newState;

    return updated;
  },
  valueAt: function(time, out)
  {
    if ( time < this.delay && !this.hasInitialState )
    {
      return false;
    }

    var delta = 0;

    if ( time >= this.delay )
    {
      var cycle = (this.duration + this.sleep);
      var elapsed = (time - this.delay);
      var iteration = Math.floor( ( elapsed + this.sleep ) / cycle );

      if ( iteration >= this.repeat )
      {
        delta = 1.0;
      }
      else
      {
        delta = Math.min( 1.0, (elapsed % cycle) / this.duration );        
      }
    }

    return this.computeValue( out, delta );
  },
  totalTime: function()
  {
    return Math.min( this.stopTime, this.delay + (this.repeat * this.duration) + ((this.repeat - 1) * this.sleep) );
  },
  clone: function()
  {
    return new anim8.Event( this.attribute, this.path, this.duration, this.easing, this.delay, this.sleep, this.offset, this.repeat, this.scale, this.scaleBase, this.hasInitialState, this.parser, this.next ? this.next.clone() : null );
  },
  hasComputed: function()
  {
    return this.path.computed;
  },
  isInfinite: function()
  {
    return (this.repeat === Number.POSITIVE_INFINITY) && (this.stopTime === Number.POSITIVE_INFINITY);
  },
  isFinished: function()
  {
    return (this.state === anim8.EventState.FINISHED);
  }

});

/**
 * Returns an Event given the attribute, the path, and a parsed options object.
 *
 * **See:** {{#crossLink "Core/anim8.options:method"}}anim8.options{{/crossLink}}
 * 
 * @method fromOptions
 * @for Event
 * @param  {String} attr
 * @param  {Path} path
 * @param  {Object} options
 * @return {Event}
 */
anim8.Event.fromOptions = function(attr, path, options)
{
  return new anim8.Event( attr, path, options.duration, options.easing, options.delay, options.sleep, options.offset, options.repeat, options.scale, options.scaleBase );
}

/**
 * Returns a spring if the provided argument is a spring, the name of a spring, 
 * or an object with a spring type to be created. If none of these conditions 
 * are true then an error is thrown.
 *
 * @method anim8.spring
 * @for Core
 * @param {Spring|String|Object} spring
 * @return {Spring}
 */
anim8.spring = function(spring)
{
  if ( spring instanceof anim8.Spring )
  {
    return spring;
  }
  if ( anim8.isString( spring ) && spring in anim8.spring )
  {
    return anim8.spring[ spring ];
  }
  if ( anim8.isObject( spring ) && spring.type in anim8.spring )
  {
    return anim8.spring[ spring.type ]( spring );
  }

  throw spring + ' is not a valid spring';
};


/**
 * A spring has a resting point, a current position, and the velocity currently 
 * enacting on the position based on the implementing classes logic.
 *
 * @class Spring
 * @constructor
 * @extends Attrimator
 */
anim8.Spring = function()
{
};

anim8.override( anim8.Spring.prototype = new anim8.Attrimator(),
{

  /**
   * Resets the spring's properties.
   *
   * @method set
   * @param {String} attribute
   * @param {Calculator|String} calculator
   * @param {T|Function|true} rest
   * @param {T|Function|true} position
   * @param {T|Function|true} velocity
   * @param {T|Function|true} gravity
   * @param {Boolean} finishOnRest
   */
  set: function(attribute, calculator, rest, position, velocity, gravity, finishOnRest)
  { 
    this.reset( attribute, null, null );

    this.calculator   = calculator;
    this.rest         = rest;
    this.position     = position;
    this.gravity      = gravity;
    this.velocity     = velocity;
    this.finishOnRest = finishOnRest;
  },
  
  /**
   * Resolves the rest to the expected format.
   * 
   * @method resolveRest
   * @return {T}
   */
  resolveRest: function()
  {
    return anim8.resolve( this.rest );
  },
  
  /**
   * Method that's invoked on each spring update.
   *
   * @method updateVelocity
   * @param {Number} dt
   */
  updateVelocity: function(dt)
  {
    throw 'Spring.updateVelocity not implemented';
  },

  start: function(now, animator)
  {
    anim8.Attrimator.prototype.start.apply( this, arguments );

    var attribute = animator.getAttribute( this.attribute );
    var calc = anim8.calculator( anim8.coalesce( this.calculator, attribute.calculator ) );

    this.calculator = calc;
    this.rest       = this.parseValue( animator, this.rest, attribute.defaultValue );
    this.position   = this.parseValue( animator, this.position, attribute.defaultValue );
    this.gravity    = this.parseValue( animator, this.gravity, calc.ZERO );
    this.velocity   = this.parseValue( animator, this.velocity, calc.ZERO );
  },

  hasComputed: function()
  {
    return anim8.isComputed( this.rest ) || 
           anim8.isComputed( this.position ) ||
           anim8.isComputed( this.gravity ) ||
           anim8.isComputed( this.velocity );
  },

  update: function(elapsed, frame)
  {
    var calc = this.calculator;
    
    // the number of elapsed seconds (maxed to avoid crazy behavior with low FPS)
    var dt = Math.min( (elapsed - this.elapsed) * 0.001, anim8.Spring.MAX_DT );
    
    // keep track of the starting position to determine whether the position has updated.
    var starting = calc.clone( this.position );
    
    // call the update method which should update the position
    this.updateVelocity( dt );
    this.velocity = calc.adds( this.velocity, this.gravity, dt );
    this.position = calc.adds( this.position, this.velocity, dt );
    
    // track whether the attribute has updated so the animator knows if it needs to apply the attribute to the subject.
    var updated = !calc.isEqual( starting, this.position, anim8.Spring.EPSILON );
    
    if ( updated )
    {
      frame[ this.attribute ] = this.position;
    }
    else if ( this.finishOnRest && calc.isZero( this.velocity ) )
    {
      this.finished = true;
    }
    
    return updated;
  },

  finish: function(frame)
  {
    this.finished = true;

    return true;
  },

  isFinished: function()
  {
    return this.finished;
  }
});

/**
 * The maximum elapsed time that should be used for the spring simulation. If you allow the elapsed time
 * to get to high the spring will overreact and produce undesirable results.
 */
anim8.Spring.MAX_DT = 0.1;

/**
 * The value used to determine whether two positions in a spring are different.
 */
anim8.Spring.EPSILON = 0.0001;



/**
 * Instantiates a new SpringLinear.
 * 
 * @param {String|false} attribute
 * @param {Calculator} calculator
 * @param {T} position
 * @param {T} rest
 * @param {T} damping
 * @param {T} stiffness
 * @param {T} velocity
 * @param {T} gravity
 * @param {Boolean} finishOnRest
 * @class SpringLinear
 * @constructor
 * @extends Spring
 */
anim8.SpringLinear = function(attribute, calculator, position, rest, damping, stiffness, velocity, gravity, finishOnRest)
{
  this.set( attribute, calculator, rest, position, velocity, gravity, finishOnRest );
  
  this.damping      = damping;
  this.stiffness    = stiffness;
  this.temp0        = null;
  this.temp1        = null;
};

anim8.override( anim8.SpringLinear.prototype = new anim8.Spring(), 
{

  start: function(now, animator)
  {
    anim8.Spring.prototype.start.apply( this, arguments );

    var attribute = animator.getAttribute( this.attribute );
    var calc = this.calculator;

    this.damping      = this.parseValue( animator, this.damping, attribute.defaultValue );
    this.stiffness    = this.parseValue( animator, this.stiffness, attribute.defaultValue );
    this.temp0        = calc.create();
    this.temp1        = calc.create();
  },

  clone: function()
  {
    return new anim8.SpringLinear( this.attribute, this.calculator, this.position, this.rest, this.damping, this.stiffness, this.velocity, this.gravity, this.finishOnRest );
  },

  hasComputed: function()
  {
    return anim8.isComputed( this.rest ) || 
           anim8.isComputed( this.position ) ||
           anim8.isComputed( this.gravity ) ||
           anim8.isComputed( this.velocity ) ||
           anim8.isComputed( this.damping ) || 
           anim8.isComputed( this.stiffness );
  },

  updateVelocity: function(dt)
  {
    // velocity += ((stiffness * (position - rest)) - (damping * velocity)) * elapsed.seconds;
    // position += velocity * elapsed.seconds;
      
    var calc = this.calculator;

    this.temp1 = calc.copy( this.temp1, this.damping );
    this.temp1 = calc.mul( this.temp1, this.velocity );
    
    this.temp0 = calc.copy( this.temp0, this.position );
    this.temp0 = calc.sub( this.temp0, this.resolveRest() );
    this.temp0 = calc.mul( this.temp0, this.stiffness );
    this.temp0 = calc.sub( this.temp0, this.temp1 );
    
    this.velocity = calc.adds( this.velocity, this.temp0, dt );
  }

});

/**
 * Register the spring parser.
 *
 * @param {Object}
 * @return {SpringLinear}
 */
anim8.spring['linear'] = function(spring)
{ 
  return new anim8.SpringLinear(
    spring.attribute,
    spring.calculator,
    anim8.coalesce( spring.position, true ),
    anim8.coalesce( spring.rest, true ),
    spring.damping,
    spring.stiffness,
    spring.velocity,
    spring.gravity,
    spring.finishOnRest
  );
};

/**
 * Instantiates a new SpringDistance.
 * 
 * @param {String|false} attribute
 * @param {anim8.Calculator} calculator
 * @param {T} position
 * @param {T} rest
 * @param {Number} distance
 * @param {Number} damping
 * @param {Number} stiffness
 * @param {T} velocity
 * @param {T} gravity
 * @param {Boolean} finishOnRest
 * @class SpringDistance
 * @constructor
 * @extends Spring
 */
anim8.SpringDistance = function(attribute, calculator, position, rest, distance, damping, stiffness, velocity, gravity, finishOnRest)
{
  this.set( attribute, calculator, rest, position, velocity, gravity, finishOnRest );
  
  this.distance   = distance;
  this.damping    = damping;
  this.stiffness  = stiffness;
  this.temp       = null;
};

anim8.override( anim8.SpringDistance.prototype = new anim8.Spring(), 
{

  start: function(now, animator)
  {
    anim8.Spring.prototype.start.apply( this, arguments );
    
    this.temp = this.calculator.create();
  },

  clone: function()
  {
    return new anim8.SpringDistance( this.attribute, this.calculator, this.position, this.rest, this.distance, this.damping, this.stiffness, this.velocity, this.gravity, this.finishOnRest );
  },

  updateVelocity: function(dt)
  {
    // d = DISTANCE( position, rest )
    // velocity += ((position - rest) / d * stiffness * |distance - d| - (damping * velocity)) * elapsed.seconds;
    // position += velocity * elapsed.seconds;

    var calc = this.calculator;
    var rest = this.resolveRest();
    
    var d = calc.distance( this.position, rest );
    
    this.temp = calc.copy( this.temp, this.position )
    this.temp = calc.sub( this.temp, rest );
    
    if ( d !== 0 )
    {
      this.temp = calc.scale( this.temp, 1.0 / d );
      this.temp = calc.scale( this.temp, (d - this.distance) * this.stiffness );
    }

    this.temp = calc.adds( this.temp, this.velocity, -this.damping );

    this.velocity = calc.adds( this.velocity, this.temp, dt );
  }
  
});

/**
 * Register the spring parser.
 * 
 * @param {Object}
 * @return {SpringDistance}
 */
anim8.spring['distance'] = function(spring)
{ 
  return new anim8.SpringDistance(
    spring.attribute,
    spring.calculator,
    anim8.coalesce( spring.position, true ),
    anim8.coalesce( spring.rest, true ),
    spring.distance,
    spring.damping,
    spring.stiffness,
    spring.velocity,
    spring.gravity,
    spring.finishOnRest
  );
};

/**
 * Animates a single attribute with a velocity and acceleration.
 *
 * @param {String} attribute
 * @param {Parser} parser
 * @param {Calculator} calculator
 * @param {T} position
 * @param {T} velocity
 * @param {T} acceleration
 * @param {Number} terminal
 * @param {Number} stopTime
 * @class Physics
 * @constructor
 * @extends Attrimator
 */
anim8.Physics = function( attribute, parser, calculator, position, velocity, acceleration, terminal, stopTime )
{
  this.reset( attribute, parser, null );

  this.calculator   = calculator;
  this.position     = position;
  this.velocity     = velocity;
  this.acceleration = acceleration;
  this.terminal     = anim8.number( terminal, Number.POSITIVE_INFINITY );
  this.stopTime     = anim8.time( stopTime, Number.POSITIVE_INFINITY );
  this.finished     = false;
};

anim8.override( anim8.Physics.prototype = new anim8.Attrimator(),
{
  /**
   * Parses a value for the animator given a default value.
   *
   * @method parseValue
   * @param {anim8.Animator} animator.
   * @param {T} value
   * @param {T} defaultValue
   * @return {T}
   */
  parseValue: function(animator, value, defaultValue)
  {
    var parsed = this.calculator.parse( value, defaultValue );

    if ( anim8.isComputed( parsed ) )
    {
       parsed = parsed( this, animator );
    }

    return parsed;
  },

  /**
   * Resolves the velocity to a value.
   *
   * @method resolveVelocity
   * @return {T}
   */
  resolveVelocity: function()
  {
    return anim8.resolve( this.velocity );
  },

  /**
   * Resolves the acceleration to a value.
   *
   * @method resolveAcceleration
   * @return {T}
   */
  resolveAcceleration: function()
  {
    return anim8.resolve( this.acceleration );
  },

  start: function(now, animator)
  {
    anim8.Attrimator.prototype.start.apply( this, arguments );

    var attribute = animator.getAttribute( this.attribute );
    var calc = anim8.calculator( anim8.coalesce( this.calculator, attribute.calculator ) );

    this.calculator     = calc;
    this.position       = this.parseValue( animator, this.position, attribute.defaultValue );
    this.initalPosition = calc.clone( this.position );
    this.velocity       = this.parseValue( animator, this.velocity, calc.ZERO );
    this.acceleration   = this.parseValue( animator, this.acceleration, calc.ZERO );
    this.temp           = calc.create();
  },

  hasComputed: function()
  {
    return anim8.isComputed( this.position ) || 
           anim8.isComputed( this.velocity ) ||
           anim8.isComputed( this.acceleration );
  },

  update: function(elapsed, frame)
  {
    var value = this.valueAt( elapsed, this.temp, true );

    if ( value !== false )
    {
      frame[ this.attribute ] = this.position = value;

      return true;
    }

    var calc = this.calculator;
    var dt = Math.min( (elapsed - this.elapsed) * 0.001, anim8.Physics.MAX_DT );
    var vel = calc.copy( this.temp, this.resolveVelocity() );
    var acc = this.resolveAcceleration();
    var pos = this.position;

    vel = calc.adds( vel, acc, dt );

    if ( this.terminal !== Number.POSITIVE_INFINITY )
    {
      vel = calc.clamp( vel, 0, this.terminal );
    }

    pos = calc.adds( pos, vel, dt );
    
    this.position = pos;

    if ( !anim8.isFunction( this.velocity ) )
    {
      this.velocity = calc.copy( this.velocity, vel );
    }

    frame[ this.attribute ] = pos;

    return true;
  },

  valueAt: function(time, out, usePosition)
  {
    if ( anim8.isFunction( this.velocity ) || anim8.isFunction( this.acceleration ) || this.terminal !== Number.POSITIVE_INFINITY )
    {
      return false;
    }

    time -= this.delay;
    time *= 0.001;

    var calc = this.calculator;
    var value = usePosition ? calc.copy( this.position, this.initalPosition ) : calc.copy( out, this.initalPosition );
    value = calc.adds( value, this.velocity, time );
    value = calc.adds( value, this.acceleration, time * time );

    return value;
  },

  clone: function()
  {
    return new anim8.Physics( this.attribute, this.parser, this.calculator, this.position, this.velocity, this.acceleration, this.terminal, this.stopTime );
  },

  finish: function(frame)
  {
    this.finished = true;

    return true;
  },

  isFinished: function()
  {
    return this.finished;
  }
  
});

/**
 * The maximum elapsed time that should be used for the spring simulation. If you allow the elapsed time
 * to get to high the spring will overreact and produce undesirable results.
 */
anim8.Physics.MAX_DT = 0.1;


/**
 * Returns an instance of anim8.Animation based on the given input & options. If 
 * the input is an instance of anim8.Animation that instance is immediately 
 * returned. If the input is a string the animation with that name is returned. 
 * If the input is a string with an animation name and an option string the
 * animation with the given name modified by any additional options is returned.
 * Commas can be used to queue animation & option pairs one after another. If 
 * the input is an object an anonymous animation is created. If no animation
 * could be determined then false is returned.
 *
 * **Examples:**
 * 
 *     anim8.animation('wiggle');
 *     anim8.animation('wiggle ~1s 4s z40ms x5 !1.2');
 *     anim8.animation('wiggle', {...options...});
 *     anim8.animation('wiggle, tada ~50ms, fadeOut 2s');
 *     anim8.animation({...definition...});
 * 
 * If the given input is a string you can cache it. An example would be
 * 'wiggle ~1s 2s x3' - if `cache` is true and you call this method again it won't
 * need to be parsed again.
 *
 * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
 * 
 * @method anim8.animation
 * @for Core
 * @param {Animation|String|Object} animation
 * @param {String|Object} [options]
 * @param {Boolean} [cache=false]
 * @return {Animation|False}
 * @throws {String} The animation string has an invalid animation name or the
 *    animation fails to create attrimators from the animation definition.
 */
anim8.animation = function(animation, options, cache)
{
  if ( animation instanceof anim8.Animation )
  {
    return animation;
  }
  if ( anim8.isString( animation ) )
  {
    var key = animation.toLowerCase();

    if ( key in anim8.animation )
    {
      return anim8.animation[ key ];
    }

    var animationsQueued = animation.split(',');
    var anim = false;
    var last = false;

    for (var k = 0; k < animationsQueued.length; k++)
    {
      var animationsMerged = animationsQueued[ k ].split( '&' );
      var base = false;

      for (var j = 0; j < animationsMerged.length; j++)
      {
        var animationString = anim8.trim( animationsMerged[ j ].toLowerCase() );
        var animationSplit = animationString.split( ' ' );
        var parsedAnimation = anim8.animation[ animationSplit[ 0 ] ];
        var parsedOptions = anim8.options( animationSplit.slice( 1 ) );

        if ( parsedAnimation )
        {
          var extendedAnimation = parsedAnimation.extend( parsedOptions, true );

          if ( base === false )
          {
            base = extendedAnimation;

            if ( anim === false )
            {
              last = anim = base;
            }
            else
            {
              last = last.next = base;
            }
          }
          else
          {
            base.attrimators.putMap( extendedAnimation.attrimators );
          }
        }
        else
        {
          throw parsedAnimation + ' is not a valid animation in "' + animationsQueued[ k ] + '"';
        }
      }
    }

    if ( anim8.coalesce( cache, anim8.defaults.cache ) && anim8.isEmpty( options ) )
    {
      anim.name = animation;

      anim8.animation[ key ] = anim;
    }

    return anim;
  }
  if ( anim8.isObject( animation ) )
  {
    var attrimatorMap = new anim8.AttrimatorMap();
    var options = anim8.options( options );
    var helper = new anim8.ParserHelper( animation, options );
    
    for (var parserName in animation)
    {
      var parser = anim8.parser( parserName );
      
      if ( parser !== false )
      {
        parser.parse( animation, options, attrimatorMap, helper );
      }
    }
    
    if (attrimatorMap.size())
    {
      return new anim8.Animation( false, animation, options, attrimatorMap );
    }
    else
    {
      throw 'Failed to create any attrimators in anim8.animation';
    }
  }
  
  return false;
};

/**
 * Saves an animation under the given name. It can be played, queued, and 
 * transitioned into at a later time providing the name and optionally options 
 * to override with.
 *
 * **See:** {{#crossLink "Core/anim8.animation:method"}}anim8.animation{{/crossLink}},
 *          {{#crossLink "Core/anim8.options:method"}}anim8.options{{/crossLink}}
 *
 * @method anim8.save
 * @for Core
 * @param {String} name
 * @param {Animation|String|Object} animation
 * @param {String|Object} [options]
 */
anim8.save = function(name, animation, options)
{
  var animation = anim8.animation( animation, options );
  var key = name.toLowerCase();

  animation.name = name;
  
  anim8.animation[ key ] = animation;
};

/**
 * Instantiates a new Animation given it's name, the input & options passed, and 
 * the attrimators that were generated from the input & options. If the name is 
 * false this is an anonymous animation. Input & Options are used by parsers to 
 * generate attrimators, options allow for an animations default properties to 
 * be overriden.
 *
 * @param {String|Boolean} name
 * @param {Object} input
 * @param {Object} options
 * @param {AttrimatorMap} attrimators
 * @class Animation
 * @constructor
 */
anim8.Animation = function(name, input, options, attrimators)
{
  /**
   * The name of the animation, or false if it's an anonymous animation. 
   *
   * @property {String|False} name
   */
  this.name = name;

  /**
   * The object which created the animation.
   *
   * @property {Object} input
   */
  this.input = input;

  /**
   * The options given when the animation was created.
   *
   * @property {Object} [options]
   */
  this.options = options;

  /**
   * The name of the animation, or false if it's an anonymous animation. 
   *
   * @property {AttrimatorMap} name
   */
  this.attrimators = attrimators;

  /**
   * The animation to play after this animation is finished playing.
   *
   * @property {Animation} [next]
   */
  this.next = null;
};

anim8.Animation.prototype = 
{
  
  /**
   * Returns true if this animation was a saved animation, otherwise it's an 
   * anonymous one and false is returned. Anonymous animations are typically
   * generated once and won't be used again.
   *
   * @method isSaved
   * @return {Boolean} 
   */
  isSaved: function()
  {
    return (this.name !== false);
  },
  
  /**
   * Generates an map of event instances from the attrimators in this animation.
   *
   * @method newAttrimators
   * @return {AttrimatorMap}
   */
  newAttrimators: function()
  {
    return this.attrimators.clone();
  },

  /**
   * Merges options with the options in this animation and places them in the
   * events.
   * 
   * @method merge
   * @param {Object} [options]
   * @param {AttrimatorMap} attrimatorMap
   * @return {AttrimatorMap}
   */
  merge: function(options, attrimatorMap)
  {
    var helper = new anim8.ParserHelper( this.input, this.options, options );

    for (var parserName in this.input)
    {
      var parser = anim8.parser( parserName );
      
      if ( parser !== false )
      {
        parser.merge( this.input, options, this.options, attrimatorMap, helper );
      }
    }

    return attrimatorMap;
  },

  /**
   * Extends this animation and returns an anonymous animation modified with the 
   * given options. If an empty set of options is given this animation instance
   * may be returned. This can be overriden if the second argument is true.
   *
   * @method extend
   * @param {Object} [options]
   * @param {Boolean} [force]
   * @return {Animation}
   */
  extend: function(options, force)
  {
    if ( anim8.isEmpty( options ) && !force )
    {
      return this;
    }

    var attrimatorMap = this.newAttrimators();

    this.merge( options, attrimatorMap );

    anim8.extend( options, this.options );

    return new anim8.Animation( false, this.input, options, attrimatorMap );
  }

};

/**
 * Parses a value into a transition object. If the given input is a string it's
 * expected to be in a similar format to:
 * 
 *     [time] [easing[-easingType]] >[outro] <[intro] /[granularity] ^[lookup]
 * 
 * This is also a registry of transitions, you can add your own transitions that
 * can be used later with syntax like:
 * 
 *     anim8.transition['myTransition'] = anim8.transition('50ms 0.05 linear');
 * 
 * So you can use 'myTransition' as the transition input.
 * 
 *     animator.transition('myTransition', 'myAnimation');
 * 
 * @method anim8.transition
 * @for Core
 * @param {Object|String|Array} options
 * @param {Boolean} [cache]
 * @return {Object}
 */
anim8.transition = function(transition, cache) 
{
  // 1. If it's a string, convert it into an array.
  // 2. If it's an array, parse it and convert it into an object.
  // 3. If it's an object, fill in any missing values with the defaults.

  var originalInput = transition;

  if ( anim8.isString( transition ) )
  {
    if ( transition in anim8.transition )
    {
      return anim8.transition[ transition ];
    }

    transition = transition.toLowerCase().split(' ');
  }

  if ( anim8.isArray( transition ) )
  {
    var transitionArray = transition;

    transition = {};

    for (var i = 0; i < transitionArray.length; i++)
    {
      var part = transitionArray[i];
      var first = part.charAt( 0 );

      // Introduction Time (into next event)
      if ( first === '<' )
      {
        var intro = anim8.time( part.substring(1), false );

        if ( !isNaN( intro ) )
        {
          transition.intro = intro;
        }
      }
      // Outroduction Time (out of current event)
      else if ( first === '>' )
      {
        var outro = anim8.time( part.substring(1), false );

        if ( !isNaN( outro ) )
        {
          transition.outro = outro;
        }
      }
      // Granularity (for velocity conscious transitions)
      else if ( first === '/' )
      {
        var granularity = anim8.number( part.substring(1), false );

        if ( granularity !== false )
        {
          transition.granularity = granularity;
        }
      }
      // Lookup (for velocity conscious transitions)
      else if ( first === '^' )
      {
        var lookup = anim8.time( part.substring(1), false );

        if ( lookup !== false )
        {
          transition.lookup = lookup;
        }
      }
      else
      {
        // Easing
        var easing = anim8.easing( part, false );

        if ( easing !== false )
        {
          transition.easing = easing;
        }

        // Time
        var time = anim8.time( part, false );

        if ( time !== false )
        {
          transition.time = time;
        }
      }
    }
  }

  if ( anim8.isObject( transition ) )
  {
    transition.time        = anim8.time( transition.time, anim8.defaults.transitionTime );
    transition.outro       = anim8.time( transition.outro, anim8.defaults.transitionOutro );
    transition.intro       = anim8.time( transition.intro, anim8.defaults.transitionIntro );
    transition.easing      = anim8.easing( anim8.coalesce( transition.easing, anim8.defaults.transitionEasing ) );
    transition.granularity = anim8.number( transition.granularity, anim8.defaults.transitionGranularity );
    transition.lookup      = anim8.time( transition.lookup, anim8.defaults.transitionLookup );
    
    if ( anim8.isString( originalInput ) && anim8.coalesce( cache, anim8.defaults.cacheTransitions ) )
    {
      anim8.transition[ originalInput ] = transition;
    }

    return transition;
  }

  return anim8.defaults.noTransition;
};


/**
 * Parses a value into an options object. If the given input is a string it's 
 * expected to be in a similar format to:
 * 
 *     [duration] x[repeat] z[sleep] ~[delay] @[offset] ![scale] [[easing][-easingType]]
 * 
 * This is also a registry of options, you can add your own options that
 * can be used later with syntax like:
 * 
 *     anim8.options['myOptions'] = anim8.options('1.5s x2 !2');
 * 
 * So you can use 'myOptions' as the options input.
 *
 * You can also specify relative values & scaling values. If you have the 
 * following options:
 *
 *     +2s x*2 ~-1s
 *
 * It will result in adding 2 seconds to the duration, repeating it twice as
 * much, and subtracting one second from the delay.
 *
 * For more information on acceptable values in options:
 *
 * **See:** {{#crossLink "Core/anim8.duration:method"}}{{/crossLink}},
 *          {{#crossLink "Core/anim8.repeat:method"}}{{/crossLink}},
 *          {{#crossLink "Core/anim8.sleep:method"}}{{/crossLink}},
 *          {{#crossLink "Core/anim8.delay:method"}}{{/crossLink}},
 *          {{#crossLink "Core/anim8.scale:method"}}{{/crossLink}}, and
 *          {{#crossLink "Core/anim8.easing:method"}}{{/crossLink}}
 * 
 * @method anim8.options
 * @for Core
 * @param {Object|String|Array} options
 * @param {Boolean} [cache]
 * @return {Object}
 */
anim8.options = (function()
{
  function parseProperty(input, out, parseFunction, property, propertyAdd, propertyScale)
  {
    var first = input.charAt( 0 );

    if ( first === '*' )
    {
      parsed = anim8.number( input.substring( 1 ), false );

      if ( parsed !== false )
      {
        out[ propertyScale ] = parsed;
      }
    }
    else
    {
      if ( first === '+' || first === '-' )
      {
        property = propertyAdd;
        input = input.substring( 1 );
      }

      var parsed = parseFunction( input, false )

      if ( parsed !== false )
      {
        out[ property ] = parsed;
      }  
    }

    return parsed;
  }

  return function(options, cache)
  {
    var originalInput = options;

    if ( anim8.isString( options ) )
    {
      if ( options in anim8.options )
      {
        return anim8.options[ options ];
      }

      options = options.toLowerCase().split(' ');
    }

    if ( anim8.isArray( options ) )
    {
      var parsed = {};

      for (var i = 0; i < options.length; i++)
      {
        var part = options[i];
        var first = part.charAt( 0 );

        // Repeats
        if ( first === 'x' )
        {
          parseProperty( part.substring(1), parsed, anim8.repeat, 'repeat', 'repeatAdd', 'repeatScale' );
        }
        // Sleeping
        else if ( first === 'z' )
        {
          parseProperty( part.substring(1), parsed, anim8.time, 'sleep', 'sleepAdd', 'sleepScale' );
        }
        // Delay
        else if ( first === '~' )
        {
          parseProperty( part.substring(1), parsed, anim8.time, 'delay', 'delayAdd', 'delayScale' );
        }
        // Scaling
        else if ( first === '!' )
        {
          parseProperty( part.substring(1), parsed, anim8.number, 'scale', 'scaleAdd', 'scaleScale' );
        }
        // Offset
        else if ( first === '@' )
        {
          parseProperty( part.substring(1), parsed, anim8.time, 'offset', 'offsetAdd', 'offsetScale' );
        }
        else
        {
          // Easing?
          var easing = anim8.easing( part, false );

          if ( easing !== false )
          {
            parsed.easing = easing;
          }

          // Duration?
          var duration = parseProperty( part, parsed, anim8.time, 'duration', 'durationAdd', 'durationScale' );

          if ( duration === false )
          {
            // If not a duration, might be an alternative repeat? (doesn't start with x)
            parseProperty( part, parsed, anim8.repeat, 'repeat', 'repeatAdd', 'repeatScale' );
          }
        }
      }

      if ( anim8.isString( originalInput ) && anim8.coalesce( cache, anim8.defaults.cacheOptions ) )
      {
        anim8.options[ originalInput ] = parsed;
      }

      return parsed; 
    }

    if ( anim8.isObject( options ) )
    {
      return options;
    }

    return anim8.defaults.noOptions;
  };

})();

/**
 * Instantiates a new Animator given a subject to animate.
 *
 * @param {Any} e
 * @class Animator
 * @constructor
 * @extends anim8.eventize
 */
anim8.Animator = function(e) 
{
  this.reset( e );
};

/**
 * The event triggered after preupdate is called. Pre-update is used to run any
 * preparations on the subject before updates are made and attributes are 
 * applied.
 * 
 * @event preupdate
 */

/**
 * The event triggered after all attrimators are updated and any new values
 * have been applied to the current values (frame) on the animator.
 * 
 * @event update
 */

/**
 * The event triggered after the current values (frame) on the animator are
 * applied to the subject.
 * 
 * @event apply
 */

/**
 * The event triggered when the given animation cycle starts (and initial 
 * values are applied) for all attrimators in the cycle.
 * 
 * @event cycleStart:#
 * @param {Number} cycleID
 */

/**
 * The event triggered when the given animation cycle ends which occurs when the
 * last attrimator for an animation finishes or is interrupted by commands like 
 * play, queue, transition, end, finish, & stop.
 * 
 * @event cycleEnd:#
 * @param {Number} cycleID
 */

/**
 * The event triggered when all animations on the animator have finished.
 * 
 * @event finished
 * @param {Animator} animator
 */

/**
 * The event triggered when an animator is deactivated which occurs when an 
 * animator has finished animating and is being taken off the list of live
 * animators (anim8.animating).
 * 
 * @event deactivate
 */

/**
 * The event triggered after the user calls destroy on an animator.
 * 
 * @event destroyed
 */

anim8.fn = anim8.Animator.prototype = 
{

  /**
   * Resets the animator given a subject to animate.
   *
   * @method reset
   * @param {Any} subject
   * @chainable
   * @protected
   */
  reset: function(subject)
  {
    /**
     * The subject which is being animated.
     *
     * @property {Any} subject
     */
    this.subject = subject;

    /**
     * The map of attrimators animating the subject.
     *
     * @property attrimators
     * @type {AttrimatorMap}
     */
    this.attrimators = new anim8.AttrimatorMap();

    /**
     * The array of attrimators recently added to the animator that
     * are ready to be started.
     *
     * @property {Array} attrimatorsAdded
     * @protected
     */
    this.attrimatorsAdded = [];

    /**
     * The object which stores the attribute values being animated.
     *
     * @property {Object} frame
     */
    this.frame = {};

    /**
     * The object which stores the attributes last updated.
     *
     * @property {Object} updated
     */
    this.updated = {};

    /**
     * Whether or not this animator has completely finished animating it's subject.
     *
     * @property {Boolean} finished
     */
    this.finished = false;

    /**
     * The factory which created this Animator given a subject.
     *
     * @property {Factory} factory
     */
    this.factory = null;

    /**
     * Whether or not this animator is actively being updated.
     *
     * @property {Boolean} active
     */
    this.active = false;

    /**
     * The current cycle being animated. Multiple cycles can be animated at once, this is the first one.
     *
     * @property {Number} cycleCurrent
     * @protected
     */
    this.cycleCurrent = 0;

    /**
     * The ID of the next cycle of animations to be added to this Animator.
     *
     * @property {Number} cycleNext
     * @protected
     */
    this.cycleNext = 0;

    /**
     * The last cycle that was ended.
     *
     * @property {Number} cycleEnded
     * @protected
     */
    this.cycleEnded = 0;
    
    return this;
  },

  /**
   * Starts a new animation cycle. This is done before events & springs are 
   * placed to group them together so we know when to apply their initial value.
   *
   * @method newCycle
   * @param {Attrimator|AttrimatorMap} attrimators
   * @chainable
   * @protected
   */
  newCycle: function(attrimators)
  {
    this.cycleNext++;

    if ( attrimators instanceof anim8.AttrimatorMap )
    {
      this.cycleNext = attrimators.applyCycle( this.cycleNext );
    }
    else if ( attrimators instanceof anim8.Attrimator )
    {
      attrimators.cycle = this.cycleNext;
    }

    return this;
  },

  /**
   * Applies the current cycle. This involves finding all attrimators with the 
   * same cycle identifier and applying their initial state.
   * 
   * @method applyCurrentCycle
   * @chainable
   * @protected
   */
  applyCurrentCycle: function()
  {
    var cycle = this.cycleCurrent;
    var attrimators = this.attrimators.values;

    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      var attrimator = attrimators[ i ];
      var attr = attrimator.attribute;

      if ( attrimator.cycle === cycle )
      {
        this.updated[ attr ] = (attrimator.startCycle( this.frame ) !== false) || this.updated[ attr ];
      }
    }

    return this;
  },

  /**
   * Ends the current cycle which calls any listening functions.
   * 
   * @method endCurrentCycle
   * @chainable
   * @protected
   */
  endCurrentCycle: function()
  {
    if ( this.cycleCurrent > this.cycleEnded )
    {
      this.cycleEnded = this.cycleCurrent;
      this.trigger( 'cycleEnd:' + this.cycleCurrent, this.cycleCurrent ); 
    }
  },

  /**
   * Returns the attribute descriptor given the name of the attribute.
   * 
   * @method getAttribute
   * @param  {String} attr
   * @return {Object}
   */
  getAttribute: function(attr)
  {
    return this.factory.attribute( attr );
  },
  
  /**
   * Restores any temporary state that may exist on this Animator that
   * is a result from animations.
   *
   * @method restore
   * @chainable
   */
  restore: function()
  { 
    return this;
  },

  /**
   * Applies the initial state of recently added attrimators immediately.
   * 
   * @method applyInitialState
   * @chainable
   */
  applyInitialState: function()
  {
    var now = anim8.now();

    this.preupdate( now );
    this.update( now );
    this.apply();

    return this;
  },
  
  /**
   * A method thats invoked along with all other animators before updates are 
   * called. This is used to make any necessary preparations before the animator
   * is updated.
   *
   * @method preupdate
   * @param {Number} now
   * @chainable
   */
  preupdate: function(now)
  {
    // If there are attribute placed on the animator since the last preupdate
    // that has computed values we need to replace the path on the event with
    // a copy containing the computed values. This is where current value & 
    // relative values are injected from the animator into the attribute.
    var aa = this.attrimatorsAdded;
    if ( aa.length )
    {
      for (var i = 0; i < aa.length; i++)
      {
        var attrimator = aa[ i ];
        var attr = attrimator.attribute;

        if ( attr in this.subject )
        {
          this.frame[ attr ] = this.subject[ attr ];
        }
        else
        {
          this.setDefault( attr );
        }

        attrimator.start( now, this );     
      }

      aa.length = 0;
    }

    this.trigger('preupdate');
    
    return this;
  },

  /**
   * Sets the default value for the given attribute in the frame of this 
   * Animator if there's no value there.
   * 
   * @method setDefault
   * @param {String} attr
   * @protected
   */
  setDefault: function(attr)
  {
    if ( !(attr in this.frame) )
    {
      this.frame[ attr ] = this.getAttribute( attr ).cloneDefault();
    }
  },
  
  /**
   * Updates all attrimators in this animator with the given time.
   *
   * @method update
   * @param {Number} now
   * @chainable
   */
  update: function(now) 
  {  
    this.wasFinished = this.finished;
    this.finished = true;

    var attrimators = this.attrimators.values;
    var minCycle = this.cycleNext;

    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      var attrimator = attrimators[ i ];
      var attr = attrimator.attribute;

      this.updated[ attr ] = attrimator.setTime( now, this.frame );

      this.finished = this.finished && attrimator.isFinished();

      minCycle = Math.min( minCycle, attrimator.cycle );
    }

    if ( this.cycleCurrent < minCycle )
    {
      while ( this.cycleCurrent < minCycle )
      {
        this.endCurrentCycle();
        this.cycleCurrent++;
      }

      this.cycleCurrent = minCycle;
      this.applyCurrentCycle();
      this.trigger( 'cycleStart:' + this.cycleCurrent, this.cycleCurrent );
    }

    if ( !this.wasFinished && this.finished )
    {
      this.endCurrentCycle();
    }

    this.trigger('update');
    
    return this;
  },

  /**
   * Places the attribute animator in this animator replacing any existing 
   * animator for the same attribute. The next time the animator is updated the 
   * attribute animator will be started. The previous (if any) attrimator is
   * returned.
   * 
   * @method placeAttrimator
   * @param {Attrimator} attrimator
   * @return {Attrimator}
   */
  placeAttrimator: function(attrimator)
  {
    var attr = attrimator.attribute;
    var existing = this.attrimators.get( attr );

    this.attrimators.put( attr, attrimator );
    this.attrimatorsAdded.push( attrimator );

    this.finished = false;

    return existing;
  },
  
  /**
   * Applies all updated attributes to the subject. This method is invoked with 
   * all of the other animators at the end of the animation cycle.
   *
   * @method apply
   * @chainable
   */
  apply: function()
  {
    for (var attr in this.frame)
    {
      if ( this.updated[ attr ] )
      {
        this.subject[ attr ] = this.frame[ attr ]; 
        this.updated[ attr ] = false;
      }
    }
  
    this.trigger('apply');
  
    this.trimAttrimators();
    
    return this;
  },
  
  /**
   * Removes any finished attrimators and places any queued attrimators. If the
   * animator previously wasn't finished but now is the 'finished' event will
   * be triggered.
   *
   * @method trimAttrimators
   * @chainable
   * @protected
   */
  trimAttrimators: function()
  {
    var attrimators = this.attrimators.values;

    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      var attrimator = attrimators[ i ];

      if ( attrimator.isFinished() )
      {
        if ( attrimator.next )
        {
          this.placeAttrimator( attrimator.next );
        }
        else
        {
          this.attrimators.removeAt( i );
        }
      }
    }
    
    if ( !this.wasFinished && this.finished )
    {
      this.trigger( 'finished', this );
    }

    return this;
  },
  
  /**
   * Returns the current value for the given attribute (or undefined if the 
   * attribute is not or has not animated).
   *
   * @method value
   * @param {String} attr
   * @return {Any}
   */
  value: function(attr)
  {
    return this.frame[ attr ];
  },

  /**
   * Activates this Animator by adding it to the main loop if it isn't there 
   * already.
   * 
   * @method activate
   * @chainable
   */
  activate: function()
  {
    anim8.add( this );

    return this;
  },
  
  /**
   * A method that is invoked when an animator is finished and is being removed 
   * from the list of currently animating Animators.
   *
   * @method deactivate
   * @chainable
   */
  deactivate: function()
  { 
    this.trigger('deactivate', this);

    return this;
  },
  
  /**
   * A method that can be invoked to destroy an animator - removing any 
   * relationship between the subject and animator. The next time an animator is
   * generated for the subject a new animator will be created.
   *
   * @method destroy
   * @chainable
   */
  destroy: function()
  {
    this.finished = true;

    this.factory.destroy( this );
    
    this.trigger('destroyed');

    return this;
  },
  
  /**
   * Creates a map of attrimators based on the animation and options given. For
   * each anim8.Animation instance thats being converted into attrimators,
   * the onAnimation(animation, option, attrimatorMap) function is invoked.
   *
   * **See:** {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method createAttrimators
   * @param {Animation|String|Object} animation
   * @param {String|Object} [options]
   * @param {Boolean} [cache=false]
   * @return {AttrimatorMap}
   * @protected
   */
  createAttrimators: function(animation, options, cache)
  {
    var options = anim8.options( options );    
    var animation = anim8.animation( animation, options, cache );
  
    if (animation === false)
    {
      return false;
    }
    
    var attrimators = animation.newAttrimators();
    
    if ( animation.isSaved() && !anim8.isEmpty( options ) )
    { 
      animation.merge( options, attrimators );
    }
    
    this.onAnimation( animation, options, attrimators );

    while ( animation.next !== null )
    {
      animation = animation.next;

      var queueAttrimators = animation.newAttrimators();

      this.onAnimation( animation, options, queueAttrimators );

      attrimators.queueMap( queueAttrimators );
    }

    return attrimators;
  },
  
  /**
   * A method invoked when an animation is about to be played in the Animator.
   * 
   * @method onAnimation
   * @param {Animation} animation
   * @param {Object} options
   * @param {AttrimatorMap} attrimatorMap
   * @protected
   */
  onAnimation: function(animation, options, attrimatorMap)
  {
    
  },
  
  /**
   * Adds a spring to this animator replacing any existing attrimator for the 
   * same attribute. A spring object can be given, an instance of anim8.Spring, 
   * or a name of a saved Spring. The spring added to the animator is returned.
   * 
   * @method spring
   * @param {Spring|String|Object} spring
   * @return {Spring}
   */
  spring: function(spring)
  {
    var spring = anim8.spring( spring );
    
    if ( spring === false )
    {
      return false;
    }

    this.newCycle( spring );
    this.placeAttrimator( spring );
    
    this.activate();
    
    return spring;
  },
  
  /**
   * Plays an animation. Attributes in the animation that are currently being
   * animated will be stopped and replaced with the new attrimators. If `all` is
   * true then any attrimators animating not specified in the given animation
   * will be stopped.
   *
   * **See:** {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   *
   * @method play
   * @param {Animation|String|Object} animation
   * @param {String|Object} [options]
   * @param {Boolean} [all=false] 
   * @param {Boolean} [cache=false]
   * @chainable
   */
  play: function(animation, options, all, cache)
  {
    var attrimatorMap = this.createAttrimators( animation, options, cache );
    
    if ( attrimatorMap === false )
    {
      return false;
    }
    
    this.newCycle( attrimatorMap );
    this.playAttrimators( attrimatorMap, all );

    return this.activate();
  },

  /**
   * Plays a map of attrimators. Attributes in the attrimator map that are 
   * currently being animated will be stopped and replaced with the new
   * attrimators. If "all" is true then any attrimators animating not specified
   * in the given attrimator map will be stopped. This method will not activate 
   * the Animator, that has to be done manually.
   * 
   * @method playAttrimators
   * @param {AttrimatorMap} animatorMap
   * @param {Boolean} [all]
   * @chainable
   * @protected
   */
  playAttrimators: function(attrimatorMap, all)
  {
    if ( all )
    {
      this.finishNotPresent( attrimatorMap, 0 );
    }

    var attrimators = attrimatorMap.values;

    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      this.placeAttrimator( attrimators[i] );
    }
    
    return this;
  },
  
  /**
   * Queues an animation. The attrimators generated from the given animation 
   * will be started at the same time - as soon as all finite attrimators for
   * the same attributes are finished. Any infinite attrimators will be 
   * automatically stopped when all queued attrimators are set to start.
   *
   * **See:** {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method queue
   * @param {Animation|String|Object} animation
   * @param {String|Object} [options]
   * @param {Boolean} [cache]
   * @chainable
   */
  queue: function(animation, options, cache)
  {
    var attrimatorMap = this.createAttrimators( animation, options, cache );
    
    if ( attrimatorMap === false )
    {
      return false;
    }
        
    this.newCycle( attrimatorMap );
    this.queueAttrimators( attrimatorMap );

    return this.activate();
  },

  /**
   * Queues a map of attrimators. The map of attrimators will be started at the
   * same time - as soon as all finished attrimators for the same attribute are
   * finished. Any infinite attrimators will be automatically stopped when all
   * queued attrimators are set to start.
   * 
   * @method queueAttrimators
   * @param {AttrimatorMap} attrimatorMap
   * @chainable
   * @protected
   */
  queueAttrimators: function(attrimatorMap)
  {
    this.attrimators.queueMap( attrimatorMap, this.placeAttrimator, this );
    
    return this;
  },
  
  /**
   * Transitions from the currently playing attrimators into the beginning of a 
   * new animation. Several parameters can be specified in the transition object
   * which determine how the transition is made. If "all" is true then any 
   * attrimators animating not specified in the given animation will be stopped.
   *
   * time: the total time to take to transition into a new animation.
   * outro: time to look into the future for the current attrimator to curve to.
   * intro: time to look into the future for the next attrimator to curve into.
   * lookup: time to look into the future to calculate velocity which is used
   *   for negative intros and maintaing consistent exit & entrance velocity.
   * granularity: when greater than 2 it activates smooth transitions where the
   *    velocity of the new & old attrimators is maintained over the transition.
   * 
   * **See:** {{#crossLink "Core/anim8.transition:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method transition
   * @param {String|Array|Object} transition
   * @param {String|Object|Animation} animation
   * @param {Object} [options]
   * @param {Boolean} [all]
   * @param {Boolean} [cache]
   * @chainable
   */
  transition: function(transition, animation, options, all, cache)
  {
    var transition = anim8.transition( transition );
    var attrimatorMap = this.createAttrimators( animation, options, cache );
    
    if ( attrimatorMap === false )
    {
      return false;
    }

    this.newCycle( attrimatorMap );
    this.transitionAttrimators( transition, attrimatorMap, all );

    return this.activate();
  },

  /**
   * Transitions from the currently playing attrimators into the beginning of a
   * new animation. Several parameters can be specified in the transition object
   * which determine how the transition is made. If "all" is true then any 
   * attrimators animating not specified in the given attrimator map will be 
   * stopped.
   *
   * time: the total time to take to transition into a new animation.
   * outro: time to look into the future for the current attrimator to curve to.
   * intro: time to look into the future for the next attrimator to curve into.
   * lookup: time to look into the future to calculate velocity which is used
   *   for negative intros and maintaing consistent exit & entrance velocity.
   * granularity: when greater than 2 it activates smooth transitions where the
   *    velocity of the new & old attrimators is maintained over the transition.
   *
   * @method transitionAttrimators
   * @param {Object} transition
   * @param {AttrimatorMap} attrimatorMap
   * @param {Boolean} [all]
   * @chainable
   * @protected
   */
  transitionAttrimators: function(transition, attrimatorMap, all)
  {
    // TRANSITIONING:
    // If the animator doesn't have an attrimator for the given attribute just add the attrimator adding the total delay
    // If the animator has an attrimator currently...
    //   If the current attrimator or new attrimator don't have values at the desired times...
    //      Stop the current attrimator after the total delay (adding the delay of the new attrimator as well)
    //      Queue the new attrimator
    //   Else
    //      Create a path using the methods detailed above
    // If all is true and there's an attrimator left on the animator that isn't being transitioned, stop it after the total delay.

    // CREATING A TRANSITION PATH:
    // If intro & outro are 0, use Tween
    // If intro is 0, use Quadratic Path between current value, outro point, and first point on new path.
    // If outro is 0, use Quadratic Path between current value, first point on new path, and intro point.
    // If intro & outro are not 0, use Cubic Path between current value, outro point, first point on new path, and intro point.
    // If granularity is given > 1 then compile the path, compute intro & outro velocities, and compute deltas for new 
    //    compiled path based on interpolated velocity over the path (knowing it's length and transition time)

    var current = this.attrimators;
    var attrimators = attrimatorMap.values;

    // If transition all attributes, 
    if ( all )
    {
      this.finishNotPresent( attrimatorMap, transition.time );
    }

    // Only transition if we need to
    if ( current.hasOverlap( attrimatorMap ) )
    {
      for (var i = attrimators.length - 1; i >= 0; i--)
      {
        var next = attrimators[ i ];
        var attr = next.attribute;
        var curr = current.get( attr );

        if ( curr && anim8.isDefined( this.frame[ attr ] ) )
        {
          var attribute = this.getAttribute( attr );
          var calc = attribute.calculator;

          var p2 = next.valueAt( 0, calc.create() );
          
          if ( p2 !== false )
          {
            var transitionTime = transition.time;
            var p0 = calc.clone( this.frame[ attr ] );            
            var p1 = transition.outro ? curr.valueAt( curr.getElapsed() + transition.outro, calc.create() ) : false;
            var p3 = transition.intro ? next.valueAt( transition.intro, calc.create() ) : false;
            var path = null;

            // If the intro is negative we can look into the past by looking a little bit into
            // the future and assume the past is going in the same direction (only the opposite). 
            if ( p3 !== false && transition.intro < 0 && transition.lookup > 0 )
            {
              var pastLookahead = next.valueAt( transition.lookup, calc.create() );
              var pastVelocity = calc.sub( pastLookahead, p2 );

              if ( pastVelocity !== false )
              {
                var pastNegativeVelocity = calc.scale( pastVelocity, transition.intro / transition.lookup );
                var past = calc.add( pastNegativeVelocity, p2 );
                
                p3 = p2;
                p2 = past;
              }
            }

            // Build a path with as many of the points as possible.
            if ( p1 === false && p3 === false )
            {
              path = new anim8.Tween( attr, calc, p0, p2 );
            }
            else if ( p1 === false )
            {
              path = new anim8.PathQuadratic( attr, calc, p0, p2, p3 );
            }
            else if ( p3 === false )
            {
              path = new anim8.PathQuadratic( attr, calc, p0, p1, p2 );
            }
            else
            {
              path = new anim8.PathCubic( attr, calc, p0, p1, p2, p3 );
            }
            
            // If granularity is specified we will try to make the transition 
            // smooth by maintaining exit (outro) velocity from the current attrimator
            // and interpolating it to the entrance (intro) velocity for the 
            // attrimator we're transitioning into.
            if ( transition.granularity > 2 && transition.lookup > 0 )
            { 
              var outTime  = p1 === false ? curr.getElapsed() : curr.getElapsed() + transition.outro;
              var outPoint = p1 === false ? p0 : p1;
              var outNext  = curr.valueAt( outTime + transition.lookup, calc.create() );

              var inTime   = p3 === false ? 0 : transition.intro;
              var inPoint  = p3 === false ? p2 : p3;
              var inNext   = next.valueAt( inTime + transition.lookup, calc.create() );

              // We can only proceed if we have reference points to calculate
              // exit & entrance velocity.
              if ( outNext !== false && inNext !== false )
              {
                var outVelocity  = calc.sub( calc.clone( outNext ), outPoint );
                var outPerMillis = calc.length( outVelocity ) / transition.lookup;

                var inVelocity   = calc.sub( calc.clone( inNext ), inPoint );
                var inPerMillis  = calc.length( inVelocity ) / transition.lookup;

                var compiled = new anim8.PathCompiled( attr, path, transition.granularity );
                var points = compiled.points;
                var lastPoint = points.length - 1;
                var totalDistance = 0;
                var distances = [];

                for (var k = 0; k < lastPoint; k++)
                {
                  distances[ k ] = totalDistance;
                  totalDistance += calc.distance( points[ k ], points[ k + 1 ] );
                }
                distances[ lastPoint ] = totalDistance;

                if ( !isNaN( totalDistance ) )
                {
                  var requiredTime = 2.0 * totalDistance / (outPerMillis + inPerMillis);
                  var acceleration = 0.5 * (inPerMillis - outPerMillis) / requiredTime;
                  var timeDelta = requiredTime / lastPoint;
                  var deltas = [];

                  for (var k = 0; k < lastPoint; k++)
                  { 
                    var time = k * timeDelta;
                    var position = outPerMillis * time + acceleration * time * time;

                    deltas[ k ] = position / totalDistance;
                  }
                  deltas[ lastPoint ] = 1.0;

                  path = new anim8.PathDelta( attr, calc, points, deltas );
                  transitionTime = requiredTime;
                }
              }
            }

            var transitionEvent = new anim8.Event( attr, path, transitionTime, transition.easing, 0, 0, 0, 1 );
          
            transitionEvent.next = next;
            transitionEvent.cycle = next.cycle;

            next.offset = transition.intro;

            this.placeAttrimator( transitionEvent );
          }
          else
          {
            curr.stopIn( transition.time + next.delay );
            curr.queue( next );
            next.delay = 0;
          }
        }
        else
        {
          next.delay += transition.time;
          
          this.placeAttrimator( next );
        }
      }
    }
    // We don't need to transition, just play the events
    else
    {
      for (var i = attrimators.length - 1; i >= 0; i--)
      {
        this.placeAttrimator( attrimators[ i ] );
      }
    }
    
    return this;
  },

  /**
   * Finishes any attrimators on this animator that are not present in the given
   * map of attrimators. Optionally a delay in stopping them can be given.
   * 
   * @method finishNotPresent
   * @param {AttrimatorMap} attrimatorMap
   * @param {Number} [delay=0]
   * @chainable
   * @protected
   */
  finishNotPresent: function(attrimatorMap, delay)
  {
    var attrimators = this.attrimators.values;
    var stopIn = delay || 0;

    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      var attrimator = attrimators[ i ];

      if ( !attrimatorMap.has( attrimator.attribute ) )
      {
        attrimator.stopIn( stopIn );
      }
    }

    return this;
  },

  /**
   * Tweens a single attribute to a target value.
   *
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method tweenTo
   * @param {String} attr
   * @param {T} target
   * @param {String|Array|Object} [options]
   * @chainable
   */
  tweenTo: function(attr, target, options)
  {
    var options   = anim8.options( options );
    var attribute = this.getAttribute( attr );
    var end       = attribute.parse( target );
    var path      = new anim8.Tween( attr, attribute.calculator, anim8.computed.current, end );
    var event     = anim8.Event.fromOptions( attr, path, options );
    
    this.newCycle( event );
    this.placeAttrimator( event );
    
    return this.activate();
  },

  /**
   * Tweens multiple attributes to target values.
   *
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method tweenManyTo
   * @param {Object} targets
   * @param {String|Array|Object} [options]
   * @chainable
   */
  tweenManyTo: function(targets, options)
  {
    var options = anim8.options( options );

    this.newCycle();

    for ( var attr in targets )
    {
      var attribute = this.getAttribute( attr );
      var end       = attribute.parse( targets[ attr ] );
      var path      = new anim8.Tween( attr, attribute.calculator, anim8.computed.current, end );
      var event     = anim8.Event.fromOptions( attr, path, options );
      
      event.cycle = this.cycleNext;
      this.placeAttrimator( event );
    }

    return this.activate();
  },

  /**
   * Tweens a single attribute from a starting value to the current value.
   *
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method tweenFrom
   * @param {String} attr
   * @param {T} starting
   * @param {String|Array|Object} [options]
   * @chainable
   */
  tweenFrom: function(attr, starting, options)
  {
    var options   = anim8.options( options );
    var attribute = this.getAttribute( attr );
    var start     = attribute.parse( starting );
    var path      = new anim8.Tween( attr, attribute.calculator, start, anim8.computed.current );
    var event     = anim8.Event.fromOptions( attr, path, options );
    
    this.newCycle( event );
    this.placeAttrimator( event );
    
    return this.activate();
  },

  /**
   * Tweens multiple attributes from starting values to the current values.
   *
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method tweenManyFrom
   * @param {Object} startings
   * @param {String|Array|Object} [options]
   * @chainable
   */
  tweenManyFrom: function(startings, options)
  {
    var options = anim8.options( options );

    this.newCycle();

    for ( var attr in startings )
    {
      var attribute = this.getAttribute( attr );
      var start     = attribute.parse( startings[ attr ] );
      var path      = new anim8.Tween( attr, attribute.calculator, start, anim8.computed.current );
      var event     = anim8.Event.fromOptions( attr, path, options );
      
      event.cycle = this.cycleNext;
      this.placeAttrimator( event );
    }

    return this.activate();
  },
  
  /**
   * Tweens an attribute from a starting value to an ending value.
   *
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method tween
   * @param {String} attr
   * @param {T} starts
   * @param {T} ends
   * @param {String|Array|Object} [options]
   * @chainable
   */
  tween: function(attr, starts, ends, options)
  {
    var options   = anim8.options( options );
    var attribute = this.getAttribute( attr );
    var start     = attribute.parse( starts );
    var end       = attribute.parse( ends );
    var path      = new anim8.Tween( attr, attribute.calculator, start, end );
    var event     = anim8.Event.fromOptions( attr, path, options );
    
    this.newCycle( event );
    this.placeAttrimator( event );

    return this.activate();
  },
  
  /**
   * Tweens multiple attributes from starting values to ending values.
   *
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method tweenMany
   * @param {Object} starts
   * @param {Object} ends
   * @param {String|Array|Object} [options]
   * @chainable
   */
  tweenMany: function(starts, ends, options)
  {
    var options = anim8.options( options );

    this.newCycle();

    for ( var attr in starts )
    {
      var attribute = this.getAttribute( attr );
      var start     = attribute.parse( starts[ attr ] );
      var end       = attribute.parse( ends[ attr ] );
      var path      = new anim8.Tween( attr, attribute.calculator, start, end );
      var event     = anim8.Event.fromOptions( attr, path, options );
      
      event.cycle = this.cycleNext;
      this.placeAttrimator( event );
    }

    return this.activate();
  },

  /**
   * Moves an attribute relative to its current value.
   * 
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method move
   * @param {String} attr
   * @param {T} amount
   * @param {String|Array|Object} [options]
   * @chainable
   */
  move: function(attr, amount, options)
  {
    var options   = anim8.options( options );
    var attribute = this.getAttribute( attr );
    var relative  = attribute.parse( amount );
    var start     = anim8.computed.current;
    var end       = anim8.isComputed( relative ) ? relative : anim8.computed.relative( relative );
    var path      = new anim8.Tween( attr, attribute.calculator, start, end );
    var event     = anim8.Event.fromOptions( attr, path, options );
    
    this.newCycle( event );
    this.placeAttrimator( event );

    return this.activate();
  },

  /**
   * Moves multiple attribute relative to their current value.
   * 
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method moveMany
   * @param {Object} amounts
   * @param {String|Array|Object} [options]
   * @chainable
   */
  moveMany: function(amounts, options)
  {
    var options = anim8.options( options );

    this.newCycle();

    for ( var attr in amounts )
    {
      var attribute = this.getAttribute( attr );
      var relative  = attribute.parse( amounts[ attr ] );
      var start     = anim8.computed.current;
      var end       = anim8.isComputed( relative ) ? relative : anim8.computed.relative( relative );
      var path      = new anim8.Tween( attr, attribute.calculator, start, end );
      var event     = anim8.Event.fromOptions( attr, path, options );
      
      event.cycle = this.cycleNext;
      this.placeAttrimator( event );
    }

    return this.activate();
  },
  
  /**
   * Returns a function that returns the current value for the given attribute 
   * when invoked. The returned function can be given as values for paths & 
   * springs that are evaluated every frame.
   * 
   * @method ref
   * @param {String} attr
   * @return {Function}
   */
  ref: function(attr)
  {
    var animator = this;
    var attribute = this.getAttribute( attr );
    var request = {};
    
    return function()
    {
      if ( attr in animator.frame )
      {
        return animator.frame[ attr ];
      }
      
      request[ attr ] = true;
      
      var current = animator.get( request );
      
      if ( anim8.isDefined( current[ attr ] ) )
      {
        return current[ attr ];
      }
      
      return attribute.defaultValue;
    };
  },
  
  /**
   * Follows the attribute along the given path definition.
   * 
   * **See:** {{#crossLink "Core/anim8.options:method"}}{{/crossLink}}
   * 
   * @method follow
   * @param {String} attr
   * @param {Path|Object|String} path
   * @param {Object} [options]
   * @chainable
   */
  follow: function(attr, path, options)
  {
    var options = anim8.options( options );
    var path    = anim8.path( path );
    var event   = anim8.Event.fromOptions( attr, path, options );
    
    this.newCycle( event );
    this.placeAttrimator( event );
    
    return this.activate();
  },
  
  /**
   * Helper method that iterates over given attributes. If callback is specified
   * it is invoked for each attrimator in this animator for the given 
   * attributes. If no callback is given an array of anim8.Attrimators is 
   * returned for each attrimator in this animator for the given attributes.
   *
   * @method attrimatorsFor
   * @param {String|Array} attributes
   * @param {Function} callback
   * @return {this|Array}
   */
  attrimatorsFor: function(attributes, callback)
  {
    if ( anim8.isString( attributes ) )
    {
      attributes = attributes.split( ' ' );
    }
   
    var attrimatorMap = this.attrimators; 
    var resulting = !anim8.isFunction( callback );
    var results = [];
    
    if ( anim8.isArray( attributes ) )
    {
      for (var i = 0; i < attributes.length; i++)
      {
        var attr = attributes[i];
        var attrimator = attrimatorMap.get( attr );
        
        if ( attrimator )
        {
          if ( resulting )
          {
            results.push( attrimator );
          }
          else
          {
            callback.call( this, attrimator, attr );
          }
        }
      }
    }
    else
    {
      var attrimators = attrimatorMap.values;

      for (var i = attrimators.length - 1; i >= 0; i--)
      {
        var attrimator = attrimators[ i ];

        if ( resulting )
        {
          results.push( attrimator );
        }
        else
        {
          callback.call( this, attrimator, attrimator.attribute );
        }
      }
    }
    
    return resulting ? results : this;
  },
  
  /**
   * Stops all attributes for the specified attributes. Attribute names can be 
   * given as an array or a space separated string. If no attributes are given 
   * all attributes are assumed.
   *
   * @method stop
   * @param {String|Array} [attributes]
   * @chainable
   */
  stop: function(attributes)
  {
    return this.attrimatorsFor( attributes, function(attrimator, attr) 
    {
      this.attrimators.remove( attr );
    });
  },
  
  /**
   * Ends all attributes for the specified attributes. If attributes are queued 
   * the last value of the last attribute is applied to this Animator before 
   * being completely removed. Attribute names can be given as an array or a 
   * space separated string. If no attributes are given all attributes are 
   * assumed.
   *
   * @method end
   * @param {String|Array} [attributes]
   * @chainable
   */
  end: function(attributes)
  {
    return this.attrimatorsFor( attributes, function(attrimator) 
    {
      while (attrimator.next)
      {
        attrimator = attrimator.next;
      }
      
      attrimator.finish( this.frame );
    });
  },
  
  /**
   * Finishes all current attrimators for the specified attributes. Attribute 
   * names can be given as an array or a space separated string. If no 
   * attributes are given all attributes are assumed.
   *
   * @method finish
   * @param {String|Array} [attributes]
   * @chainable
   */
  finish: function(attributes)
  {
    return this.attrimatorsFor( attributes, function(attrimator)
    {
      attrimator.finish( this.frame );
    });
  },

  /**
   * Calls nopeat on all current attrimators for the specified attributes.
   * Attribute names can be given as an array or a space separated string. If
   * no attributes are given all attributes are assumed. 
   *
   * **See:** {{#crossLink "Attrimator/nopeat:method"}}Attrimator.nopeat{{/crossLink}}
   * 
   * @method nopeat
   * @param {String|Array} [attributes]
   * @chainable
   */
  nopeat: function(attributes)
  {
    return this.attrimatorsFor( attributes, function(attrimator)
    {
      attrimator.nopeat();
    });
  },
  
  /**
   * Pauses all current attrimators for the specified attributes. Attribute 
   * names can be given as an array or a space separated string. If no 
   * attributes are given all attributes are assumed.
   *
   * @method pause
   * @param {String|Array} [attributes]
   * @chainable
   */
  pause: function(attributes)
  {
    return this.attrimatorsFor( attributes, function(attrimator)
    {
      attrimator.pause();
    });
  },
  
  /**
   * Resumes all current attrimators for the specified attributes. Attribute 
   * names can be given as an array or a space separated string. If no 
   * attributes are given all attributes are assumed.
   *
   * @method resume
   * @param {String|Array} [attributes]
   * @chainable
   */
  resume: function(attributes)
  {
    return this.attrimatorsFor( attributes, function(attrimator)
    {
      attrimator.resume();
    });
  },
  
  /**
   * Sets the given attributes to this Animator immediately.
   *
   * @method set
   * @param {Object} attributes
   * @chainable
   */
  set: function(attributes)
  {
    for (var attr in attributes)
    {
      this.frame[ attr ] = attributes[ attr ];
      this.updated[ attr ] = true;
    }
    
    this.apply();
    
    return this;
  },

  /**
   * Unsets the attribute, array of attributes, or object of attributes. 
   * Unsetting involves removing all attrimators and the current value in the 
   * frame,
   * 
   * @method unset
   * @param {String|Array|Object} attributes
   * @chainable
   */
  unset: function(attributes)
  {
    if ( anim8.isString( attributes ) )
    {
      this.attrimators.remove( attributes );
      delete this.frame[ attributes ];
    }
    else if ( anim8.isArray( attributes ) )
    {
      for (var i = 0; i < attributes.length; i++)
      {
        this.unset( attributes[ i ] );
      }
    }
    else if ( anim8.isObject( attributes ) )
    {
      for (var attr in attributes)
      {
        this.unset( attr );
      }
    }

    return this;
  },
  
  /**
   * Gets the current attribute values for all attributes specified. The 
   * argument must be an object where the key is the name of an attribute.
   *
   * @method get
   * @param {Object} attributes
   * @return {Object}
   */
  get: function(attributes)
  {
    var out = {};
    
    for (var attr in attributes)
    {
      out[ attr ] = this.frame[ attr ];
    }
    
    return out;
  },

  /**
   * Returns the amount of finite time remaining before the animator is done
   * animating. Attrimators that don't have a known end time are not included.
   * If there are no attrimators with end times then zero is returned.
   *
   * @method timeRemaining
   * @return {Number}
   */
  timeRemaining: function()
  {
    return this.attrimators.timeRemaining();
  },
  
  /**
   * Returns true if there are any attrimators on this Animator.
   *
   * @method hasAttrimators
   * @return {Boolean}
   */
  hasAttrimators: function()
  {
    return this.attrimators.size() > 0;
  },
  
  /**
   * Returns the subject of the Animator optionally passing it through a wrapper
   * function before it's returned.
   *
   * @method getSubject
   * @param {Function} [wrapper]
   * @return {Any}
   */
  getSubject: function(wrapper)
  {
    var subject = this.subject;

    if ( anim8.isFunction( wrapper ) )
    {
      subject = wrapper( subject );
    }

    return subject;
  },

  /**
   * Invokes a function with the given context or the context of this Animator 
   * if none is given. This is particularly useful for having a function be 
   * called on deferred statements.
   * 
   * @method invoke
   * @param {Function} func
   * @param {Object} [context]
   * @param {Array} [args]
   * @chainable
   */
  invoke: function(func, context, args)
  {
    if ( anim8.isFunction( func ) )
    {
      func.apply( context || this, args || [] );
    }

    return this;
  },
  
  /**
   * Defers the method calls following this one to when the given event type 
   * (on or once) and event. To return this animator you need to call undefer() 
   * as many times as you called defer().
   *
   * @method defer
   * @param {String} eventType
   * @param {String} event
   * @param {Function} [callback]
   * @return {DeferAnimator}
   */
  defer: function(eventType, event, callback)
  {
    return new anim8.DeferAnimator( this, this, eventType, event, callback );
  },

  /**
   * Invokes the given callback when the last animation that was 
   * played/queued/transitioned starts.
   * 
   * @method onCycleStart
   * @param {Function} callback
   * @param {Object} [context]
   * @chainable
   */
  onCycleStart: function(callback, context)
  {
    this.once( 'cycleStart:' + this.cycleNext, callback, context );

    return this;
  },

  /**
   * Invokes the given callback when the last animation that was
   * played/queued/transitioned ends.
   * 
   * @method onCycleEnd
   * @param {Function} callback
   * @param {Object} [context]
   * @chainable
   */
  onCycleEnd: function(callback, context)
  {
    this.once( 'cycleEnd:' + this.cycleNext, callback, context );

    return this;
  }
  
};

/**
 * Adds the following event methods to Animators: on, once, off, trigger.
 */
anim8.eventize( anim8.Animator.prototype );

/**
 * Provides the ability to defer method calls until certain events are triggered.
 *
 * @class DeferAnimator
 * @constructor
 * @extends Defer
 */
anim8.DeferAnimator = function(animator, previous, eventType, event)
{
  this.$reset( animator, previous, eventType, event );
};

/**
 * Creates the Defer prototype for the following Animator methods.
 */
anim8.DeferAnimator.prototype = new anim8.Defer( anim8.DeferAnimator, 
[
  /**
   * Defers the {{#crossLink "Animator/restore:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'restore', 

  /**
   * Defers the {{#crossLink "Animator/placeAttrimator:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method placeAttrimator
   */
  'placeAttrimator', 

  /**
   * Defers the {{#crossLink "Animator/applyInitialState:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method applyInitialState
   */
  'applyInitialState',

  /**
   * Defers the {{#crossLink "Animator/preupdate:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method preupdate
   */
  'preupdate', 

  /**
   * Defers the {{#crossLink "Animator/update:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method update
   */
  'update', 

  /**
   * Defers the {{#crossLink "Animator/apply:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method apply
   */
  'apply', 

  /**
   * Defers the {{#crossLink "Animator/trimAttrimators:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   * @protected
   */
  'trimAttrimators',

  /**
   * Defers the {{#crossLink "Animator/activate:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'activate', 

  /**
   * Defers the {{#crossLink "Animator/deactivate:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'deactivate', 

  /**
   * Defers the {{#crossLink "Animator/destroy:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'destroy', 

  /**
   * Defers the {{#crossLink "Animator/spring:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'spring', 

  /**
   * Defers the {{#crossLink "Animator/play:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'play', 

  /**
   * Defers the {{#crossLink "Animator/playAttrimators:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   * @protected
   */
  'playAttrimators', 

  /**
   * Defers the {{#crossLink "Animator/queue:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'queue',

  /**
   * Defers the {{#crossLink "Animator/queueAttrimators:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   * @protected
   */
  'queueAttrimators', 

  /**
   * Defers the {{#crossLink "Animator/transition:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'transition', 

  /**
   * Defers the {{#crossLink "Animator/transitionAttrimators:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   * @protected
   */
  'transitionAttrimators', 

  /**
   * Defers the {{#crossLink "Animator/tween:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'tween', 

  /**
   * Defers the {{#crossLink "Animator/tweenTo:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'tweenTo', 

  /**
   * Defers the {{#crossLink "Animator/tweenMany:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'tweenMany', 

  /**
   * Defers the {{#crossLink "Animator/tweenManyTo:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'tweenManyTo', 

  /**
   * Defers the {{#crossLink "Animator/tweenFrom:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'tweenFrom', 

  /**
   * Defers the {{#crossLink "Animator/tweenManyFrom:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'tweenManyFrom',

  /**
   * Defers the {{#crossLink "Animator/move:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'move', 

  /**
   * Defers the {{#crossLink "Animator/moveMany:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'moveMany',

  /**
   * Defers the {{#crossLink "Animator/follow:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'follow', 

  /**
   * Defers the {{#crossLink "Animator/stop:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'stop', 

  /**
   * Defers the {{#crossLink "Animator/end:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'end', 

  /**
   * Defers the {{#crossLink "Animator/finish:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'finish', 

  /**
   * Defers the {{#crossLink "Animator/pause:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'pause', 

  /**
   * Defers the {{#crossLink "Animator/resume:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'resume',

  /**
   * Defers the {{#crossLink "Animator/set:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'set', 

  /**
   * Defers the {{#crossLink "Animator/unset:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'unset', 

  /**
   * Defers the {{#crossLink "Animator/get:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'get', 

  /**
   * Defers the {{#crossLink "Animator/invoke:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'invoke', 

  /**
   * Defers the {{#crossLink "Animator/onCycleStart:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'onCycleStart', 

  /**
   * Defers the {{#crossLink "Animator/onCycleEnd:method"}}{{/crossLink}} method until the deferred event has occurred.
   *
   * @method restore
   */
  'onCycleEnd'
]);


/**
 * Instantiates an Array of {{#crossLink "Animator"}}{{/crossLink}} instances.
 * 
 * @param {Array} [input]
 * @class Animators
 * @constructor
 * @extends {Array}
 */
anim8.Animators = function(input)
{
  if ( anim8.isArray( input ) )
  {
    this.fill( input );
  }
};

/**
 * Animators is an instance of Array. All array methods are supported.
 */
anim8.override( anim8s.fn = anim8.Animators.prototype = new Array(),
{

  /**
   * Invokes a callback for each element in the array.
   *
   * @method each
   * @param {Function} iterator
   * @param {Object} context
   * @chainable
   */
  each: function(iterator, context) 
  {
    for (var i = 0; i < this.length; i++) 
    {
      if ( iterator.call( context || this[i], this[i], i ) === false ) 
      {
        break;
      }
    }
    
    return this;
  },

  /**
   * Appends the array of animators given to the end of this array.
   *
   * @method fill
   * @param {Array} animators
   * @chainable
   */
  fill: function(animators)
  {
    for (var i = 0; i < animators.length; i++)
    {
      this.push( animators[i] );
    }

    return this;
  },

  /**
   * Invokes a callback for each element in the array and if a true value is
   * returned  that element is removed from the array.
   *
   * @method filter
   * @param {Function} filterer
   * @chainable
   */
  filter: function(filterer)
  {  
    var alive = 0;
    
    for (var i = 0; i < this.length; i++)
    {
      var remove = filterer( this[i] );
      
      if ( !remove )
      {
        this[alive++] = this[i];
      }
    }
    
    this.length = alive;
    
    return this;
  },

  /**
   * Returns the subjects of the Animators optionally passing them through a 
   * wrapper function before it's returned.
   *
   * @method getSubjects
   * @param {Function} [wrapper]
   * @return {Any}
   */
  getSubjects: function(wrapper)
  {
    var subjects = [];

    for (var i = 0; i < this.length; i++)
    {
      subjects.push( this[i].subject );
    }

    if ( anim8.isFunction( wrapper ) )
    {
      subjects = wrapper( subjects );
    }
    
    return subjects;
  },

  /**
   * Returns the first animator in the array.
   *
   * @method first
   * @return {Animator}
   */
  first: function()
  {
    return this[0];
  },

  /**
   * Reverses the order of animators in the array.
   *
   * @method reverse
   * @chainable
   */
  reverse: function()
  {
    var last = this.length - 1;
    var mid = Math.floor( this.length / 2 );

    for (var i = 0; i < mid; i++)
    {
      var e0 = this[ i ];
      var e1 = this[ last - i ];

      this[ i ] = e1;
      this[ last - i ] = e0;
    }

    return this;
  },

  /**
   * Activates all Animators in the array if they aren't active already.
   *
   * @method activate
   * @chainable
   */
  activate: function()
  {
    for (var i = 0; i < this.length; i++)
    {
      var animator = this[i];

      if ( !animator.active )
      {
        animator.active = true;
        anim8.animating.push( animator ); 
      }
    }
    
    if ( !anim8.running )
    {
      anim8.running = true;
      anim8.trigger('starting');
      anim8.requestRun( anim8.run );
    }
    
    return this;
  },

  /**
   * Creates a sequence of events separated by a delay.
   *
   * @method sequence
   * @param {String|Number} delay
   * @param {String|Array|Function} easing
   * @return {Sequence}
   */
  sequence: function(delay, easing)
  {
    return new anim8.Sequence( this, delay, easing );
  },

  /**
   * Returns the maximum time remaining out of all Animators in the array.
   *
   * **See:** {{#crossLink "Animating/timeRemaining:method"}}{{/crossLink}}
   *
   * @method timeRemaining
   * @return {Number}
   */
  timeRemaining: function()
  {
    var maxRemaining = 0;

    for (var i = 0; i < this.length; i++)
    {
      maxRemaining = Math.max( maxRemaining, this[ i ].timeRemaining() );
    }

    return maxRemaining;
  },

  /**
   * Calls {{#crossLink "Animator/restore:method"}}{{/crossLink}} on each 
   * animator in the array and returns this.
   * 
   * @method restore
   * @chainable
   */
  restore               : anim8.delegate( 'restore', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/placeAttrimator:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method placeAttrimator
   * @chainable
   */
  placeAttrimator       : anim8.delegate( 'placeAttrimator', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/applyInitialState:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method applyInitialState
   * @chainable
   */
  applyInitialState     : anim8.delegate( 'applyInitialState', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/preupdate:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method preupdate
   * @chainable
   */
  preupdate             : anim8.delegate( 'preupdate', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/update:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method update
   * @chainable
   */
  update                : anim8.delegate( 'update', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/apply:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method apply
   * @chainable
   */
  apply                 : anim8.delegate( 'apply', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/trimAttrimators:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method trimAttrimators
   * @chainable
   */
  trimAttrimators       : anim8.delegate( 'trimAttrimators', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/activate:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method activate
   * @chainable
   */
  activate              : anim8.delegate( 'activate', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/deactivate:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method deactivate
   * @chainable
   */
  deactivate            : anim8.delegate( 'deactivate', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/destroy:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method destroy
   * @chainable
   */
  destroy               : anim8.delegate( 'destroy', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/spring:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method spring
   * @chainable
   */
  spring                : anim8.delegate( 'spring', anim8.delegate.RETURN_RESULTS ),

  /**
   * Calls {{#crossLink "Animator/play:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method play
   * @chainable
   */
  play                  : anim8.delegate( 'play', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/playAttrimators:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method playAttrimators
   * @chainable
   * @protected
   */
  playAttrimators       : anim8.delegate( 'playAttrimators', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/queue:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method queue
   * @chainable
   */
  queue                 : anim8.delegate( 'queue', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/queueAttrimators:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method queueAttrimators
   * @chainable
   * @protected
   */
  queueAttrimators      : anim8.delegate( 'queueAttrimators', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/transition:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method transition
   * @chainable
   */
  transition            : anim8.delegate( 'transition', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/transitionAttrimators:method"}}{{/crossLink}} 
   * on each animator in the array and returns this.
   * 
   * @method transitionAttrimators
   * @chainable
   * @protected
   */
  transitionAttrimators : anim8.delegate( 'transitionAttrimators', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/tween:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method tween
   * @chainable
   */
  tween                 : anim8.delegate( 'tween', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/tweenTo:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method tweenTo
   * @chainable
   */
  tweenTo               : anim8.delegate( 'tweenTo', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/tweenFrom:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method tweenFrom
   * @chainable
   */
  tweenFrom             : anim8.delegate( 'tweenFrom', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/tweenMany:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method tweenMany
   * @chainable
   */
  tweenMany             : anim8.delegate( 'tweenMany', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/tweenManyTo:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method tweenManyTo
   * @chainable
   */
  tweenManyTo           : anim8.delegate( 'tweenManyTo', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/tweenManyFrom:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method tweenManyFrom
   * @chainable
   */
  tweenManyFrom         : anim8.delegate( 'tweenManyFrom', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/move:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method move
   * @chainable
   */
  move                  : anim8.delegate( 'move', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/moveMany:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method moveMany
   * @chainable
   */
  moveMany              : anim8.delegate( 'moveMany', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/follow:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method follow
   * @chainable
   */
  follow                : anim8.delegate( 'follow', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/attrimatorsFor:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method attrimatorsFor
   * @chainable
   */
  attrimatorsFor        : anim8.delegate( 'attrimatorsFor', anim8.delegate.RETURN_RESULTS ),

  /**
   * Calls {{#crossLink "Animator/stop:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method stop
   * @chainable
   */
  stop                  : anim8.delegate( 'stop', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/end:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method end
   * @chainable
   */
  end                   : anim8.delegate( 'end', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/finish:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method finish
   * @chainable
   */
  finish                : anim8.delegate( 'finish', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/pause:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method pause
   * @chainable
   */
  pause                 : anim8.delegate( 'pause', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/resume:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method resume
   * @chainable
   */
  resume                : anim8.delegate( 'resume', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/set:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method set
   * @chainable
   */
  set                   : anim8.delegate( 'set', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/unset:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method unset
   * @chainable
   */
  unset                 : anim8.delegate( 'unset', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/get:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method get
   * @chainable
   */
  get                   : anim8.delegate( 'get', anim8.delegate.RETURN_FIRST ),

  /**
   * Calls {{#crossLink "Animator/hasAttrimators:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method hasAttrimators
   * @chainable
   */
  hasAttrimators        : anim8.delegate( 'hasAttrimators', anim8.delegate.RETURN_TRUE ),

  /**
   * Calls {{#crossLink "Animator/invoke:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method invoke
   * @chainable
   */
  invoke                : anim8.delegate( 'invoke', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/onCycleStart:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method onCycleStart
   * @chainable
   */
  onCycleStart          : anim8.delegate( 'onCycleStart', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/onCycleEnd:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method onCycleEnd
   * @chainable
   */
  onCycleEnd            : anim8.delegate( 'onCycleEnd', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/on:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method on
   * @chainable
   */
  on                    : anim8.delegate( 'on', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/once:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method once
   * @chainable
   */
  once                  : anim8.delegate( 'once', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/off:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method off
   * @chainable
   */
  off                   : anim8.delegate( 'off', anim8.delegate.RETURN_THIS ),

  /**
   * Calls {{#crossLink "Animator/trigger:method"}}{{/crossLink}} on 
   * each animator in the array and returns this.
   * 
   * @method trigger
   * @chainable
   */
  trigger               : anim8.delegate( 'trigger', anim8.delegate.RETURN_THIS )

});


/**
 * @class Core
 */

/**
 * Whether the animation cycle is currently running. This is true
 * when where are active animators and anim8.run is being called
 * and false otherwise.
 *
 * @property {Boolean} anim8.running
 * @readOnly
 */
anim8.running = false;

/**
 * Live Mode keeps the animation cycles running even when there aren't
 * Animators. For highly interactive applications enabling this may
 * take up more resources but it will result in smoother animations. When
 * the animation cycle goes from stopped to running it takes a few frames
 * to smooth out when this is false.
 *
 * @property {Boolean} anim8.live
 */
anim8.live = false;

/**
 * The anim8 instance for all active animators.
 *
 * @property {Animators} anim8.animating
 * @readOnly
 */
anim8.animating = new anim8.Animators();

/**
 * The function to call if animations need to be done.
 *
 * @method anim8.requestRun
 * @param {Function} callback
 */
anim8.requestRun = (function() 
{  
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  var requestor = window.requestAnimationFrame;
  
  for (var x = 0; x < vendors.length && !requestor; ++x) 
  {
    requestor = window[ vendors[x] + 'RequestAnimationFrame' ];
  }
  
  if (!requestor)
  {
    var lastTime = 0;
    
    return function(callback)
    {
      var now = anim8.now();
      var timeToCall = Math.max( 1, anim8.defaults.frameRate - (now - lastTime) );
      var id = window.setTimeout( function() { callback( now + timeToCall ); }, timeToCall );
      lastTime = now + timeToCall;
      return id;
    };
  }
  
  return function(callback)
  {
    requestor( callback );
  };
  
})();

/**
 * Adds an animator to the list of animating if it isn't there already. If the 
 * animation loop isn't currently running it's started.
 *
 * @method anim8.add
 * @param {Animator} animator
 */
anim8.add = function(animator)
{
  if ( !animator.active )
  {
    anim8.animating.push( animator );
    
    animator.active = true;
  }
  
  if ( !anim8.running )
  {
    anim8.running = true;
    anim8.trigger('starting');
    anim8.requestRun( anim8.run );
  }
}

/**
 * Executes an animation loop cycle which consists of four operations:
 * 
 * 1. Call preupdate on all Animators
 * 2. Call update on all Animators
 * 3. Call apply on all Animators
 * 4. Remove finished Animators
 * 
 * When there are no more animating the loop cycle is stopped.
 *
 * @method anim8.run
 */
anim8.run = function() 
{
  anim8.trigger('begin');
  
  var now = anim8.now();
  
  // notify animators that we're about to update
  anim8.animating.each(function(animator)
  {
    animator.preupdate( now );
  });
  
  // update animating based on the current time
  anim8.animating.each(function(animator)
  {
    animator.update( now );
  });
  
  // apply the attributes calculated
  anim8.animating.each(function(animator)
  {
    animator.apply();
  });
  
  // if the animator is done remove it
  anim8.animating.filter(function(animator)
  {
    if ( animator.finished )
    {
      animator.deactivate();
      animator.active = false;
    }
    
    return animator.finished;
  });
  
  anim8.trigger('end');
  
  // if there are animators still remaining call me again!
  if ( anim8.animating.length || anim8.live )
  {
    anim8.requestRun( anim8.run );
  } 
  else 
  {
    anim8.running = false;
    anim8.trigger('finished');
  }
};

/**
 * Pauses all animators.
 *
 * **See:** {{#crossLink "Animator/pause:method"}}{{/crossLink}}
 *
 * @method anim8.pause
 * @param {String|Array} attributes
 * @return {anim8}
 */
anim8.pause = function(attributes)
{
  anim8.animating.pause( attributes );

  return anim8;
};

/**
 * Resumes all animators.
 * 
 * **See:** {{#crossLink "Animator/resume:method"}}{{/crossLink}}
 *
 * @method anim8.resume
 * @param {String|Array} attributes
 * @return {anim8}
 */
anim8.resume = function(attributes)
{
  anim8.animating.resume( attributes );

  return anim8;
};

/**
 * Stops all animators.
 * 
 * **See:** {{#crossLink "Animator/stop:method"}}{{/crossLink}}
 * 
 * @method anim8.stop
 * @param {String|Array} attributes
 * @return {anim8}
 */
anim8.stop = function(attributes)
{
  anim8.animating.stop( attributes );

  return anim8;
};

/**
 * Ends all animators.
 * 
 * **See:** {{#crossLink "Animator/end:method"}}{{/crossLink}}
 *
 * @method anim8.end
 * @param {String|Array} attributes
 * @return {anim8}
 */
anim8.end = function(attributes)
{
  anim8.animating.end( attributes );

  return anim8;
};

/**
 * Finishes all animators.
 * 
 * **See:** {{#crossLink "Animator/finish:method"}}{{/crossLink}}
 *
 * @method anim8.finish
 * @param {String|Array} attributes
 * @return {anim8}
 */
anim8.finish = function(attributes)
{
  anim8.animating.finish( attributes );

  return anim8;
};

/**
 * Add events to the animation cycle: begin, end, finished, starting
 */
anim8.eventize( anim8 );


/**
 * Creates a seqeuence for the given animators offseting animations be the given
 * delay and easing.
 * 
 * @param {Animators} animators
 * @param {String|Number} delay
 * @param {String|Array|Function} easing
 * @class Sequence
 * @constructor
 */
anim8.Sequence = function(animators, delay, easing)
{
  /**
   * The animators to play a sequence of animations against.
   * 
   * @property {Animators} animators
   */
  this.animators = animators;

  /**
   * The delay in milliseconds between animations.
   * 
   * @property {Number} delay
   */
  this.delay = anim8.delay( delay );

  /**
   * The easing function to use to calculate the delay offset for an animation.
   * 
   * @property {Function} easing
   */
  this.easing = anim8.easing( easing );
};

anim8.Sequence.prototype =
{
  /**
   * Returns the maximum delay for delaying generated attrimators.
   *
   * @method maxDelay
   * @return {Number}
   */
  maxDelay: function()
  {
    return this.delay * (this.animators.length - 1);
  },
  
  /**
   * Creates an AttrimatorMap with the given options for the animator at the 
   * given index.
   *
   * @method createAttrimators
   * @param {Animation} animation
   * @param {Object} options
   * @param {Number} i
   * @return {AttrimatorMap}
   */
  createAttrimators: function(animation, options, i)
  {
    var attrimatorMap = animation.newAttrimators();
    var attrimators = attrimatorMap.values;
    var delta = i / (this.animators.length - 1);
    var delayOffset = this.easing( delta ) * this.maxDelay();
    
    for (var k = attrimators.length - 1; k >= 0; k--)
    {
      attrimators[ k ].delay += delayOffset;
    }

    animation.merge( options, attrimatorMap );
    
    return attrimatorMap;
  },

  /**
   * Reverses the sequence by reversing the underlying array of animators.
   *
   * @method reverse
   * @chainable
   */
  reverse: function()
  {
    this.animators.reverse();

    return this;
  },
  
  /**
   * Plays the animation across the animators in this sequence.
   *
   * **See:** {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.options:method"}}{{/crossLink}},
   *          {{#crossLink "Animator/play:method"}}Animator.play{{/crossLink}}
   *
   * @method play 
   * @param {Animation|String|Object} animation
   * @param {String|Array|Object} [options]
   * @param {Boolean} [all=false]
   * @param {Boolean} [cache=false]
   * @chainable
   */
  play: function(animation, options, all, cache)
  {
    var options = anim8.options( options );
    var anim = anim8.animation( animation, options, cache );

    if ( anim === false )
    {
      return this;
    }

    var sequence = this;

    this.animators.each(function(animator, i)
    {
      var attrimators = sequence.createAttrimators( anim, options, i );
      animator.newCycle( attrimators );
      animator.playAttrimators( attrimators, all );       
    });
    
    return this.add();
  },
  
  /**
   * Queues the animation across the animators in this sequence.
   * 
   * **See:** {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.options:method"}}{{/crossLink}},
   *          {{#crossLink "Animator/queue:method"}}Animator.queue{{/crossLink}}
   *
   * @method queue
   * @param {Animation|String|Object} animation
   * @param {String|Array|Object} [options]
   * @param {Boolean} [cache=false]
   * @chainable
   */
  queue: function(animation, options, cache)
  {
    var options = anim8.options( options );
    var anim = anim8.animation( animation, options, cache );

    if ( anim === false )
    {
      return this;
    }

    var sequence = this;
    var maxRemaining = 0;
    var remaining = [];
    
    this.animators.each(function(animator, i)
    {
      remaining[i] = animator.timeRemaining();
      maxRemaining = Math.max( maxRemaining, remaining[i] );
    });

    this.animators.each(function(animator, i)
    {
      var delayOffset = maxRemaining - remaining[i];
      var attrimatorMap = sequence.createAttrimators( anim, options, i );
      var attrimators = attrimatorMap.values;

      for (var k = attrimators.length - 1; k >= 0; k--)
      {
        attrimators[ k ].delay += delayOffset;
      }
      
      animator.newCycle( attrimatorMap );
      animator.queueAttrimators( attrimatorMap );
    });
    
    return this.add();
  },

  /**
   * Transitions into the animation across the animators in this sequence.
   * 
   * **See:** {{#crossLink "Core/anim8.transition:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}},
   *          {{#crossLink "Core/anim8.options:method"}}{{/crossLink}},
   *          {{#crossLink "Animator/transition:method"}}Animator.transition{{/crossLink}}
   * 
   * @method transition
   * @param {String|Array|Object} transition
   * @param {Animation|String|Object} animation
   * @param {String|Array|Object} [options]
   * @param {Boolean} [all=false]
   * @param {Boolean} [cache=false]
   * @chainable
   */
  transition: function(transition, animation, options, all, cache)
  {
    var transition = anim8.transition( transition );
    var options = anim8.options( options );
    var anim = anim8.animation( animation, options, cache );

    if ( anim === false )
    {
      return this;
    }

    var sequence = this;

    this.animators.each(function(animator, i)
    {
      var attrimators = sequence.createAttrimators( anim, options, i );
      animator.newCycle( attrimators );
      animator.transitionAttrimators( transition, attrimators, all );
    });
    
    return this.add();
  },
  
  /**
   * Activates all animators in this sequence and returns this.
   *
   * **See:** {{#crossLink "Animator/activate:method"}}Animator.activate{{/crossLink}}
   * 
   * @method add
   * @chainable
   */
  add: function()
  {
    this.animators.activate();
    
    return this;
  }
  
};

/**
 * A collection of {{#crossLink "Parser"}}parsers{{/crossLink}} which takes 
 * animation definitions (an Object passed to {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}})
 * and generates {{#crossLink "Attrimator"}}Attrimators{{/crossLink}}.
 * 
 * @class anim8.parser
 */

/**
 * Returns a parser based on the input. If the input is an instance of Parser
 * it's returned immediately. If the input is a string the parser with that name 
 * is returned. If no parser could be determined then false is returned.
 *
 * **See:** {{#crossLink "anim8.parser"}}{{/crossLink}}
 * 
 * @method anim8.parser
 * @for Core
 * @param {Parser|String} parser
 * @return {Parser|false}
 */
anim8.parser = function(parser)
{
  if ( parser instanceof anim8.Parser )
  {
    return parser;
  }
  if ( anim8.isString( parser ) && parser in anim8.parser )
  {
    return anim8.parser[ parser ];
  }
  
  return false;
};


/**
 * Instantiates a new Parser. Parsers are responsible for taking animation
 * definitions (an Object passed to {{#crossLink "Core/anim8.animation:method"}}{{/crossLink}})
 * and generating & placing {{#crossLink "Attrimator"}}Attrimators{{/crossLink}} 
 * onto an {{#crossLink "AttrimatorMap"}}{{/crossLink}}.
 *
 * Parsers are added to the {{#crossLink "anim8.parser"}}{{/crossLink}} object
 * by a key and when that key exists in an animation definition, the animation
 * definition is passed to the {{#crossLink "Parser/parse:method"}}{{/crossLink}}
 * to generate {{#crossLink "Attrimator"}}Attrimators{{/crossLink}}.
 *
 * @class Parser
 * @constructor
 */
anim8.Parser = function()
{
  
};

anim8.Parser.prototype = 
{
  
  /**
   * Parses the animation object (and optionally an option object) and pushes
   * all generated attrimatorMap to the given array.
   *
   * @method parse
   * @param {Object} animation
   * @param {Object} options
   * @param {AttrimatorMap} attrimatorMap
   * @param {ParserHelper} helper
   */
  parse: function( animation, options, attrimatorMap, helper )
  {
    throw 'Parser.parse not implemented';
  },
  
  /**
   * Merges the options with the given event instances. This is when an existing 
   * animation is provided but the user wants to override the animation's options.
   *
   * Because event properties can be specified in several places there's a priority
   * to which one takes precedence. The properties specified in the animation object
   * itself are highest priority, followed by the new options, then by the old
   * options, and finally by the existing property on the event instance.
   *
   * @method merge
   * @param {Object} animation
   * @param {Object} newOptions
   * @param {Object} oldOptions
   * @param {AttrimatorMap} attrimatorMap
   * @param {ParserHelper} helper
   */
  merge: function( animation, newOptions, oldOptions, attrimatorMap, helper )
  { 
    var factory = anim8.factory( animation.factory );
    var attrimators = attrimatorMap.values;

    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      var e = attrimators[ i ];
      var attr = e.attribute;
      
      if ( e.getParser() !== this )
      {
        continue;
      }

      e.easing    = helper.mergeEasing( attr, e.easing );
      e.repeat    = helper.mergeRepeat( attr, e.repeat );
      e.delay     = helper.mergeDelay( attr, e.delay );
      e.sleep     = helper.mergeSleep( attr, e.sleep );
      e.duration  = helper.mergeDuration( attr, e.duration );
      e.offset    = helper.mergeOffset( attr, e.offset );
      e.scale     = helper.mergeScale( attr, e.scale );
      e.scaleBase = helper.mergeScaleBase( attr, e.scaleBase, factory );
    }
  }
};


/**
 * Instantiates a new instance of Parser Helper.
 *
 * @param {Object} input
 * @param {Object} oldOptions
 * @param {Object} newOptions
 * @class ParserHelper
 * @constructor
 */
anim8.ParserHelper = function( input, oldOptions, newOptions )
{
  this.input = input;
  this.oldOptions = oldOptions || {};
  this.newOptions = newOptions || {};

  this.prepareSpecifics( 'easings' );
  this.prepareSpecifics( 'repeats' );
  this.prepareSpecifics( 'delays' );
  this.prepareSpecifics( 'sleeps' );
  this.prepareSpecifics( 'durations' );
  this.prepareSpecifics( 'offsets' );
  this.prepareSpecifics( 'scales' );
  this.prepareSpecifics( 'scaleBases' );
};

anim8.ParserHelper.prototype = 
{

  /**
   * If an object with the given name doesn't exist on the input it's created.
   *
   * @method prepareSpecifics
   * @param {String} specifics
   */
  prepareSpecifics: function(specifics)
  {
    if ( !anim8.isObject( this.input[ specifics ] ) )
    {
      this.input[ specifics ] = {};
    }
  },

  /* PARSING */

  /**
   * Parses an easing from the input.
   *
   * @method parseEasing
   * @param  {String} attr
   * @return {String|Function|Array}
   */
  parseEasing: function(attr)
  {
    return this.parseFirst( attr, 'easing', 'easings' );
  },

  /**
   * Parses repeats from the input.
   * 
   * @method parseRepeat
   * @param  {String} attr
   * @return {Number}
   */
  parseRepeat: function(attr)
  {
    return this.parseNumber( attr, anim8.repeat, anim8.repeat, 'repeat', 'repeatAdd', 'repeatScale', 'repeats' );
  },

  /**
   * Parses delay from the input.
   * 
   * @method parseDelay
   * @param  {String} attr
   * @return {Number}
   */
  parseDelay: function(attr)
  {
    return this.parseNumber( attr, anim8.delay, anim8.time, 'delay', 'delayAdd', 'delayScale', 'delays' );
  },

  /**
   * Parses sleep from the input.
   * 
   * @method parseSleep
   * @param  {String} attr
   * @return {Number}
   */
  parseSleep: function(attr)
  {
    return this.parseNumber( attr, anim8.sleep, anim8.time, 'sleep', 'sleepAdd', 'sleepScale', 'sleeps' );
  },

  /**
   * Parses duration from the input.
   * 
   * @method parseDuration
   * @param  {String} attr
   * @return {Number}
   */
  parseDuration: function(attr)
  {
    return this.parseNumber( attr, anim8.duration, anim8.time, 'duration', 'durationAdd', 'durationScale', 'durations' );
  },

  /**
   * Parses offset from the input.
   * 
   * @method parseOffset
   * @param  {String} attr
   * @return {Number}
   */
  parseOffset: function(attr)
  {
    return this.parseNumber( attr, anim8.offset, anim8.time, 'offset', 'offsetAdd', 'offsetScale', 'offsets' );
  },

  /**
   * Parses scale from the input.
   * 
   * @method parseScale
   * @param  {String} attr
   * @return {Number}
   */
  parseScale: function(attr)
  {
    return this.parseNumber( attr, anim8.scale, anim8.number, 'scale', 'scaleAdd', 'scaleScale', 'scales' );
  },

  /**
   * Parses scale base from the input.
   * 
   * @method parseScaleBase
   * @param  {String} attr
   * @return {Any}
   */
  parseScaleBase: function(attr)
  {
    return this.parseFirst( attr, 'scaleBase', 'scaleBases' );
  },

  /**
   * Parses a value from the input given the attribute, option, and specific.
   * 
   * @method parseFirst
   * @param {String} attr
   * @param {String} option
   * @param {String} specifics
   * @return {Any}
   */
  parseFirst: function(attr, option, specifics)
  {
    return anim8.coalesce( this.input[ specifics ][ attr ], this.oldOptions[ option ] );
  },

  /**
   * Parses an event from the input given a path & parser for the event.
   * 
   * @method parseEvent
   * @param {String} attr
   * @param {Path} path
   * @param {Parser} parser
   * @param {Boolean} hasInitialState
   * @return {Event}
   */
  parseEvent: function(attr, path, parser, hasInitialState)
  {
    var duration   = this.parseDuration( attr );
    var easing     = this.parseEasing( attr );
    var delay      = this.parseDelay( attr );
    var sleep      = this.parseSleep( attr );
    var repeat     = this.parseRepeat( attr );
    var offset     = this.parseOffset( attr );
    var scale      = this.parseScale( attr );
    var scaleBase  = this.parseScaleBase( attr );
    var event      = new anim8.Event( attr, path, duration, easing, delay, sleep, offset, repeat, scale, scaleBase, hasInitialState, parser );

    return event;
  },

  /**
   * Parses a number from the input given parse functions.
   * 
   * @method parseNumber
   * @param {String} attr
   * @param {Function} parseFunction
   * @param {Function} parseOptionFunction
   * @param {String} option
   * @param {String} optionAdd
   * @param {String} optionScale
   * @param {String} specifics
   * @return {Number}
   */
  parseNumber: function(attr, parseFunction, parseOptionFunction, option, optionAdd, optionScale, specifics)
  {
    var baseRaw = anim8.coalesce( this.input[ specifics ][ attr ], this.oldOptions[ option ] );
    var base = parseFunction( baseRaw );
    var add = parseOptionFunction( this.oldOptions[ optionAdd ], 0 );
    var scale = anim8.coalesce( this.oldOptions[ optionScale ], 1 );

    return (add === 0 && scale === 1) ? baseRaw : (base + add) * scale;
  },

  /* MERGING */

  /**
   * Merges easing based on the input, new options, and the current easing.
   * 
   * @method mergeEasing
   * @param {String} attr
   * @param {Function} current
   * @return {Function}
   */
  mergeEasing: function(attr, current)
  {
    return this.mergeFirst( attr, current, anim8.easing, 'easing', 'easings' );
  },

  /**
   * Merges repeats based on the input, new options, and the current repeat.
   * 
   * @method mergeRepeat
   * @param {String} attr
   * @param {Number} current
   * @return {Number}
   */
  mergeRepeat: function(attr, current)
  {
    return this.mergeNumber( attr, current, anim8.repeat, 'repeat', 'repeatAdd', 'repeatScale', 'repeats' );
  },

  /**
   * Merges delay based on the input, new options, and the current delay.
   * 
   * @method mergeDelay
   * @param {String} attr
   * @param {Number} current
   * @return {Number}
   */
  mergeDelay: function(attr, current)
  {
    return this.mergeNumber( attr, current, anim8.time, 'delay', 'delayAdd', 'delayScale', 'delays' );
  },

  /**
   * Merges sleep based on the input, new options, and the current sleep.
   * 
   * @method mergeSleep
   * @param {String} attr
   * @param {Number} current
   * @return {Number}
   */
  mergeSleep: function(attr, current)
  {
    return this.mergeNumber( attr, current, anim8.time, 'sleep', 'sleepAdd', 'sleepScale', 'scales' );
  },

  /**
   * Merges duration based on the input, new options, and the current duration.
   * 
   * @method mergeDuration
   * @param {String} attr
   * @param {Number} current
   * @return {Number}
   */
  mergeDuration: function(attr, current)
  {
    return this.mergeNumber( attr, current, anim8.time, 'duration', 'durationAdd', 'durationScale', 'durations' );
  },

  /**
   * Merges offset based on the input, new options, and the current offset.
   * 
   * @method mergeOffset
   * @param {String} attr
   * @param {Number} current
   * @return {Number}
   */
  mergeOffset: function(attr, current)
  {
    return this.mergeNumber( attr, current, anim8.time, 'offset', 'offsetAdd', 'offsetScale', 'offsets' );
  },

  /**
   * Merges scale based on the input, new options, and the current scale.
   * 
   * @method mergeScale
   * @param {String} attr
   * @param {Number} current
   * @return {Number}
   */
  mergeScale: function(attr, current)
  {
    return this.mergeNumber( attr, current, anim8.number, 'scale', 'scaleAdd', 'scaleScale', 'scales' );
  },

  /**
   * Merges scale base based on the input, new options, and the current scale 
   * base.
   * 
   * @method mergeScaleBase
   * @param {String} attr
   * @param {T} current
   * @param {Factory} factory
   * @return {T}
   */
  mergeScaleBase: function(attr, current, factory)
  {
    var calc = factory.attribute( attr ).calculator;
    var parseFunction = function(value, defaultValue) {
      return calc.parse( value, defaultValue );
    };

    return this.mergeFirst( attr, current, parseFunction, 'scaleBase', 'scaleBases' );
  },

  /**
   * Returns the first available option from input, new options, old options,
   * and the current value.
   * 
   * @method mergeFirst
   * @param {String} attr
   * @param {T} current
   * @param {Function} parseOptionFunction
   * @param {String} option
   * @param {String} specifics
   * @return {T}
   */
  mergeFirst: function(attr, current, parseOptionFunction, option, specifics)
  {
    return parseOptionFunction( anim8.coalesce( this.input[ specifics ][ attr ], this.newOptions[ option ], this.oldOptions[ option ] ), current );
  },

  /**
   * Merges a number by returning the first occurrence from input, new options,
   * old options, and the current value.
   * 
   * @method mergeNumber
   * @param {String} attr
   * @param {Number} current
   * @param {Function} parseOptionFunction
   * @param {String} option
   * @param {String} optionAdd
   * @param {String} optionScale
   * @param {String} specifics
   * @return {Number}
   */
  mergeNumber: function(attr, current, parseOptionFunction, option, optionAdd, optionScale, specifics)
  {
    var baseRaw = anim8.coalesce( this.input[ specifics ][ attr ], this.newOptions[ option ], this.oldOptions[ option ] );
    var base = parseOptionFunction( baseRaw, current );
    var add = parseOptionFunction( anim8.coalesce( this.newOptions[ optionAdd ], this.oldOptions[ optionAdd ] ), 0 );
    var scale = anim8.coalesce( this.newOptions[ optionScale ], this.oldOptions[ optionScale ], 1 );

    return (base + add) * scale;
  }

};

/**
 * Instantiates a new parser for the 'deltas' & 'values' animation type.
 *
 * @class ParserDeltas
 * @constructor
 * @extends Parser
 */
anim8.ParserDeltas = function()
{
  
};

// ParserDeltas extends anim8.Parser()
anim8.override( anim8.ParserDeltas.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    // 1. If deltas wasn't specified, assume a uniform distribution of points
    // 2. If deltas was an array, expand out into an object where the keys are attributes and the value is the delta array
    // 3. Generate the attrimators
    
    var factory = anim8.factory( animation.factory );
    var deltas = animation.deltas;
    var values = animation.values;

    if ( !anim8.isDefined( deltas ) )
    {
      var valueCount = 0;
      
      for (var attr in values)
      {
        valueCount++; 
      }
      
      deltas = [];
      
      for (var i = 0; i < valueCount; i++)
      {
        deltas[i] = i / (valueCount - 1);
      }
    }
    if ( anim8.isArray( deltas ) )
    {
      var deltaObject = {};
      
      for (var attr in values)
      {
        deltaObject[attr] = deltas;  
      }
      
      deltas = deltaObject;
    }
    
    for (var attr in values)
    {
      var value = values[ attr ];
      var attribute = factory.attribute( attr );
      
      for (var k = 0; k < value.length; k++)
      {
        value[k] = attribute.parse( value[k] );
      }

      var path      = new anim8.PathDelta( attr, attribute.calculator, values[ attr ], deltas[ attr ] );
      var event     = helper.parseEvent( attr, path, this, true );
      
      attrimatorMap.put( attr, event );
    }
  }
});

/**
 * Register the parser.
 */
anim8.parser['values'] = new anim8.ParserDeltas();


/**
 * Instantiates a new parser for the 'final' animation type.
 *
 * @class ParserFinal
 * @constructor
 * @extends Parser
 */
anim8.ParserFinal = function()
{
  
};

// ParserFinal extends anim8.Parser()
anim8.override( anim8.ParserFinal.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    // 1. Generate the attrimators, only caring about the delays and durations
    
    var factory = anim8.factory( animation.factory );
    var values = animation.final;
    
    for (var attr in values)
    {
      var attribute  = factory.attribute( attr );
      var value      = attribute.parse( values[ attr ] );
      var delay      = anim8.delay( helper.parseDelay( attr ) );
      var duration   = anim8.duration( helper.parseDuration( attr ) );
      var scale      = helper.parseScale( attr );
      var scaleBase  = helper.parseScaleBase( attr );
      var path       = new anim8.PathPoint( attr, attribute.calculator, value );
      var event      = new anim8.Event( attr, path, 0, anim8.easing(), delay + duration, 0, 0, 1, scale, scaleBase, false, this );
      
      attrimatorMap.put( attr, event );
    }
  },
  merge: function( animation, newOptions, oldOptions, attrimatorMap, helper )
  {
    var factory = anim8.factory( animation.factory );
    var attrimators = attrimatorMap.values;

    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      var e = attrimators[i];
      var attr = e.attribute;
        
      if ( e.getParser() !== this )
      {
        continue;
      }

      e.delay     = helper.mergeDelay( attr, e.delay ) + helper.mergeDuration( attr, e.duration );
      e.scale     = helper.mergeScale( attr, e.scale );
      e.scaleBase = helper.mergeScaleBase( attr, e.scaleBase, factory ); 
    }
  }
});

/**
 * Register the parser.
 */
anim8.parser['final'] = new anim8.ParserFinal();



/**
 * Instantiates a new parser for the 'initial' animation type.
 *
 * @class ParserInitial
 * @constructor
 * @extends Parser
 */
anim8.ParserInitial = function()
{
  
};

// ParserInitial extends anim8.Parser()
anim8.override( anim8.ParserInitial.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    // 1. Generate the attrimators, only caring about the delays
    
    var factory    = anim8.factory( animation.factory );
    var values     = animation.initial;
    
    for (var attr in values)
    {
      var attribute  = factory.attribute( attr );
      var value      = attribute.parse( values[ attr ] ); 
      var delay      = helper.parseDelay( attr );
      var scale      = helper.parseScale( attr );
      var scaleBase  = helper.parseScaleBase( attr );
      var path       = new anim8.PathPoint( attr, attribute.calculator, value );
      var event      = new anim8.Event( attr, path, 0, anim8.easing(), delay, 0, 0, 1, scale, scaleBase, true, this );
      
      attrimatorMap.put( attr, event );
    }
  },
  merge: function( animation, newOptions, oldOptions, attrimatorMap, helper )
  {
    var factory    = anim8.factory( animation.factory );
    var attrimators = attrimatorMap.values;

    for (var i = attrimators.length - 1; i >= 0; i--)
    {
      var e = attrimators[i];
      var attr = e.attribute;
        
      if ( e.getParser() !== this )
      {
        continue;
      }
      
      e.delay     = helper.mergeDelay( attr, e.delay );
      e.scale     = helper.mergeScale( attr, e.scale );
      e.scaleBase = helper.mergeScaleBase( attr, e.scaleBase, factory );
    }
  }
});

/**
 * Register the parser.
 */
anim8.parser['initial'] = new anim8.ParserInitial();


/**
 * Instantiates a new parser for the 'keyframe' animation type.
 *
 * @class ParserKeyframe
 * @constructor
 * @extends Parser
 */
anim8.ParserKeyframe = function()
{
  
};

// ParserKeyframe extends anim8.Parser()
anim8.override( anim8.ParserKeyframe.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    // 1. Normalize keys by converting aliases to the actual value
    // 2. Split up keys that have commas into multiple entries
    // 3. Validate keys and remove invalid ones - also calculate max key value
    // 4. Sort frames by the key
    // 5. Expand frames to generate delta arrays, value arrays, and easing arrays
    // 6. Generate the attrimators
    
    var factory = anim8.factory( animation.factory );
    var kframes = animation.keyframe;
    var easings = animation.easings || {};
    var teasing = anim8.easing( anim8.coalesce( options.teasing, anim8.defaults.teasing ) );
    
    var sort = false;
    
    var aliases = {
      from:     '0',
      start:    '0',
      initial:  '0',
      first:    '0',
      half:     '50',
      middle:   '50',
      to:       '100',
      end:      '100',
      last:     '100'
    };
    
    // split up comma delimited times
    for (var time in kframes)
    {
      if ( time in aliases )
      {
        kframes[ aliases[time] ] = kframes[ time ];
        
        delete kframes[ time ];
      }
      else if ( time.indexOf(',') !== -1 )
      {
        var times = time.split(',');
        
        for (var i = 0; i < times.length; i++)
        {
          kframes[times[i]] = kframes[time];
        }
        
        delete kframes[time];
        
        sort = true;
      }
    }
    
    var times = [];
    
    // validate times
    var lastTime = 0.0;
    var maxTime = 0.0;
    
    for (var time in kframes)
    {
      var t = parseFloat(time);
      
      if (isNaN(t))
      {
        delete kframes[time];
      }
      else
      {
        if (t < lastTime)
        {
          sort = true;
        }
        
        times.push({
          order: t,
          key: time,
          value: kframes[time]
        });
        
        lastTime = t;
        
        maxTime = Math.max( maxTime, t );
      }
    }
    
    // sort if necessary
    if (sort)
    {
      times.sort(function(a, b) 
      {
        return a.order - b.order;
      });
      
      kframes = {};
      
      for (var i = 0; i < times.length; i++)
      {
        kframes[times[i].key] = times[i].value;
      }
    }
    
    // split up into deltas and values
    var deltas = {};
    var values = {};
    var pathEasings = {};
    var attributes = {};
    
    for (var i = 0; i < times.length; i++)
    {
      var frame = times[i];
      var easing = anim8.coalesce( frame.value.easing, options.easing );
      
      delete frame.value.easing;
      
      for (var attr in frame.value)
      {
        if ( !(attr in deltas) )
        {
          deltas[attr] = [];
          values[attr] = [];
          pathEasings[attr] = [];
          attributes[attr] = factory.attribute( attr );
        }
        
        deltas[attr].push( frame.order / maxTime );
        values[attr].push( attributes[ attr ].parse( frame.value[ attr ] ) );
        pathEasings[attr].push( anim8.easing( anim8.coalesce( easings[ attr ], easing ) ) );
      }
    }
    
    // create events & paths
    for (var attr in deltas)
    {
      var duration  = helper.parseDuration( attr );
      var delay     = helper.parseDelay( attr );
      var sleep     = helper.parseSleep( attr );
      var offset    = helper.parseOffset( attr );
      var repeat    = helper.parseRepeat( attr );
      var scale     = helper.parseScale( attr );
      var scaleBase = helper.parseScaleBase( attr );
      var path      = new anim8.PathKeyframe( attr, attributes[attr].calculator, values[attr], deltas[attr], pathEasings[attr] );
      var event     = new anim8.Event( attr, path, duration, teasing, delay, sleep, offset, repeat, scale, scaleBase, true, this );

      attrimatorMap.put( attr, event );
    }
  }
});

/**
 * Registers the parser.
 */
anim8.parser['keyframe'] = new anim8.ParserKeyframe();


/**
 * Instantiates a new parser for the 'tweenTo' animation type.
 *
 * @class ParserTweenTo
 * @constructor
 * @extends Parser
 */
anim8.ParserTweenTo = function()
{
  
};

// ParserTweenTo extends anim8.Parser()
anim8.override( anim8.ParserTweenTo.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    // 1. Starting values are all true which signals to Animator to replace those points with the animator's current values.

    var factory    = anim8.factory( animation.factory );
    var tweenTo    = animation.tweenTo;

    for (var attr in tweenTo)
    {
      var attribute  = factory.attribute( attr );
      var value      = attribute.parse( tweenTo[ attr ] );
      var path       = new anim8.Tween( attr, attribute.calculator, anim8.computed.current, value );
      var event      = helper.parseEvent( attr, path, this, true );
      
      attrimatorMap.put( attr, event );
    }
  }
});

/**
 * A parser which generates attrimators which tween from the current value to 
 * the given values.
 *
 * **Examples:**
 * 
 *     animator.play({
 *      tweenTo: {
 *       opacity: 1.0,       // absolute value
 *       left: '+40'         // 40 more units from current value  
 *      }
 *     });
 * 
 *
 * @property {ParserTweenTo} tweenTo
 * @for anim8.parser
 */
anim8.parser['tweenTo'] = new anim8.ParserTweenTo();


/**
 * Instantiates a new parser for the 'tweenFrom' animation type.
 *
 * @class ParserTweenFrom
 * @constructor
 * @extends Parser
 */
anim8.ParserTweenFrom = function()
{
  
};

// ParserTweenFrom extends anim8.Parser()
anim8.override( anim8.ParserTweenFrom.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    // 1. Starting values are all true which signals to Animator to replace those points with the animator's current values.

    var factory    = anim8.factory( animation.factory );
    var tweenFrom  = animation.tweenFrom;

    for (var attr in tweenFrom)
    {
      var attribute  = factory.attribute( attr );
      var value      = attribute.parse( tweenFrom[ attr ] );
      var path       = new anim8.Tween( attr, attribute.calculator, value, anim8.computed.current );
      var event      = helper.parseEvent( attr, path, this, true );
      
      attrimatorMap.put( attr, event );
    }
  }
});

/**
 * Register the parser.
 */
anim8.parser['tweenFrom'] = new anim8.ParserTweenFrom();


/**
 * Instantiates a new parser for the 'move' animation type.
 *
 * @class ParserMove
 * @constructor
 * @extends Parser
 */
anim8.ParserMove = function()
{
  
};

// ParserMove extends anim8.Parser()
anim8.override( anim8.ParserMove.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    // 1. Starting values are all true which signals to Animator to replace those points with the animator's current values.

    var factory    = anim8.factory( animation.factory );
    var move       = animation.move;

    for (var attr in move)
    {
      var attribute  = factory.attribute( attr );
      var value      = attribute.parse( move[ attr ] );
      var path       = new anim8.Tween( attr, attribute.calculator, anim8.computed.current, anim8.computed.relative( value ) );
      var event      = helper.parseEvent( attr, path, this, true );
      
      attrimatorMap.put( attr, event );
    }
  }
});

/**
 * Register the parser.
 */
anim8.parser['move'] = new anim8.ParserMove();


/**
 * Instantiates a new parser for the 'springs' animation type.
 *
 * @class ParserSpring
 * @constructor
 * @extends Parser
 */
anim8.ParseSpring = function()
{
  
};

// ParseSpring extends anim8.Parser()
anim8.override( anim8.ParseSpring.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    var factory    = anim8.factory( animation.factory );
    var springs    = animation.springs;

    for (var attr in springs)
    {
      var spring     = springs[ attr ];

      if ( !anim8.isDefined( spring.attribute ) )
      {
        spring.attribute = attr;
      }

      var parsed = anim8.spring( spring );
      
      if ( parsed !== false )
      {
        parsed.parser = this;

        attrimatorMap.put( attr, parsed );  
      }
    }
  }
});

/**
 * Register the parser.
 */
anim8.parser['springs'] = new anim8.ParseSpring();


/**
 * Instantiates a new parser for the 'physics' animation type.
 *
 * @class ParserPhysics
 * @constructor
 * @extends Parser
 */
anim8.ParsePhysics = function()
{
  
};

// ParsePhysics extends anim8.Parser()
anim8.override( anim8.ParsePhysics.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    var factory    = anim8.factory( animation.factory );
    var physics    = animation.physics;

    for (var attr in physics)
    {
      var physic    = physics[ attr ];

      var attrimator = new anim8.Physics(
        attr, 
        this, 
        physic.calculator, 
        anim8.coalesce( physic.position, true ), 
        physic.velocity, 
        physic.acceleration, 
        physic.terminal,
        physic.stopAt
      );

      attrimatorMap.put( attr, attrimator );
    }
  }
});

/**
 * Register the parser.
 */
anim8.parser['physics'] = new anim8.ParsePhysics();


/**
 * Instantiates a new parser for the 'travel' animation type.
 *
 * @class ParserTravel
 * @constructor
 * @extends Parser
 */
anim8.ParserTravel = function()
{
  
};

// ParserTravel extends anim8.Parser()
anim8.override( anim8.ParserTravel.prototype = new anim8.Parser(),
{
  parse: function( animation, options, attrimatorMap, helper )
  {
    // 1. Starting values are all true which signals to Animator to replace those points with the animator's current values.

    var factory    = anim8.factory( animation.factory );
    var travel     = animation.travel;

    /**
     * The computed function which returns a function which returns a value pointing
     * to a given target given the current position of the animator.
     * 
     * @param  {Number}
     * @param  {any}
     * @param  {Number}
     * @return {Function}
     */
    var pointing = function(amount, target, epsilon, subtractVelocity)
    {
      var pointingFunction = function(attrimator, animator)
      {
        var attribute = animator.getAttribute( attrimator.attribute );
        var calc = attribute.calculator;
        var targetValue = anim8.isComputed( target ) ? target( attrimator, animator ) : target;
        var temp = calc.create();

        return function()
        {
          var position   = attrimator.position;
          var current    = calc.copy( temp, anim8.resolve( targetValue ) );
          var difference = calc.sub( current, position );
          var distance   = calc.distance( difference, calc.ZERO );

          if ( distance < epsilon )
          {
            attrimator.stopIn( 0 );
          }
          else
          {
            difference = calc.scale( difference, amount / distance );
          }
          
          if ( subtractVelocity )
          {
            difference = calc.sub( difference, attrimator.resolveVelocity() );
          }

          return difference;
        };
      };

      pointingFunction.computed = true;

      return pointingFunction;
    };

    for (var attr in travel)
    {
      var traveling     = travel[ attr ];
      var attribute     = factory.attribute( attr );
      var from          = attribute.parse( anim8.coalesce( traveling.from, true ) );
      var to            = attribute.parse( anim8.coalesce( traveling.to, true ) );
      var velocity      = anim8.number( traveling.velocity, 0 );
      var acceleration  = anim8.number( traveling.acceleration, 0 );
      var terminal      = anim8.number( anim8.coalesce( traveling.terminal, traveling.velocity ), Number.POSITIVE_INFINITY );
      var epsilon       = anim8.number( traveling.epsilon, 0.001 );

      if ( acceleration !== 0 )
      {
        acceleration = pointing( acceleration, to, epsilon, true );
      }

      if ( velocity !== 0 )
      {
        velocity = pointing( velocity, to, epsilon, false );
      }

      var traveler = new anim8.Physics(
        attr,
        this,
        attribute.calculator,
        from,
        velocity,
        acceleration,
        terminal
      );
      
      attrimatorMap.put( attr, traveler );
    }
  }
});

/**
 * Register the parser.
 */
anim8.parser['travel'] = new anim8.ParserTravel();



/**
 * Returns a factory for the given subject and optionally throws an error if no
 * factory exists.
 *
 * @method anim8.factoryFor
 * @for Core
 * @param {Any} subject
 * @param {Boolean} [optional]
 * @return {Factory}
 */
anim8.factoryFor = function(subject, optional) 
{
  var highestPriorityFactory = false;

  for (var factoryName in anim8.factory) 
  {
    var factory = anim8.factory[ factoryName ];
    
    if ( factory.is( subject ) && (highestPriorityFactory === false || highestPriorityFactory.priority < factory.priority) )
    {     
      highestPriorityFactory = factory;
    }
  }
  
  if ( highestPriorityFactory )
  {
    return highestPriorityFactory;
  }

  if ( optional )
  {
    return false;
  }
  
  throw 'No factory exists for subject ' + subject;
};

/**
 * Returns a factory given the input and returns the default if none is found.
 *
 * @method anim8.factory
 * @for Core
 * @param {String|Factory} [factory]
 * @return {Factory}
 */
anim8.factory = function(factory)
{
  if ( factory instanceof anim8.Factory )
  {
    return factory;
  }
  if ( anim8.isString( factory ) && factory in anim8.factory )
  {
    return anim8.factory[ factory ];
  }

  return anim8.factory['default'];
};

/**
 * A factory creates Animator instances for subjects.
 *
 * @class Factory
 * @constructor
 */
anim8.Factory = function()
{
  this.priority = 0;
};

anim8.Factory.prototype = 
{

  /**
   * Determines whether the given subject is valid for this factory to create Animators for.
   *
   * @method is
   * @param  {Any} subject
   * @return {Boolean}
   */
  is: function(subject)
  {
    throw 'Factory.is not implemented';
  },

  /**
   * Returns an animator given a subject.
   *
   * @method animatorFor
   * @param  {Any} subject
   * @return {Animator}
   */
  animatorFor: function(subject)
  {
    throw 'Factory.animatorFor not implemented';
  },

  /**
   * Explodes the given subject to an array of Animators and adds them to the given array.
   *
   * @method animatorsFor
   * @param {Any} subject
   * @param {Array} animators
   */
  animatorsFor: function(subject, animators)
  {
    animators.push( this.animatorFor( subject ) );
  },

  /**
   * Destroys the animator by unlinking the animator from the subject.
   *
   * @method destroy
   * @param {Animator} animator
   */
  destroy: function(animator)
  {

  },

  /**
   * Returns the attribute descriptor for the given attribute. An attribute
   * descriptor is an object with at least the following properties:
   *
   * - `name` = the name of the attribute (same as `attr`)
   * - `calculatorName` = the name of the calculator for the attribute
   * - `calculator` = the calculator for the attribute
   * - `defaultValue` = the default value for the attribute
   * - `parse` = a method to pass a value and have the calculator parse it and
   *             return the defaultValue if it was invalid
   * - `cloneDefault` = a method which returns a clone of the default value
   *
   * @method attribute
   * @param {String} attr
   * @return {Object}
   */
  attribute: function(attr)
  {
    throw 'Factory.attribute not implemented';
  }

};


/**
 * A factory for plain objects.
 *
 * @class FactoryObject
 * @constructor
 * @extends Factory
 */
anim8.FactoryObject = function()
{
  this.priority = 0;
  this.attributes = {};
};

anim8.override( anim8.FactoryObject.prototype = new anim8.Factory(),
{
  is: function(subject)
  {
    return anim8.isObject( subject ) && !anim8.isElement( subject ) && !anim8.isArray( subject );
  },
  animatorFor: function(subject)
  {
    var animator = subject.$animator;
      
    if ( !animator )
    {
      animator = new anim8.Animator( subject );
      animator.factory = this;      
      
      subject.$animator = animator;
    }
    
    return animator;
  },
  destroy: function(animator)
  {
    delete animator.subject.$animator;
  },
  attribute: function(attr)
  {
    var attribute = this.attributes[ attr ];

    if ( !attribute )
    {
      attribute = this.attributes[ attr ] = anim8.object.attribute( attr );

      var calculatorName = attribute.calculator;
      var calculator = anim8.calculator( calculatorName );
      var defaultValue = calculator.parse( attribute.defaultValue, calculator.ZERO );

      attribute.calculatorName = calculatorName;
      attribute.calculator = calculator;
      attribute.defaultValue = defaultValue;
      attribute.name = attr;
      attribute.parse = function(value) {
        return this.calculator.parse( value, this.defaultValue );
      };
      attribute.cloneDefault = function() {
        return this.calculator.clone( this.defaultValue );
      };
    }

    return attribute;
  }
});

/**
 * Registers the object factory.
 */
anim8.factory['default'] = anim8.factory['object'] = new anim8.FactoryObject();

/**
 * The Object namespace.
 * 
 * @type {Object}
 */
anim8.object = {};

/**
 * Returns an attribute based on the given input. If the input is an object it's assumed to be an attribute and it's
 * returned immediately. If the input is a string the attribute with the given name is returned. Otherwise
 * the default attribute is returned.
 *
 * @param {Object|String} attr
 * @return {Object}
 */
anim8.object.attribute = function(attr) 
{
  if ( anim8.isObject( attr ) && anim8.isDefined( attr.defaultValue ) ) 
  {
    return attr;
  }
  if ( anim8.isString( attr ) && attr in anim8.object.attribute ) 
  {
    return anim8.object.attribute[ attr ];
  }
  
  return anim8.object.attribute['default'];
};

/**
 * The default attribute.
 */
anim8.object.attribute['default']                 = {defaultValue: 0};


/**
 * A factory for plain objects.
 */
anim8.FactoryEasel = function()
{
  this.priority = 3;
  this.attributes = {};
};

anim8.override( anim8.FactoryEasel.prototype = new anim8.Factory(),
{
  is: function(subject)
  {
    return anim8.isObject( subject ) && !anim8.isArray( subject );
  },
  animatorFor: function(subject)
  {
    var animator = subject.$animator;
      
    if ( !animator )
    {
      animator = new anim8.AnimatorEasel( subject );
      animator.factory = this;      
      
      subject.$animator = animator;
    }
    
    return animator;
  },
  destroy: function(animator)
  {
    delete animator.subject.$animator;
  },
  attribute: function(attr)
  {
    var attribute = this.attributes[ attr ];

    if ( !attribute )
    {
      attribute = this.attributes[ attr ] = anim8.easel.attribute( attr );

      var calculatorName = attribute.calculator;
      var calculator = anim8.calculator( calculatorName );
      var defaultValue = calculator.parse( attribute.defaultValue, calculator.ZERO );
      var dynamicName = attribute.dynamic;
      var dynamic = anim8.easel.dynamic( dynamicName );

      attribute.calculatorName = calculatorName;
      attribute.calculator = calculator;
      attribute.defaultValue = defaultValue;
      attribute.name = attr;
      attribute.dynamicName = dynamicName;
      attribute.dynamic = dynamic;
      attribute.parse = function(value) {
        return this.calculator.parse( value, this.defaultValue );
      };
      attribute.cloneDefault = function() {
        return this.calculator.clone( this.defaultValue );
      };
    }

    return attribute;
  }
});

/**
 * Registers the object factory.
 */
anim8.factory['easeljs'] = new anim8.FactoryEasel();

anim8.AnimatorEasel = function( subject )
{
  this.reset( subject );
  this.dynamics = new anim8.FastMap();
};

anim8.override( anim8.AnimatorEasel.prototype = new anim8.Animator(),
{
  placeAttrimator: function( attrimator )
  {
    anim8.fn.placeAttrimator.apply( this, arguments );
    
    // Place any dynamic function on this animator.
    var attr = attrimator.attribute;
    var attribute = this.getAttribute( attr );
    var dynamic = attribute.dynamic;

    if ( dynamic )
    {
      this.dynamics.put( attr, dynamic );
    }

    return this;
  },
  apply: function()
  {
    // If a dynamic attribute has been updated, call the dynamic function and
    // mark the attribute as not needing to be updated.
    for (var attr in this.frame)
    {
      var dynamic = this.dynamics.get( attr );

      if ( this.updated[ attr ] && dynamic )
      {
        dynamic( this.frame[ attr ], this.subject );

        this.updated[ attr ] = false;
      }
    }

    // Call the parent apply
    anim8.fn.apply.apply( this, arguments );

    return this;
  }
});

/**
 * =============================================================================
 * Attributes defined in EaselJS:
 * =============================================================================
 * DisplayObject:
 *    alpha, regX, regY, rotation, scaleX, scaleY, skewX, 
 *    skewY, x, y, 
 * BitmapText (DisplayObject):
 *    lineHeight, letterSpacing, spaceWidth
 * BlurFilter:
 *    blurX, blurY, quality
 * ColorFilter:
 *    redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier,
 *    redOffset, greenOffset, blueOffset, alphaOffset    
 * Graphics.Arc:
 *    x, y, radius, startAngle, endAngle
 * Graphics.BezierCurveTo:
 *    cp1x, cp1y, cp2x, cp2y, x, y
 * Graphics.Circle:
 *    x, y, radius
 * Graphics.Ellipse:
 *    x, y, w, h
 * Graphics.Fill:
 *    style (color)
 * Graphics.LineTo:
 *    x, y
 * Graphics.MoveTo:
 *    x, y
 * Graphics.PolyStar:
 *    x, y, radius, sides, pointSize, angle
 * Graphics.QuadraticCurveTo:
 *    cpx, cpy, x, y
 * Graphics.Rect:
 *    x, y, w, h
 * Graphics.RoundRect:
 *    x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL
 * Graphics.Stroke:
 *    style (color)
 * Graphics.StrokeStyle:
 *    width, miterLimit
 * Point:
 *    x, y
 * Rectangle:
 *    x, y, width, height
 * Shadow:
 *    color, offsetX, offsetY, blur
 * Sprite:
 *    currentAnimationFrame, framerate
 * SpriteSheet:
 *    framerate
 * Text:
 *    color
 */

/**
 * =============================================================================
 * Dynamic Attributes defined in anim8js
 * =============================================================================
 * number: cornerRadius, ColorMatrix{brightness, contrast, saturation, hue}
 * 2d: reg, position, offset, cp, cp1, cp2, filterBlur, size, scale, skew
 * rgba: filterMultiplier, filterOffset
 */

anim8.easel = {};

anim8.easel.attribute = function(attr)
{
  if ( anim8.isString( attr ) && attr in anim8.easel.attribute )
  {
    return anim8.easel.attribute[ attr ];
  }

  return anim8.easel.attribute['default'];
}

// Defined
anim8.easel.attribute['default']      = {defaultValue: 0};
anim8.easel.attribute.alpha           = {defaultValue: 1};
anim8.easel.attribute.regX            = {defaultValue: 0};
anim8.easel.attribute.regY            = {defaultValue: 0};
anim8.easel.attribute.rotation        = {defaultValue: 0};
anim8.easel.attribute.scaleX          = {defaultValue: 1};
anim8.easel.attribute.scaleY          = {defaultValue: 1};
anim8.easel.attribute.skewX           = {defaultValue: 0};
anim8.easel.attribute.skewY           = {defaultValue: 0};
anim8.easel.attribute.x               = {defaultValue: 0};
anim8.easel.attribute.y               = {defaultValue: 0};
anim8.easel.attribute.lineHeight      = {defaultValue: 0};
anim8.easel.attribute.letterSpacing   = {defaultValue: 0};
anim8.easel.attribute.spaceWidth      = {defaultValue: 0};
anim8.easel.attribute.blurX           = {defaultValue: 0};
anim8.easel.attribute.blurY           = {defaultValue: 0};
anim8.easel.attribute.quality         = {defaultValue: 1};
anim8.easel.attribute.redMultiplier   = {defaultValue: 1};
anim8.easel.attribute.greenMultiplier = {defaultValue: 1};
anim8.easel.attribute.blueMultiplier  = {defaultValue: 1};
anim8.easel.attribute.alphaMultiplier = {defaultValue: 1};
anim8.easel.attribute.redOffset       = {defaultValue: 0};
anim8.easel.attribute.greenOffset     = {defaultValue: 0};
anim8.easel.attribute.blueOffset      = {defaultValue: 0};
anim8.easel.attribute.alphaOffset     = {defaultValue: 0};
anim8.easel.attribute.radius          = {defaultValue: 0};
anim8.easel.attribute.startAngle      = {defaultValue: 0};
anim8.easel.attribute.endAngle        = {defaultValue: 0};
anim8.easel.attribute.cp1x            = {defaultValue: 0};
anim8.easel.attribute.cp1y            = {defaultValue: 0};
anim8.easel.attribute.cp2x            = {defaultValue: 0};
anim8.easel.attribute.cp2y            = {defaultValue: 0};
anim8.easel.attribute.w               = {defaultValue: 0};
anim8.easel.attribute.h               = {defaultValue: 0};
anim8.easel.attribute.width           = {defaultValue: 0};
anim8.easel.attribute.height          = {defaultValue: 0};
anim8.easel.attribute.sides           = {defaultValue: 0};
anim8.easel.attribute.pointSize       = {defaultValue: 0};
anim8.easel.attribute.angle           = {defaultValue: 0};
anim8.easel.attribute.cpx             = {defaultValue: 0};
anim8.easel.attribute.cpy             = {defaultValue: 0};
anim8.easel.attribute.radiusTL        = {defaultValue: 0};
anim8.easel.attribute.radiusTR        = {defaultValue: 0};
anim8.easel.attribute.radiusBL        = {defaultValue: 0};
anim8.easel.attribute.radiusBR        = {defaultValue: 0};
anim8.easel.attribute.miterLimit      = {defaultValue: 0};
anim8.easel.attribute.offsetX         = {defaultValue: 0};
anim8.easel.attribute.offsetY         = {defaultValue: 0};
anim8.easel.attribute.blur            = {defaultValue: 0};
anim8.easel.attribute.framerate       = {defaultValue: 0};
anim8.easel.attribute.currentAnimationFrame = {defaultValue: 0};

// Dynamic
anim8.easel.attribute.style           = {defaultValue: anim8.color(), calculator:'rgba'};
anim8.easel.attribute.color           = {defaultValue: anim8.color(), calculator:'rgba'};
anim8.easel.attribute.cornerRadius    = {defaultValue: 0, dynamic: 'cornerRadius'};
anim8.easel.attribute.brightness      = {defaultValue: 0, dynamic: 'brightness'};
anim8.easel.attribute.contrast        = {defaultValue: 0, dynamic: 'contrast'};
anim8.easel.attribute.saturation      = {defaultValue: 0, dynamic: 'saturation'};
anim8.easel.attribute.hue             = {defaultValue: 0, dynamic: 'hue'};
anim8.easel.attribute.reg             = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'reg'};
anim8.easel.attribute.position        = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'position'};
anim8.easel.attribute.offset          = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'offset'};
anim8.easel.attribute.cp              = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'cp'};
anim8.easel.attribute.cp1             = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'cp1'};
anim8.easel.attribute.cp2             = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'cp2'};
anim8.easel.attribute.filterBlur      = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'filterBlur'};
anim8.easel.attribute.size            = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'size'};
anim8.easel.attribute.scale           = {defaultValue: {x:1, y:1}, calculator: '2d', dynamic:'scale'};
anim8.easel.attribute.skew            = {defaultValue: {x:0, y:0}, calculator: '2d', dynamic:'skew'};
anim8.easel.attribute.filterMultiplier= {defaultValue: anim8.color(), calculator: 'rgba', dynamic:'filterMultiplier'};
anim8.easel.attribute.filterOffset    = {defaultValue: anim8.color(), calculator: 'rgba', dynamic:'filterOffset'};


// Dynamic Fields
anim8.easel.dynamic = function(nm)
{
  if ( anim8.isString( nm ) && nm in anim8.easel.dynamic )
  {
    return anim8.easel.dynamic[ nm ];
  }

  return false;
};

anim8.easel.dynamic.style = function(attr, subject)
{
  subject.style = anim8.color.format( attr );
};

anim8.easel.dynamic.color = function(attr, subject)
{
  subject.color = anim8.color.format( attr );
};

anim8.easel.dynamic.cornerRadius = function(attr, subject)
{
  subject.radiusTL = attr;
  subject.radiusTR = attr;
  subject.radiusBL = attr;
  subject.radiusBR = attr;
};

anim8.easel.dynamic.brightness = function(attr, subject)
{
  subject.adjustBrightness( attr );
};

anim8.easel.dynamic.contrast = function(attr, subject)
{
  subject.adjustContrast( attr );
};

anim8.easel.dynamic.saturation = function(attr, subject)
{
  subject.adjustSaturation( attr );
};

anim8.easel.dynamic.hue = function(attr, subject)
{
  subject.adjustHue( attr );
};

anim8.easel.dynamic.reg = function(attr, subject)
{
  subject.regX = attr.x;
  subject.regY = attr.y;
};

anim8.easel.dynamic.position = function(attr, subject)
{
  subject.x = attr.x;
  subject.y = attr.y;
};

anim8.easel.dynamic.offset = function(attr, subject)
{
  subject.offsetX = attr.x;
  subject.offsetY = attr.y;
};

anim8.easel.dynamic.cp = function(attr, subject)
{
  subject.cpx = attr.x;
  subject.cpy = attr.y;
};

anim8.easel.dynamic.cp1 = function(attr, subject)
{
  subject.cp1x = attr.x;
  subject.cp1y = attr.y;
};

anim8.easel.dynamic.cp2 = function(attr, subject)
{
  subject.cp2x = attr.x;
  subject.cp2y = attr.y;
};

anim8.easel.dynamic.filterBlur = function(attr, subject)
{
  subject.blurX = attr.x;
  subject.blurY = attr.y;
};

anim8.easel.dynamic.size = function(attr, subject)
{
  subject.w = subject.width  = attr.x;
  subject.h = subject.height = attr.y;
};

anim8.easel.dynamic.scale = function(attr, subject)
{
  subject.scaleX = attr.x;
  subject.scaleY = attr.y;
};

anim8.easel.dynamic.skew = function(attr, subject)
{
  subject.skewX = attr.x;
  subject.skewY = attr.y;
};

anim8.easel.dynamic.filterMultiplier = function(attr, subject)
{
  subject.redMultiplier   = attr.r;
  subject.greenMultiplier = attr.g;
  subject.blueMultiplier  = attr.b;
  subject.alphaMultiplier = attr.a;
};

anim8.easel.dynamic.filterOffset = function(attr, subject)
{
  subject.redOffset   = attr.r;
  subject.greenOffset = attr.g;
  subject.blueOffset  = attr.b;
  subject.alphaOffset = attr.a;
};