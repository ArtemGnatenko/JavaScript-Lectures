/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
    "use strict";
    app.addModule("TODOList", {
        createTODOList: createTODOList
    });
    var addTaskForm = app.getModule("addTaskForm");
    var addUserForm = app.getModule("addUserForm");
    var usersList = app.getModule("usersList");
    var tasksList = app.getModule("tasksList");
    var arrayUtils = app.getModule("arrayUtils");

    function createTODOList(users, tasks) {
        var controller =  new CreateController(users, tasks);
        return createView(controller);
    }

    function createView(controller) {
        var $viewTemplate = $('\
            <div class="todo-list">\
                <div class="userManagement"></div>\
                <div class="taskManagement"></div>\
            </div>'
        );

        $viewTemplate.find(".userManagement").append(
            addUserForm.createAddUserForm(controller.addUser.bind(controller))
        ).append(
            usersList.createUsersList(
                controller.getUsers(),
                controller.userDeleted.bind(controller),
                controller.userAssignChange.bind(controller)
            )
        );
        $viewTemplate.find(".taskManagement").append(
            addTaskForm.createAddTaskForm(controller.addTask.bind(controller))
        ).append(
            tasksList.createTasksList(
                controller.getTasks(),
                controller.taskDeleted.bind(controller),
                controller.taskCompleted.bind(controller),
                controller.taskActive.bind(controller)
            )
        );

        controller.addResetView(function () {
            tasksList.refreshView();
            usersList.refreshView();
        });

        return $viewTemplate;
    }

    function CreateController(users, tasks) {
        this._users = users;
        this._tasks = tasks;
        this._activeTask = null;
    }
    CreateController.prototype = {
        addUser: addUser,
        addTask: addTask,
        userAssignChange: userAssignChange,
        addResetView: addResetView,
        getUsers: getUsers,
        getTasks: getTasks,
        userDeleted: userDeleted,
        taskDeleted: taskDeleted,
        taskActive: taskActive,
        taskCompleted: taskCompleted
    };

    function addUser(user) {
        if (!arrayUtils.findInArray(this.getUsers(), {email: user.email})) {
            this.getUsers().push(user);
            this.resetView();
            return true;
        }
        else {
            alert('User with this email already exist');
        }
        return false;
    }

    function addTask(task) {
        if (!arrayUtils.findInArray(this.getTasks(), {id: task.id})) {
            this.getTasks().push(task);
            this.resetView();
            return true;
        }
        else {
            alert("Task with this ID already exist");
        }
        return false;
    }

    function getUsers() {
        return this._users;
    }

    function getTasks() {
        return this._tasks;
    }

    function userAssignChange(user, value) {
        if (this._activeTask) {
            user.assigned = value;
            if (value) {
                user.assignedTo.push(this._activeTask.id);
                this._activeTask.assignedTo.push(user.email);
            }
            else {
                user.assignedTo.splice(user.assignedTo.indexOf(this._activeTask.id, 1));
                this._activeTask.assignedTo.splice(this._activeTask.assignedTo.indexOf(user.email), 1);
            }
        }
        this.resetView();
    }

    function userDeleted(user) {
        var that = this;
        user.assignedTo.forEach(function (taskId) {
            var task = arrayUtils.findInArray(that.getTasks(), {id: taskId});
            task.assignedTo.splice(task.assignedTo.indexOf(user.email), 1);
        });
        this.resetView();
    }

    function taskDeleted(task) {
        var that = this;
        task.assignedTo.forEach(function (userEmail) {
            var user = arrayUtils.findInArray(that.getUsers(), {email: userEmail});
            user.assignedTo.splice(user.assignedTo.indexOf(task.id), 1);
            if (that._activeTask === task) {
                user.assigned = false;
            }
        });
        if (this._activeTask === task) {
            this._activeTask = null;
        }
        this.resetView();
    }

    function taskActive(task) {
        if (this._activeTask)
            this._activeTask.active = false;
        task.active = true;
        this._activeTask = task;
        this.getUsers().forEach(function(user) {
            user.assigned = !!~task.assignedTo.indexOf(user.email);
        });
        this.resetView();
    }

    function taskCompleted(task) {
        var that = this;
        task.assignedTo.forEach(function (userEmail) {
            var user = arrayUtils.findInArray(that.getUsers(), {email: userEmail});
            user.assignedTo.splice(user.assignedTo.indexOf(task.id), 1);
            if (that._activeTask === task) {
                user.assigned = false;
            }
        });
        task.assignedTo = [];
        this.resetView();
    }

    function addResetView(resetView) {
        this.resetView = resetView;
    }
})();