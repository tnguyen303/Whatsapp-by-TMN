const login = function(event){
    event.preventDefault();
    const username = $('#login-username').val();
    // const password = $('#login-password').val();

    //redirect to chat page in html routes
    window.location.href = '/chat';
    //save user in localstorage
    localStorage.setItem('user',username);
};

$('#login-btn').on('click', login);
