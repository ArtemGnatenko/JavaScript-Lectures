/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
    app.addModule("user", {
        createUser: createUser
    });

    function createUser(user, onDelete, onAssignChanged) {
        var controller =  new CreateController(user, onDelete, onAssignChanged);
        return createView(controller);
    }

    function createView(controller) {
        var user = controller.getUser();

        var $viewTemplate = $('\
            <li>\
                <p class="userName">'+user.name+'</p>\
                <p class="userEmail">'+user.email+'</p>\
                <lable>Assignd <input class="assignCheckbox" type="checkbox"/> </lable>\
                <button class="deleteButton" type="button">Delete user</button>\
            </li>'
        );

        var $assignCheckbox = $viewTemplate.find(".assignCheckbox");
        var $deleteButton = $viewTemplate.find(".deleteButton");

        $assignCheckbox[0].checked = user.assigned;

        $assignCheckbox.on("change", function() {
            controller.changeAssign(this.checked);
        });

        $deleteButton.on("click", function() {
            controller.deleteUser();
        });

        return $viewTemplate;
    }

    function CreateController(user, onDelete, onAssignChanged) {
        this._user = user || {};
        this._onDelete = onDelete || $.noop;
        this._onAssignChanged = onAssignChanged || $.noop;
    }
    CreateController.prototype = {
        deleteUser: deleteUser,
        changeAssign: changeAssign,
        getUser: getUser
    };

    function changeAssign(value) {
        this._user.assigned = value;
        this._onAssignChanged(this._user);
    }

    function deleteUser() {
        this._onDelete(this._user);
    }

    function getUser() {
        return this._user;
    }
})();