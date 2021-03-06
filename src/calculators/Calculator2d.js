
/*
 * A calculator for objects with an x and y component (number)
 *
 * @class Calculator2d
 * @constructor
 * @extends Calculator
 */
function Calculator2d()
{
  this.createConstants();
}

Class.extend( Calculator2d, Calculator,
{
  aliases: {
    'left':   0,
    'right':  100,
    'middle': 50,
    'center': 50,
    'top':    0,
    'bottom': 100
  },
  parse: function(x, defaultValue, ignoreRelative)
  {
    // Values computed live.
    if ( isFunction( x ) )
    {
      return x;
    }

    // Value computed from current value on animator.
    if ( x === true )
    {
      return computed.current;
    }

    // When a number is given a uniform point is returned.
    if ( isNumber( x ) )
    {
      return {
        x: x,
        y: x
      };
    }

    // When an array is given, assume [x, y]
    if ( isArray( x ) )
    {
      x = { x: x[0], y: x[1] };
    }

    // Default when there is none given
    var def = coalesce( defaultValue, Defaults.calculator2d );

    // When an object is given, check for relative values.
    if ( isObject( x ) )
    {
      var cx = coalesce( x.x, def.x );
      var cy = coalesce( x.y, def.y );
      var rx = $number( cx, false );
      var ry = $number( cy, false );

      if ( rx !== false && ry !== false )
      {
        var parsed = { x: rx, y: ry };
        var ix = isRelative( cx );
        var iy = isRelative( cy );

        if ( !ignoreRelative && (ix || iy) )
        {
          var mask = {
            x: ix ? 1 : 0,
            y: iy ? 1 : 0
          };

          return computed.relative( parsed, mask );
        }

        return parsed;
      }
    }

    // Relative values & left/right/middle/center/top/bottom aliases.
    if ( isString( x ) )
    {
      // If only a relative value is given it will modify the X & Y components evenly.
      if ( !ignoreRelative && isRelative( x ) )
      {
        var rx = $number( x, false );

        if ( rx !== false )
        {
          return computed.relative( { x: rx, y: rx } );
        }
      }

      var pair = x.split(/[\s,|]/);

      return {
        x: this.parseString( pair[0], def.x ),
        y: this.parseString( coalesce(pair[1], pair[0]), def.y )
      };
    }

    // If no value was given but the default value was given, clone it.
    return this.clone( def );
  },
  parseString: function(x, defaultValue)
  {
    return x in this.aliases ? this.aliases[ x ] : $number( x, defaultValue );
  },
  copy: function(out, copy)
  {
    out.x = copy.x;
    out.y = copy.y;
    return out;
  },
  create: function()
  {
    return {x: 0.0, y: 0.0};
  },
  zero: function(out)
  {
    out.x = 0.0;
    out.y = 0.0;
    return out;
  },
  convert: function(out, converter)
  {
    out.x = converter( out.x );
    out.y = converter( out.y );
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
  div: function(out, denominator)
  {
    out.x = denominator.x ? out.x / denominator.x : 0;
    out.y = denominator.y ? out.y / denominator.y : 0;
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
