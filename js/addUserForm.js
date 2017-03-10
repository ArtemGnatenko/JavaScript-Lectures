/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
    "use strict";
    app.addModule("addUserForm", {
        createAddUserForm: createAddUserForm
    });

    var validateUtils = app.getModule("validateUtils");

    function createAddUserForm(onAddUser) {
        var controller =  new CreateController(onAddUser);
        return createView(controller);
    }

    function createView(controller) {
        var $viewTemplate = $('\
            <div class="addUser">\
                <input class="userName" type="text" placeholder="User name"/>\
                <input class="userEmail" type="text" placeholder="User email"/>\
                <input class="addUserButton" type="button" value="Add user">\
            </div>'
        );

        var $userName = $viewTemplate.find(".userName");
        var $userEmail = $viewTemplate.find(".userEmail");

        $viewTemplate.find(".addUserButton").on("click", function() {
            controller.addUser($userName.val(), $userEmail.val());
        });

        controller.addResetView(function () {
            $userName.val("");
            $userEmail.val("");
        });

        return $viewTemplate;
    }

    function getUserModel() {
        return {
            name: "",
            email: "",
            assigned: false,
            assignedTo: []
        }
    }

    function CreateController(onAddUser) {
        this._onAddUser = onAddUser;
        this._userModel = getUserModel();
    }
    CreateController.prototype = {
        addUser: addUser,
        validateForm: validateForm,
        addResetView: addResetView
    };

    function addUser(userName, userEmail) {
        this._userModel.name = userName;
        this._userModel.email = userEmail;
        if (this.validateForm() && this._onAddUser(this._userModel)) {
            this._userModel = getUserModel();
            this.resetView();
        }
    }

    function validateForm() {
        var errorMessage = "";
        if (!validateUtils.validateRequired(this._userModel.name)) {
            errorMessage += "Field User Name is required\n";
        }
        if (!validateUtils.validateRequired(this._userModel.email)) {
            errorMessage += "Field User Email is required\n";
        }
        else if (!validateUtils.validateEmail(this._userModel.email)) {
            errorMessage += "Field User Email is invalid\n";
        }
        if (errorMessage) {
            alert(errorMessage);
        }
        return !errorMessage;
    }

    function addResetView(resetView) {
        this.resetView = resetView;
    }
})();