const login = function(event) {
  event.preventDefault();
  const username = $("#login-username").val();
  // const password = $('#login-password').val();

  //redirect to chat page in html routes
  window.location.href = "/chat";
  //save user in localstorage
  localStorage.setItem("user", username);
};

const register = function(event) {
  event.preventDefault();
  const username = $("#reg-username").val();
  const password1 = $("#reg-password1").val();
  const password2 = $("#reg-password2").val();
  if (password1 === password2) {
    $.ajax({
      url: "/api/register",
      method: "POST",
      data: { username: username, password: password1 }
    }).then(function() {
      $("#register-msg").append(
        "Successfully created user! Please continue login below"
      );
    });
  } else {
    $("#register-msg").append(
      "Passwords not matched! Re-enter"
    );
    // $("#pws-not-matched").modal("show");
  }
};

$("#login-btn").on("click", login);
$("#reg-btn").on("click", register);
