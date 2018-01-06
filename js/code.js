$(document).ready(function(){

/* Accordian */
	$('#menus ul > li ul')
	.click(function(event){
		event.stopPropagation();
	})
	.filter(':not(:first)')
	.hide();

	$('#menus ul > li').click(function(){
		var selfClick = $(this).find('ul:first').is(':visible');
		if(!selfClick) {
		  $(this)
		.parent()
		.find('> li ul:visible')
		.slideToggle();
		}

		$(this)
		.find('ul:first')
		.stop(true, true)
		.slideToggle();
	});
});

/* Image Gallery, Rotation & Modal */
$(document).ready(function() {
	rotatePics(1);
});

function rotatePics(currentPhoto) {
	var numberOfPhotos = $('#imageGallery a img').length;
	currentPhoto = currentPhoto % numberOfPhotos;
	$('#imageGallery a img').eq(currentPhoto).fadeOut(function() {
		// re-order the z-index
		$('#imageGallery a img').each(function(i) {
			$(this).css('zIndex', ((numberOfPhotos - i) + currentPhoto) % numberOfPhotos);
		});

		$(this).show();
		setTimeout(function() {
			rotatePics(++currentPhoto);
		}, 4000);
	});
}

$(document).ready(function(){
  $('a.lightbox').on('click', (function(e) {
    $('body').css('overflow-y', 'hidden'); // hide scrollbars!
    
    $('<div id="overlay"></div>')
      .animate({'opacity': '0.5'}, 'slow')
      .appendTo('body');

    $('<div id="lightbox"></div>')
      .hide()
      .appendTo('body');
      
    $('<img>')
      .attr('src', $(this).attr('href'))
      .css('position', 'absolute')
      .css('width', '680px')
      .css('height', '447px')
      .on('load', (function() {
        positionLightboxImage();
      }))
      // position lightbox after it is appended to the dom so it has a reference to size by
      .on('click', (function() {
        removeLightbox();
      }))
      .appendTo('#lightbox');
    
    return false;
  }));
});

function positionLightboxImage() {
  var top = ($(window).height() - $('#lightbox').height()) / 2;
  var left = ($(window).width() - $('#lightbox').width()) / 2;
  $('#lightbox')
    .fadeIn();
}

function removeLightbox() {
  $('#overlay, #lightbox')
    .fadeOut('slow', function() {
      $(this).remove();
      $('body').css('overflow-y', 'auto'); // show scrollbars!
    });
}

/* Contact Form */
$(document).ready(function(){

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text('Your message has been received & we will respond shortly!');

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});
