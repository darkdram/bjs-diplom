let _userForm = new UserForm;

//авторизация
_userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
        response['success'] ? location.reload() : _userForm.setLoginErrorMessage(response['data']);
    });
};
// регистрация
_userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        response['success'] ? location.reload() : _userForm.setRegisterErrorMessage(response['data']);
    });
};