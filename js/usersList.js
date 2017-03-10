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

    function createUsersList(usersList, onUserDeleted, onAssignChange) {
        var controller =  new CreateController(usersList, onUserDeleted, onAssignChange);
        return createView(controller);
    }

    function createView(controller) {
        var usersList = controller.getUsersList();

        var $viewTemplate = $('\
            <div class="usersList">\
                <div>\
                    Sort by name:\
                    <button class="sortByNameAscending" type="button">A...z</button>\
                    <button class="sortByNameDescending" type="button">Z...a</button>\
                </div>\
                <ul></ul>\
            </div>'
        );

        var $listContainer = $viewTemplate.find("ul");

        $viewTemplate.find(".sortByNameAscending").on("click", function() {
            controller.sortUsers("name", "ascending");
        });

        $viewTemplate.find(".sortByNameDescending").on("click", function() {
            controller.sortUsers("name", "descending");
        });

        controller.addResetView(buildUsersList);
        app.addMethod("usersList", "refreshView", buildUsersList);

        buildUsersList();
        function buildUsersList() {
            $listContainer.empty();
            usersList.forEach(function (user) {
                $listContainer.append(userModule.createUser(user, controller.deleteUser.bind(controller), controller.onAssignChange));
            })
        }

        return $viewTemplate;
    }

    function CreateController(usersList, onUserDeleted, onAssignChange) {
        this._usersList = usersList || [];
        this._onUserDeleted = onUserDeleted || $.noop;
        this.onAssignChange = onAssignChange || $.noop;
    }
    CreateController.prototype = {
        deleteUser: deleteUser,
        checkEmailUnique: checkEmailUnique,
        sortUsers: sortUsers,
        getUsersList: getUsersList,
        addResetView: addResetView
    };

    function deleteUser(user) {
        var index = this.getUsersList().indexOf(user);
        this._onUserDeleted(this.getUsersList().splice(index, 1)[0]);
        this.resetView();
    }

    function checkEmailUnique(user) {
        return arrayUtils.findInArray(this.getUsersList(), {email: user.email});
    }

    function sortUsers(field, direction) {
        arrayUtils.sortArray(this.getUsersList(), field, direction);
        this.resetView();
    }

    function getUsersList() {
        return this._usersList;
    }

    function addResetView(resetView) {
        this.resetView = resetView;
    }
})();