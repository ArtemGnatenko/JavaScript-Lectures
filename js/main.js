(function () {
    var addUserForm = app.getModule("addUserForm");
    var usersList = app.getModule("usersList");
    var users = [];
    $("h1").after(addUserForm.createAddUserForm(function (user) {
        users.push(user);
		usersList.refreshView();
        return true;
    })).next().after(usersList.createUsersList(users));


})();