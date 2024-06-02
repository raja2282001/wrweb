$(document).ready(function() {
    "use strict";

    $(".contact-form").submit(function(e) {
        e.preventDefault();
        
        // Select form elements
        var name = $(".name");
        var email = $(".email");
        var subject = $(".subject");
        var msg = $(".message");
        
        // Flag to track form validation
        var flag = true;

        // Validate form fields
        if (name.val() === "") {
            name.closest(".form-control").addClass("error");
            name.focus();
            flag = false;
            return false;
        } else {
            name.closest(".form-control").removeClass("error").addClass("success");
        }
        
        if (email.val() === "") {
            email.closest(".form-control").addClass("error");
            email.focus();
            flag = false;
            return false;
        } else {
            email.closest(".form-control").removeClass("error").addClass("success");
        }
        
        if (msg.val() === "") {
            msg.closest(".form-control").addClass("error");
            msg.focus();
            flag = false;
            return false;
        } else {
            msg.closest(".form-control").removeClass("error").addClass("success");
        }
        
        // If form validation passes, proceed with AJAX request
        if (flag) {
            var dataString = "name=" + name.val() + "&email=" + email.val() + "&subject=" + "Contact" + "&msg=" + msg.val();
            $(".loading").fadeIn("slow").html("Loading...");
            
            $.ajax({
                type: "POST",
                data: dataString,
                url: "php/contactForm.php", // Adjust URL if needed
                cache: false,
                success: function (response) {
                    $(".form-control").removeClass("success");
                    if (response === 'success') {
                        $('.loading').fadeIn('slow').html('<font color="#48af4b">Mail sent Successfully.</font>').delay(3000).fadeOut('slow');
                    } else {
                        $('.loading').fadeIn('slow').html('<font color="#ff5607">Mail not sent.</font>').delay(3000).fadeOut('slow');
                    }
                },
                error: function(xhr, status, error) {
                    // Handle AJAX errors
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
