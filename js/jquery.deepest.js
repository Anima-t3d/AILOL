$.fn.deepest = function() {
	/* based on: http://stackoverflow.com/questions/3787924/select-deepest-child-in-jquery
	 * rewrite from: https://gist.github.com/714851
	 * rewritten by: Anima-t3d march 1st 2011
	 */
	/// <summary>
	///   Return the deepest child of this element.
	///   var deepestElement = $("div").deepest();
	///		For example, when run on this structure:
	///		
	///		<div>
	///		  <span> <b>pick me!</b> </span>
	///		  <span> </span>
	///		</div>
	///		
	///		It would return the element:
	///		alert(deepestElement);
	///		<b>pick me!</b>
	/// </summary>
	
	var $target = $(this).children();

	while( $target.length ) {
	  $target = $target.children();
	}
	
	return $target.end();
};