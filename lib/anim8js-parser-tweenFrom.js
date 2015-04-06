
/**
 * Instantiates a new parser for the 'tweenFrom' animation type.
 */
anim8.ParserTweenFrom = function()
{
  
};

// ParserTweenFrom extends anim8.Parser()
anim8.override( anim8.ParserTweenFrom.prototype = new anim8.Parser(),
{
    
  /**
   * Parses the animation object (and optionally an option object) and pushes
   * all generated attrimators to the given array.
   * 
   * @param {object} animation
   * @param {object} options
   * @param {anim8.AttrimatorMap} attrimatorMap
   */
  parse: function( animation, options, attrimatorMap )
  {
    // 1. Starting values are all true which signals to Animator to replace those points with the animator's current values.

    var factory    = anim8.factory( animation.factory );
    var tweenFrom  = animation.tweenFrom;
    var durations  = animation.durations || {};
    var easings    = animation.easings || {};
    var delays     = animation.delays || {};
    var sleeps     = animation.sleeps || {};
    var repeats    = animation.repeats || {};
    var scales     = animation.scales || {};
    var scaleBases = animation.scaleBase || {};

  	for (var attr in tweenFrom)
  	{
      var attribute  = factory.attribute( attr );
      var value      = attribute.parse( tweenFrom[attr] );
      var duration   = anim8.coalesce( durations[attr], options.duration );
      var easing     = anim8.coalesce( easings[attr], options.easing );
      var delay      = anim8.coalesce( delays[attr], options.delay );
      var sleep      = anim8.coalesce( sleeps[attr], options.sleep );
      var repeat     = anim8.coalesce( repeats[attr], options.repeat );
      var scale      = anim8.coalesce( scales[attr], options.scale );
      var scaleBase  = anim8.coalesce( scaleBases[attr], options.scaleBase );
      var path       = new anim8.Tween( attr, attribute.calculator, value, anim8.computed.current );
      var event      = new anim8.Event( attr, path, duration, easing, delay, sleep, repeat, scale, scaleBase, true, this );
      
      attrimatorMap.put( attr, event );
  	}
  }
});

/**
 * Register the parser.
 */
anim8.parser['tweenFrom'] = new anim8.ParserTweenFrom();