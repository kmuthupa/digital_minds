// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
// *** set carousel interval *** //
$(document).ready(function() {
	
	$('.carousel').carousel({
		interval: 3500
	});
	
	/*** Contact modal ***/    
    $('#contact').on('show', function () {
        resetContactForm(true);
    })

    $("#contact-submit").click(function(e){
        $('#contact').find('.inline-errors').remove();
        var valid = true;
        var url = $('#contact').attr('url');
        var name = $('#contact').find('#name');
        var email = $('#contact').find('#email');
        var about = $('#contact').find('#about').val();
        var comments = $('#contact').find('#comments');
        if (name.val() === '' || name.val() === undefined) {
            valid = false;
            name.after("<p class='inline-errors'>can't be blank</p>");
        }
        if (email.val() === '' || email.val() === undefined || !isValidEmail(email.val())) {
            valid = false;
            email.after("<p class='inline-errors'>can't be blank or invalid</p>");
        }
        if (comments.val() === '' || comments.val() === undefined) {
            valid = false;
            comments.after("<p class='inline-errors'>can't be blank</p>");
        }
        if (valid) {
            $("#contact-submit").hide();
            $('#contact').find('.loader').show();
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    name: name.val(),
                    email: email.val(),
                    about: about,
                    comments: comments.val()
                },
                success: function(data) {
                    $('#contact').modal('hide');
                    if (data === 'success') {
                        $('.notice-area').html("<div class='alert alert-success'>Thanks! Your message was successfully sent.</div>")
                    }
                    else {
                        $('.notice-area').html("<div class='alert alert-error'>There was a problem. Please retry later.</div>")
                    }
                    setTimeout(hideFlashMessages, 3500);
                }
            });
        }
    });

	var resetContactForm = function(toggle) {
	    $('#contact').find('.inline-errors').remove();
	    if (toggle) {
	        $("#contact-submit").show();
	        $('#contact').find('.loader').hide();
	    }
	    else {
	        $("#contact-submit").hide();
	        $('#contact').find('.loader').show();
	    }
	    $("#contact-submit").show();
	    $('#contact').find('.loader').hide();
	    $('#contact').find('#comments').val('');
	}
	
});

/** utility methods **/
function isValidEmail(email) {
    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return email_regex.test(email.trim());
}

