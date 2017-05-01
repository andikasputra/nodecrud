$(window).on('scroll', function(){
	var top = $(window).scrollTop();
	console.log(top);
	if (top > 80) {
		$('#main-nav').addClass('navbar-default');
	} else {
		$('#main-nav').removeClass('navbar-default');
	}

	// jika scroll lebih dari 800px
	if (top > 800) {
		$('#product-1 .img-responsive').css('transform', 'translateY(0)');
		$('#product-1 .img-responsive').css('opacity', 1);
		$('#product-1 h2').css('transform', 'translateY(0)');
		$('#product-1 h2').css('opacity', 1);
		$('#product-1 p').css('transform', 'translateY(0)');
		$('#product-1 p').css('opacity', 1);
		$('#product-1 .line').css('width', '160px');
	}

	// jika scroll lebih dari 1300px
	if (top > 1300) {
		$('#product-2 .img-responsive').css('transform', 'translateY(0)');
		$('#product-2 .img-responsive').css('opacity', 1);
		$('#product-2 h2').css('transform', 'translateY(0)');
		$('#product-2 h2').css('opacity', 1);
		$('#product-2 p').css('transform', 'translateY(0)');
		$('#product-2 p').css('opacity', 1);
		$('#product-2 .line').css('width', '160px');
	}
});

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
