$(document).ready(function () {
      $("#contactForm").on("submit", function (e) {
        e.preventDefault();

        // Clear previous errors
        $(".error").text("");
        $("#formMessage").text("");

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let subject = $("#subject").val().trim();
        let message = $("#message").val().trim();
        let hasError = false;

        if (name === "") {
          $("#error-name").text("Name is required.");
          hasError = true;
        }
        if (email === "") {
          $("#error-email").text("Email is required.");
          hasError = true;
        } else if (!email.match(/^\S+@\S+\.\S+$/)) {
          $("#error-email").text("Enter a valid email.");
          hasError = true;
        }
        if (subject === "") {
          $("#error-subject").text("Subject is required.");
          hasError = true;
        }
        if (message === "") {
          $("#error-message").text("Message is required.");
          hasError = true;
        }

        if (!hasError) {
          // Send data via AJAX to Formspree
          $.ajax({
            url: "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT", // Replace with your Formspree endpoint
            method: "POST",
            data: {
              name: name,
              email: email,
              subject: subject,
              message: message
            },
            dataType: "json",
            success: function () {
              $("#formMessage").text("Message sent successfully!").css("color", "#00ffcc");
              $("#contactForm")[0].reset();
            },
            error: function () {
              $("#formMessage").text("Something went wrong. Try again.").css("color", "#ff6b6b");
            }
          });
        }
      });
    });