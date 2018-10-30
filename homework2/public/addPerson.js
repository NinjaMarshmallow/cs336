$( document ).ready(function() {
	$( function() {
		$( ".widget input[type=submit], .widget a, .widget button" ).button();
		$( "button" ).click( function( event ) {
			// Let user know their record has been added
			$("<em>", {html: "Person entry completed."}).appendTo("body");
		});
	});
});