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

        var dataString = `<contact>
                              <name>${name}</name>
                              <email>${email}</email>
                              <subject>${subject}</subject>
                              <message>${msg}</message>
                          </contact>`;

        $(".loading").fadeIn("slow").html("Loading...");

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "php/contactForm.php", true);
        xhr.setRequestHeader("Content-Type", "application/xml");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                $(".form-control").removeClass("success");
                if (xhr.status === 200 && xhr.responseText.trim() === 'success') {
                    $('.loading').fadeIn('slow').html('<font color="#48af4b">Mail sent Successfully.</font>').delay(3000).fadeOut('slow');
                } else {
                    $('.loading').fadeIn('slow').html('<font color="#ff5607">Mail not sent.</font>').delay(3000).fadeOut('slow');
                    console.log("Response:", xhr.responseText);
                }
            }
        };

        xhr.onerror = function() {
            $('.loading').fadeIn('slow').html('<font color="#ff5607">An error occurred: ' + xhr.statusText + '</font>').delay(3000).fadeOut('slow');
            console.log("AJAX error:", xhr.statusText);
        };

        xhr.send(dataString);

        return false;
    });

    $("#reset").on('click', function() {
        $(".form-control").removeClass("success").removeClass("error");
    });
});
