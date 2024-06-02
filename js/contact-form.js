$(document).ready(function() {
    "use strict";

    $(".contact-form").submit(function(e) {
        e.preventDefault();

        var name = $(".name").val();
        var email = $(".email").val();
        var subject = $(".subject").val() || 'No Subject';
        var msg = $(".message").val();

        $(".form-control").removeClass("error");

        if (name === "") {
            handleValidationError(".name", "Name is required");
            return false;
        } else {
            markAsSuccess(".name");
        }

        if (email === "") {
            handleValidationError(".email", "Email is required");
            return false;
        } else {
            markAsSuccess(".email");
        }

        if (msg === "") {
            handleValidationError(".message", "Message is required");
            return false;
        } else {
            markAsSuccess(".message");
        }

        var dataString = {
            name: name,
            email: email,
            subject: subject,
            msg: msg
        };

        $(".loading").fadeIn("slow").html("Loading...");

        $.ajax({
            type: "POST",
            url: "php/contactForm.php",
            data: dataString,
            cache: false,
            success: function(response) {
                $(".form-control").removeClass("success");
                if (response.trim() === 'success') {
                    displayMessage('Mail sent Successfully.', '#48af4b');
                } else {
                    handleError("Mail not sent.", response);
                }
            },
            error: function(xhr, status, error) {
                handleError("An error occurred: " + error);
            }
        });

        return false;
    });

    $("#reset").on('click', function() {
        $(".form-control").removeClass("success").removeClass("error");
    });

    function handleValidationError(selector, message) {
        $(selector).closest(".form-control").addClass("error");
        $(selector).focus();
        displayMessage(message, '#ff5607');
    }

    function markAsSuccess(selector) {
        $(selector).closest(".form-control").removeClass("error").addClass("success");
    }

    function handleError(message, response) {
        displayMessage(message, '#ff5607');
        console.error(message, response || '');
    }

    function displayMessage(message, color) {
        $('.loading').fadeIn('slow').html('<font color="' + color + '">' + message + '</font>').delay(3000).fadeOut('slow');
    }
});
