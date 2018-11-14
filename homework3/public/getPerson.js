$( document ).ready(function() {
	$( function() {
		$( "button" ).click( function( event ) {
			// Make GET request by the entered employee ID
			$.ajax({
				url:"/people/" + $( '#emp_id' ).val(),
				type: "GET",
				success: (response) => $("#result p").html(response + "<br>"),
				error: (error) => {
					$("#result p").html("Oops there was some kind of error...");					
					console.log(error);
				}
			});
		});
	});
});