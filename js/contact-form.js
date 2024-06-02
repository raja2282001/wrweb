$(document).ready(function() {
    "use strict";

    $(".contact-form").submit(function(e) {
        e.preventDefault();
        
        var name = $(".name");
        var email = $(".email");
        var subject = $(".subject");
        var msg = $(".message");
        var flag = true;

        // Clear previous errors
        $(".form-control").removeClass("error");

        // Validate form fields
        if (name.val() === "") {
            name.closest(".form-control").addClass("error");
            name.focus();
            flag = false;
        } else {
            name.closest(".form-control").removeClass("error").addClass("success");
        }

        if (email.val() === "") {
            email.closest(".form-control").addClass("error");
            email.focus();
            flag = false;
        } else {
            email.closest(".form-control").removeClass("error").addClass("success");
        }

        if (msg.val() === "") {
            msg.closest(".form-control").addClass("error");
            msg.focus();
            flag = false;
        } else {
            msg.closest(".form-control").removeClass("error").addClass("success");
        }

        if (flag) {
            var dataString = {
                name: name.val(),
                email: email.val(),
                subject: subject.val(),
                msg: msg.val()
            };

            $(".loading").fadeIn("slow").html("Loading...");

            $.ajax({
                type: "POST",
                url: "php/contactForm.php",
                data: JSON.stringify(dataString),
                contentType: "application/json",
                cache: false,
                success: function(response) {
                    $(".form-control").removeClass("success");
                    if (response.trim() === 'success') {
                        $('.loading').fadeIn('slow').html('<font color="#48af4b">Mail sent Successfully.</font>').delay(3000).fadeOut('slow');
                    } else {
                        $('.loading').fadeIn('slow').html('<font color="#ff5607">Mail not sent.</font>').delay(3000).fadeOut('slow');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    $('.loading').fadeIn('slow').html('<font color="#ff5607">An error occurred.</font>').delay(3000).fadeOut('slow');
                }
            });
        }

        return false;
    });

    $("#reset").on('click', function() {
        $(".form-control").removeClass("success").removeClass("error");
    });
});
