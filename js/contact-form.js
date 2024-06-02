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
            $(".name").closest(".form-control").addClass("error");
            $(".name").focus();
            return false;
        } else {
            $(".name").closest(".form-control").removeClass("error").addClass("success");
        }

        if (email === "") {
            $(".email").closest(".form-control").addClass("error");
            $(".email").focus();
            return false;
        } else {
            $(".email").closest(".form-control").removeClass("error").addClass("success");
        }

        if (msg === "") {
            $(".message").closest(".form-control").addClass("error");
            $(".message").focus();
            return false;
        } else {
            $(".message").closest(".form-control").removeClass("error").addClass("success");
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
                    $('.loading').fadeIn('slow').html('<font color="#48af4b">Mail sent Successfully.</font>').delay(3000).fadeOut('slow');
                } else {
                    $('.loading').fadeIn('slow').html('<font color="#ff5607">Mail not sent.</font>').delay(3000).fadeOut('slow');
                    console.log("Response:", response);
                }
            },
            error: function(xhr, status, error) {
                $('.loading').fadeIn('slow').html('<font color="#ff5607">An error occurred: ' + error + '</font>').delay(3000).fadeOut('slow');
            }
        });

        return false;
    });

    $("#reset").on('click', function() {
        $(".form-control").removeClass("success").removeClass("error");
    });
});
