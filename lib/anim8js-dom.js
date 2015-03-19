
anim8.browser = 
{
  IE: (function() {
    if (!(window.ActiveXObject) && "ActiveXObject" in window) return 11;
    if (!document.all) return false;
    if (!document.compatMode) return 5;
    if (!window.XMLHttpRequest) return 6;
    if (!document.querySelector) return 7;
    if (!document.addEventListener) return 8;
    if (!window.atob) return 9;
    return 10;
  })()
};

anim8.prefix = (function() 
{  
  var a = document.createElement('a');
  
  return function(prefixes) {
    for (var i = 0; i < prefixes.length; i++) {
      if ( anim8.isDefined( a.style[ prefixes[ i ] ] ) ) {
        return prefixes[i];
      }
    }
    return false;
  };
  
})();

anim8.parseValue = (function() 
{  
  var regex = /(-?\d*(\.\d+)?)(px|em|%|vw|ex|cm|mm|in|pt|pc|deg|rad)?/;
  
  return function(value) {
    if ( anim8.isNumber( value ) ) {
      return {
        value: value,
        unit: 'px'
      };
    }
    else if ( anim8.isString( value ) && value ) {
      var parsed = regex.exec( value );
      if (parsed) {
        return {
          value: parseFloat( parsed[1] ),
          unit: parsed[3] || 'px'
        }
      }
    }
    return false;
  };
  
})();

anim8.factories.push({
  is: function(subject) {
    return anim8.isElement( subject );
  },
  parseAnimators: function(from, animators) {
    
  }
});

anim8.property.factory = function(nm, calculate) {
  return {
    get: function(e, anim) {
      if (anim.animating[nm] === false) {
        var parsed = anim8.parseValue( e.style[nm] );
      
        if (!parsed && anim8.isFunction( calculate )) {
          parsed = calculate( e, anim );
        }
      
        if (parsed) {
          anim.frame[nm] = parsed;
          anim.animating[nm] = true;
        }
      }            
    },
    set: function(e, anim) {
      if (nm in anim.units) {
        e.style[nm] = anim.frame[nm] + anim.units[nm];
      } else {
        e.style[nm] = anim.frame[nm];
      }
    }
  };
};

anim8.property.factoryColor = function(nm) {
  return {
    prep: function(e, anim) {
      
    },
    get: function(e, anim) {
      if (anim.animating[nm] === false) {
        var parsed = m8.color.parse( e.style[nm] );
        if (parsed !== m8.color.invalidColor) {
          anim.frame[nm] = parsed;
          anim.animating[nm] = true;
        }              
      }
    },
    set: function(e, anim) {
      e.style[nm] = m8.color.format( anim.frame[nm] );
    }
  };
};

anim8.property.padding                  = anim8.property.factory( 'padding' );
anim8.property.paddingTop               = anim8.property.factory( 'paddingTop' );
anim8.property.paddingRight             = anim8.property.factory( 'paddingRight' );
anim8.property.paddingBottom            = anim8.property.factory( 'paddingBottom' );
anim8.property.paddingLeft              = anim8.property.factory( 'paddingLeft' );

anim8.property.margin                   = anim8.property.factory( 'margin' );
anim8.property.marginTop                = anim8.property.factory( 'marginTop' );
anim8.property.marginRight              = anim8.property.factory( 'marginRight' );
anim8.property.marginBottom             = anim8.property.factory( 'marginBottom' );
anim8.property.marginLeft               = anim8.property.factory( 'marginLeft' );

anim8.property.borderRadius             = anim8.property.factory( 'borderRadius' );
anim8.property.borderTopLeftRadius      = anim8.property.factory( 'borderTopLeftRadius' );
anim8.property.borderTopRightRadius     = anim8.property.factory( 'borderTopRightRadius' );
anim8.property.borderBottomLeftRadius   = anim8.property.factory( 'borderBottomLeftRadius' );
anim8.property.borderBottomRightRadius  = anim8.property.factory( 'borderBottomRightRadius' );

anim8.property.borderWidth              = anim8.property.factory( 'borderWidth' );
anim8.property.borderTopWidth           = anim8.property.factory( 'borderTopWidth' );
anim8.property.borderRightWidth         = anim8.property.factory( 'borderRightWidth' );
anim8.property.borderBottomWidth        = anim8.property.factory( 'borderBottomWidth' );
anim8.property.borderLeftWidth          = anim8.property.factory( 'borderLeftWidth' );

anim8.property.outlineWidth             = anim8.property.factory( 'outlineWidth' );
anim8.property.textIndent               = anim8.property.factory( 'textIndent' );
anim8.property.borderSpacing            = anim8.property.factory( 'borderSpacing' );
anim8.property.fontSize                 = anim8.property.factory( 'fontSize' );
anim8.property.lineHeight               = anim8.property.factory( 'lineHeight' );
anim8.property.zIndex                   = anim8.property.factory( 'zIndex' );

anim8.property.color                    = anim8.property.factoryColor( 'color' );
anim8.property.backgroundColor          = anim8.property.factoryColor( 'backgroundColor' );
anim8.property.borderTopColor           = anim8.property.factoryColor( 'borderTopColor' );
anim8.property.borderRightColor         = anim8.property.factoryColor( 'borderRightColor' );
anim8.property.borderBottomColor        = anim8.property.factoryColor( 'borderBottomColor' );
anim8.property.borderLeftColor          = anim8.property.factoryColor( 'borderLeftColor' );
anim8.property.outlineColor             = anim8.property.factoryColor( 'outlineColor' );

anim8.property.minWidth                 = anim8.property.factory( 'minWidth' );
anim8.property.minWidth.set             = (function() {
  
  /* < IE 8 */
  if (anim8.browser.IE && anim8.browser.IE < 8)
  {
    return function(e, anim) {
      e.style.width = 'expression( this.scrollWidth \< ' + (anim.frame.minWidth + 1) + ' ? "' + anim.frame.minWidth + anim.units.minWidth + '" : "auto")';
    };
  }
  
  /* Others */
  return function(e, anim) {
    e.style.minWidth = anim.frame.minWidth + anim.units.minWidth;
  };
  
})();

anim8.property.maxWidth                 = anim8.property.factory( 'maxWidth' );
anim8.property.maxWidth.set             = (function() {
  
  /* < IE 8 */
  if (anim8.browser.IE && anim8.browser.IE < 8)
  {
    return function(e, anim) {
      e.style.width = 'expression( this.scrollWidth > ' + (anim.frame.maxWidth - 1) + ' ? "' + anim.frame.maxWidth + anim.units.maxWidth + '" : "auto")';
    };
  }
  
  /* Others */
  return function(e, anim) {
    e.style.maxWidth = anim.frame.maxWidth + anim.units.maxWidth;
  };
  
})();

anim8.property.minHeight                = anim8.property.factory( 'minHeight' );
anim8.property.minHeight.set            = (function() {
  
  /* < IE 8 */
  if (anim8.browser.IE && anim8.browser.IE < 8)
  {
    return function(e, anim) {
      e.style.height = 'expression( this.scrollHeight \< ' + (anim.frame.minHeight + 1) + ' ? "' + anim.frame.minHeight + anim.units.minHeight + '" : "auto")';
    };
  }
  
  /* Others */
  return function(e, anim) {
    e.style.minHeight = anim.frame.minHeight + anim.units.minHeight;
  };
  
})();

anim8.property.maxHeight                = anim8.property.factory( 'maxHeight' );
anim8.property.maxHeight.set            = (function() {
  
  /* < IE 8 */
  if (anim8.browser.IE && anim8.browser.IE < 8)
  {
    return function(e, anim) {
      e.style.height = 'expression( this.scrollHeight > ' + (anim.frame.maxHeight - 1) + ' ? "' + anim.frame.maxHeight + anim.units.maxHeight + '" : "auto")';
    };
  }
  
  /* Others */
  return function(e, anim) {
    e.style.maxHeight = anim.frame.maxHeight + anim.units.maxHeight;
  };
  
})();

anim8.property.width = anim8.property.factory('width', function(e, anim) {
  return { value: e.offsetWidth, unit: 'px' };
});

anim8.property.height = anim8.property.factory('height', function(e, anim) {
  return { value: e.offsetHeight, unit: 'px' };
});

anim8.property.top = anim8.property.factory('top', function(e, anim) {
  return { value: e.offsetTop, unit: 'px' };
});

anim8.property.right = anim8.property.factory('right', function(e, anim) {
  return { value: e.parentNode.offsetWidth - (e.offsetLeft + e.offsetWidth), unit: 'px' };
});

anim8.property.bottom = anim8.property.factory('bottom', function(e, anim) {
  return { value: e.parentNode.offsetHeight - (e.offsetTop + e.offsetHeight), unit: 'px' };
});

anim8.property.left = anim8.property.factory('left', function(e, anim) {
  return { value: e.offsetLeft, unit: 'px' };
});

anim8.property.transformOrigin = (function() {
  
  var css = anim8.prefix(['WebkitTransformOrigin', 'MozTransformOrigin', 'OTransformOrigin', 'msTransformOrigin', 'transformOrigin']);
  
  var keywords = {
    'left':   { value: 0,   unit: '%' },
    'center': { value: 50,  unit: '%' },
    'right':  { value: 100, unit: '%' },
    'top':    { value: 0,   unit: '%' },
    'bottom': { value: 100, unit: '%' },
  };
  
  var setOriginAttribute = function(value, anim, attr) {
    if (anim.animating[attr] === false) {
      var parsed = keywords[value] || anim8.parse( value );
      if (parsed) {
        anim.frame[attr] = parsed;
        anim.animating[attr] = true;
      }
    }
  };
  
  var setOrigin = function(split, anim) {
    if (anim.animating.origin === false) {
      if ((split.length === 1) || 
          (split.length === 2 && split[0] === split[1]) || 
          (split.length === 3 && split[0] === split[1] && split[1] === split[2])) 
      {     
        setOriginAttribute( split[0], anim, 'origin' );            
      }            
    }
  };
  
  if (css) {
    
    return {
      prep: function(e, anim) {
        
      },
      get: function(e, anim) {
        if (e.style[css]) {
          var origin = e.style[css].toLowerCase();
          var split = origin.split(' ');
          switch (split.length) {
          case 3:
            setOriginAttribute( split[0], anim, 'originX' );
            setOriginAttribute( split[1], anim, 'originY' );
            setOriginAttribute( split[2], anim, 'originZ' );
            setOrigin( split, anim );
            break;
          case 2:
            setOriginAttribute( split[0], anim, 'originX' );
            setOriginAttribute( split[1], anim, 'originY' );
            setOrigin( split, anim );
            break;
          case 1:
            setOriginAttribute( split[0], anim, 'originX' );
            setOriginAttribute( split[0], anim, 'originY' );
            setOrigin( split, anim );
            break;
          }
        }
      },
      set: function(e, anim) {
        var ox = anim8.coalesce( anim.frame.originX, anim.frame.origin );
        var oy = anim8.coalesce( anim.frame.originY, anim.frame.origin );
        
        if (anim.frame.originZ) {
          var oz = anim8.coalesce( anim.frame.originZ, anim.frame.origin ); 
          e.style[css] = ox + anim.units.originX + ' ' + oy + anim.units.originY + ' ' + oz + anim.units.originZ;
        } else {
          e.style[css] = ox + anim.units.originX + ' ' + oy + anim.units.originY;
        }
      }
    };
    
  }
  
  return anim8.noop;
  
})();

anim8.property.transform = (function() {
  
  var css = anim8.prefix(['WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'transform']);
  
  // IE10 transform
  // IE9 msTransform
  // IE8 msFilter "progid:DXImageTransform.Microsoft.Matrix( )"
  // IE6&7 filter progid:DXImageTransform.Microsoft.Matrix( )
  if (anim8.browser.IE) {
    // TODO
  }
  
  if (css)
  {
    var d2 = {translate:true, scale:true};
    var d3 = {translate3d:true, scale3d:true};
    var d4 = {rotate3d: true};
    var united = {rotate:true, rotateX: true, rotateY: true, rotateZ: true};
    var axis = ['X', 'Y', 'Z'];
    
    var regex = {
      translate: /translate\(([^,]+)\s*,\s*([^\)]+)\)/i,
      translate3d: /translate3d\(([^,]+)\s*,\s*([^,]+)\s*,\s*([^\)]+)\)/i,
      translateX: /translateX\(([^\)]+)\)/i,
      translateY: /translateY\(([^\)]+)\)/i,
      translateZ: /translateZ\(([^\)]+)\)/i,
      scale: /scale\(([^,]+)\s*,\s*([^\)]+)\)/i,
      scale3d: /scale3d\(([^,]+)\s*,\s*([^,]+)\s*,\s*([^\)]+)\)/i,
      scaleX: /scaleX\(([^\)]+)\)/i,
      scaleY: /scaleY\(([^\)]+)\)/i,
      scaleZ: /scaleZ\(([^\)]+)\)/i,
      rotate: /rotate\(([^\)]+)\)/i,
      rotate3d: /rotate3d\(([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^\)]+)\)/i,
      rotateX: /rotateX\(([^\)]+)\)/i,
      rotateY: /rotateY\(([^\)]+)\)/i,
      rotateZ: /rotateZ\(([^\)]+)\)/i
    };
    
    return {
      get: function(e, anim) {
        
        var style = e.style[css];
        
        for (var attr in anim.animating) {
          if (anim.animating[attr] === false && attr in regex) {
            var parsed = regex[attr].exec( style );
            if (parsed) {
              if (attr in d4) {
                anim.frame[attr] = {
                  x: anim8.parseValue( parsed[1] ),
                  y: anim8.parseValue( parsed[2] ),
                  z: anim8.parseValue( parsed[3] ),
                  angle: anim8.parseValue( parsed[4] )
                };
              }
              else if (attr in d3) {
                anim.frame[attr] = {
                  x: anim8.parseValue( parsed[1] ),
                  y: anim8.parseValue( parsed[2] ),
                  z: anim8.parseValue( parsed[3] )
                };
              }
              else if (attr in d2) {
                anim.frame[attr] = {
                  x: anim8.parseValue( parsed[1] ),
                  y: anim8.parseValue( parsed[2] )
                };
              }
              else {
                anim.frame[attr] = anim8.parseValue( parsed[1] );
              }
              
              anim.animating[attr] = true;
            }
          }
        }
      },
      set: function(e, anim) {
        
        var transforms = [];
        
        for (var attr in regex) {
          if (attr in anim.frame) {
            var value = anim.frame[attr];
            
            if (attr in d4) {
              transforms.push( attr + '(' + value.x + ',' + value.y + ',' + value.z + ',' + value.angle + (anim.units[attr] || '') + ')' );
            }
            else if (attr in d3) {
              transforms.push( attr + '(' + value.x + ',' + value.y + ',' + value.z + ')' );
            }
            else if (attr in d2) {
              transforms.push( attr + '(' + value.x + ',' + value.y + ')' );
            }
            else if (attr in united) {
              transforms.push( attr + '(' + value + (anim.units[attr] || '') + ')' );
            }
            else {
              transforms.push( attr + '(' + value + ')' );
            }
          }
        }
        
        if (transforms.length) {
          e.style[css] = transforms.join(' ');
        }
        
      }
    };
    
    // scale, scaleX, scaleY
    // translate, translateX, translateY
    // scale3d, translate3d, rotate3d
    // rotate, 
    // skew
  }
  
  
})();

anim8.property.opacity = (function() {
  
  /* IE 8 */
  if (anim8.browser.IE === 8) 
  {
    var regex = /progid:DXImageTransform\.Microsoft\.Alpha\(Opacity=([^\)]+)\)/i;
    
    return {
      prep: function(e, anim) {
        
      },
      get: function(e, anim) {
        if (anim.animating.opacity === false) {
          var parsed = regex.exec( e.style.msFilter );
          if (parsed) {
            anim.frame.opacity = { value: parseFloat( parsed[1] ) };
            anim.animating.opacity = true;
          }
        }
      },
      set: function(e, anim) {
        e.style.msFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (attrs.opacity * 100) + ')"';
      }
    };
    
  }
  /* IE 5 - 7 */
  if (anim8.browser.IE === 7 || anim8.browser.IE === 6 || anim8.browser.IE === 5) 
  {  
    var regex = /alpha\(opacity=([^\)]+)\)/i;
    
    return {
      prep: function(e, anim) {
        
      },
      get: function(e, anim) {
        if (anim.animating.opacity === false) {
          var parsed = regex.exec( e.style.filter );
          if (parsed) {
            anim.frame.opacity = { value: parseFloat( parsed[1] ) };
            anim.animating.opacity = true;
          }
        }
      },
      set: function(e, anim) {
        e.style.filter = 'alpha(opacity=' + (attrs.opacity * 100) + ')';
        e.style.zoom = 1;
      }
    }; 
  }
  /* Others */
  var css = anim8.prefix(['WebkitOpacity', 'MozOpacity', 'KhtmlOpacity', 'opacity']);
  if (css) 
  {  
    return {
      prep: function(e, anim) {
        
      },
      get: function(e, anim) {
        if (anim.animating.opacity === false) {
          if ( anim8.isNumber( e.style[css] ) ) {
            anim.frame.opacity = { value: e.style[css] };
            anim.animating.opacity = true;
          }
        }
      },
      set: function(e, anim) {
        e.style[css] = attrs.opacity;
      }
    };
  }
  
  return false;
  
})();

anim8.property.filter = (function() {
  
  var css = anim8.prefix(['WebkitFilter', 'MozFilter', 'OFilter', 'msFilter', 'filter']);
  
  var patterns = {};
  
  if (anim8.browser.IE) {
    
    patterns.blur = /progid:DXImageTransform\.Microsoft\.Blur\(PixelRadius=([^']+)\)/;
    pattners.opacity = /progid:DXImageTransform\.Microsoft\.Alpha\(Opacity=([^\)]+)\)/;

    /*
    
    grayscale_( e, current );
    sepia_( e, current );
    saturate_( e, current );
    hueRotate_( e, current );
    invert_( e, current );
    brightness_( e, current );
    contrast_( e, current );
    
        var hueRotate_ = function(e, frame)
        {
          if (!anim8.isDefined(frame.hueRotate)) {
            return;
          }
          var css = anim8.prefix(['WebkitFilter', 'MozFilter', 'OFilter', 'msFilter', 'filter']);
          if (css) {
            e.style[css] = 'hue-rotate(' + frame.hueRotate + 'deg)';
          }
        };
    
    */
    
    /* IE 8 */
    if (anim8.browser.IE === 8) {
      return function(out, attrs, props) {
        out.filter = '"progid:DXImageTransform.Microsoft.Blur(PixelRadius=\'' + out.blur + 'px\')"'
      };
    }
    /* < IE 8 */  
    if (anim8.browser.IE < 8) {
      return function(out, attrs, props) {
        out.filter = 'progid:DXImageTransform.Microsoft.Blur(PixelRadius=\'' + out.blur + 'px\')'
      };
    }
  }
  
  /* Others */
  if (css) {
    return function(out, attrs, props) {
      out[css] = 'blur(' + attrs.blur + 'px)';
    };
  }
  
})();
      
      
      // 1. Get set of all attributes
      // 2. Determine properties, 
      
      // ====== ATTRIBUTES ======
      // [X] width, minWidth, maxWidth
      // [X] height, minHeiht, maxHeight
      // [X] angle, distance
      // [ ] centerX | left | right | translateX
      // [ ] centerY | top | bottom | translateY
      // [ ] scale, scaleX, scaleY
      // [ ] scale3d, translate3d, rotate3d
      // [X] originX, originY
      // [X] opacity
      // [X] zIndex
      // [X] margin, marginTop, marginRight, marginBottom, marginLeft
      // [X] padding, paddingTop, paddingRight, paddingBottom, paddingLeft
      // [X] borderWidth, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth
      // [ ] outlineWidth
      // [X] borderRadius, borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius
      // [ ] textIndent
      // [ ] borderSpacing
      // [ ] fontSize
      // [ ] lineHeight
      // [ ] blur, grayscale, contrast, brightness, saturation, hue-rotate, invert, sepia
      // ===== COLOR ======
      // [X] backgroundColor, color, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, outlineColor

anim8.attribute.padding                 = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.paddingTop              = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.paddingRight            = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.paddingBottom           = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.paddingLeft             = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.margin                  = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.marginTop               = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.marginRight             = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.marginBottom            = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.marginLeft              = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderRadius            = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderTopLeftRadius     = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderTopRightRadius    = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderBottomLeftRadius  = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderBottomRightRadius = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderWidth             = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderTopWidth          = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderRightWidth        = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderBottomWidth       = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.borderLeftWidth         = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.angle                   = {defaultValue: 0, applier: 'orbit'};
anim8.attribute.distance                = {defaultValue: 0, applier: 'orbit'};
anim8.attribute.origin                  = {defaultValue: 0};
anim8.attribute.originX                 = {defaultValue: 50, defaultUnit: '%', applier: 'origin'};
anim8.attribute.originY                 = {defaultValue: 50, defaultUnit: '%', applier: 'origin'};
anim8.attribute.opacity                 = {defaultValue: 1};
anim8.attribute.zIndex                  = {defaultValue: 1};
anim8.attribute.width                   = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.minWidth                = {defaultValue: 0, defaultUnit: 'px', applier: 'width'};
anim8.attribute.maxWidth                = {defaultValue: 0, defaultUnit: 'px', applier: 'width'};
anim8.attribute.height                  = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.minHeight               = {defaultValue: 0, defaultUnit: 'px', applier: 'height'};
anim8.attribute.maxHeight               = {defaultValue: 0, defaultUnit: 'px', applier: 'height'};

anim8.attribute.top                     = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.right                   = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.bottom                  = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.left                    = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.centerX                 = {defaultValue: 0, defaultUnit: 'px'};
anim8.attribute.centerY                 = {defaultValue: 0, defaultUnit: 'px'};

anim8.attribute.blur                    = {defaultValue: 0, defaultUnit: 'px'};

anim8.attribute.rotate                  = {defaultValue: 0, defaultUnit: 'deg', property: 'transform'};
anim8.attribute.scale                   = {defaultValue: 0, property: 'transform', calculator: 'point2d'};

anim8.attribute.backgroundColor         = {defaultValue: m8.color(), applier: 'color', interpolate: 'color', property: 'color'};
anim8.attribute.color                   = {defaultValue: m8.color(), applier: 'color', interpolate: 'color', property: 'color'};
anim8.attribute.borderTopColor          = {defaultValue: m8.color(), applier: 'color', interpolate: 'color', property: 'color'};
anim8.attribute.borderRightColor        = {defaultValue: m8.color(), applier: 'color', interpolate: 'color', property: 'color'};
anim8.attribute.borderBottomColor       = {defaultValue: m8.color(), applier: 'color', interpolate: 'color', property: 'color'};
anim8.attribute.borderLeftColor         = {defaultValue: m8.color(), applier: 'color', interpolate: 'color', property: 'color'};
anim8.attribute.outlineColor            = {defaultValue: m8.color(), applier: 'color', interpolate: 'color', property: 'color'};