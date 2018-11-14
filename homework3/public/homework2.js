$( document ).ready(function() {
	$( function() {
		$( ".widget input[type=submit], .widget a, .widget button" ).button();
		$( "button" ).click( function( event ) {
			$.ajax({
				url:"/hello",
				dataType : "json", 
				type: "GET",
				data: {
					name: "Lab07" 
				},
				success: (response) => $("<em>", {html: response.result + "<br>"}).appendTo("body"),
				error: (error) => {
					$("<em>", {html: "Oops there was some kind of error..."}).appendTo("body");
					console.log(error);
				}
			});
		});
	});
});