

/**
 * A calculator for objects with r, g, & b components (numbers 0 -> 255)
 *
 * @class CalculatorRGB
 * @constructor
 * @extends Calculator
 */
function CalculatorRGB()
{
  this.createConstants();
}

Class.extend( CalculatorRGB, Calculator,
{
  parse: function(x, defaultValue)
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

    // When a number is given a grayscale color is returned.
    if ( isNumber( x ) )
    {
      return {
        r: x,
        g: x,
        b: x
      };
    }

    // When an array is given, assume [r, g, b]
    if ( isArray( x ) )
    {
      x = { r: x[0], g: x[1], b: x[2] };
    }

    // When an object is given, check for relative values.
    if ( isObject( x ) )
    {
      // Default when there is none given
      var dr = 0, dg = 0, db = 0;

      if ( defaultValue )
      {
        dr = defaultValue.r;
        dg = defaultValue.g;
        db = defaultValue.b;
      }
      
      var cr = coalesce( x.r, dr );
      var cg = coalesce( x.g, dg );
      var cb = coalesce( x.b, db );
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

          return computed.relative( parsed, mask );
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
        return computed.relative( { r: rx, g: rx, b: rx } );
      }
    }

    // Try to parse the color.
    var parsed = Color.parse( x );

    if ( parsed !== false )
    {
      return parsed;
    }

    // If no value was given but the default value was given, clone it.
    if ( isDefined( defaultValue ) )
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
    return isObject( a ) && 'r' in a && 'g' in a && 'b' in a;
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
