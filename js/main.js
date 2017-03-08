(function () {
    var addUserForm = app.getModule("addUserForm");
    var usersList = app.getModule("usersList");
    var users = [];
    $("h1").after(addUserForm.createAddUserForm(function (user) {
        users.push(user);
        $(".addUser").after(usersList.createUsersList(users));
        return true;
    }));


})();