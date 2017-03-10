/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
    "use strict";
    app.addModule("usersList", {
        createUsersList: createUsersList
    });

    var arrayUtils = app.getModule("arrayUtils");
    var userModule = app.getModule("user");

    function createUsersList(usersList, onUserDeleted, onAssignChanged) {
        var controller =  new CreateController(usersList, onUserDeleted, onAssignChanged);
        return createView(controller);
    }

    function createView(controller) {
        var usersList = controller.getUsersList();

        var $viewTemplate = $('\
            <div class="usersList">\
                <div>\
                    Sort by name:\
                        <button class="sortByUserNameAscending" type="button">A...z</button>\
                        <button class="sortByUserNameDescending" type="button">Z...a</button>\
                </div>\
                <ul></ul>\
            </div>'
        );

        var $listContainer = $viewTemplate.find("ul");

        $viewTemplate.find(".sortByUserNameAscending").on("click", function() {
            controller.sortUsers("name", "ascending");
        });

        $viewTemplate.find(".sortByUserNameDescending").on("click", function() {
            controller.sortUsers("name", "descending");
        });

        controller.addResetView(buildUsersList);
        app.addMethod("usersList", "refreshView", buildUsersList);

        buildUsersList();
        function buildUsersList() {
            $listContainer.empty();
            usersList.forEach(function (user) {
                $listContainer.append(userModule.createUser(user, controller.deleteUser.bind(controller), controller.onAssignChanged));
            })
        }

        return $viewTemplate;
    }

    function CreateController(usersList, onUserDeleted, onAssignChanged) {
        this._usersList = usersList || [];
        this._onUserDeleted = onUserDeleted || $.noop;
        this.onAssignChanged = onAssignChanged || $.noop;
    }
    CreateController.prototype = {
        addUser: addUser,
        deleteUser: deleteUser,
        checkEmailUnique: checkEmailUnique,
        sortUsers: sortUsers,
        getUsersList: getUsersList,
        addResetView: addResetView
    };

    function addUser(newUser) {
        if (this.checkEmailUnique(newUser)) {
            this._usersList.push(newUser);
            this.resetView();
            return true;
        }
        else {
            alert("User with this email already exist");
        }
    }

    function deleteUser(user) {
        var index = this._usersList.indexOf(user);
        this._onUserDeleted(this._usersList.splice(index, 1)[0]);
        this.resetView();
    }

    function checkEmailUnique(user) {
        return arrayUtils.findInArray(this._usersList, {email: user.email});
    }

    function sortUsers(field, direction) {
        arrayUtils.sortArray(this._usersList, field, direction);
    }

    function getUsersList() {
        return this._usersList;
    }

    function addResetView(resetView) {
        this.resetView = resetView;
    }
})();