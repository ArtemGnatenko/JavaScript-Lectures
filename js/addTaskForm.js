/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
    "use strict";
    app.addModule("addTaskForm", {
        createAddTaskForm: createAddTaskForm
    });

    var validateUtils = app.getModule("validateUtils");

    function createAddTaskForm(onAddTask) {
        var controller =  new CreateController(onAddTask);
        return createView(controller);
    }

    function createView(controller) {
        var $viewTemplate = $('\
            <div class="addUser">\
                <input class="taskTitle" type="text" placeholder="Task title"/>\
                <textarea class="taskDescription" type="text" placeholder="Task description"></textarea>\
                <input class="taskId" type="text" placeholder="Task ID"/>\
                <input class="addTaskButton" type="button" value="Add task">\
            </div>'
        );

        var $taskTitle = $viewTemplate.find(".taskTitle");
        var $taskDescription = $viewTemplate.find(".taskDescription");
        var $taskId = $viewTemplate.find(".taskId");

        $viewTemplate.find(".addTaskButton").on("click", function() {
            controller.addTask($taskTitle.val(), $taskDescription.val(), $taskId.val());
        });

        controller.addResetView(function () {
            $taskTitle.val("");
            $taskDescription.val("");
            $taskId.val("");
        });

        return $viewTemplate;
    }

    function getTaskModel() {
        return {
            title: "",
            description: "",
            id: "",
            createDate: new Date(),
            active: false,
            completed: false,
            assignedTo: []
        }
    }

    function CreateController(onAddTask) {
        this._onAddTask = onAddTask;
        this._taskModel = getTaskModel();
    }
    CreateController.prototype = {
        addTask: addTask,
        validateForm: validateForm,
        addResetView: addResetView
    };

    function addTask(taskTitle, taskDescription, taskId) {
        this._taskModel.title = taskTitle;
        this._taskModel.description = taskDescription;
        this._taskModel.id = taskId;
        this._taskModel.createDate = new Date();
        if (this.validateForm() && this._onAddTask(this._taskModel)) {
            this._taskModel = getTaskModel();
            this.resetView();
        }
    }

    function validateForm() {
        var errorMessage = "";
        if (!validateUtils.validateRequired(this._taskModel.title)) {
            errorMessage += "Field Task Title is required\n";
        }
        if (!validateUtils.validateRequired(this._taskModel.description)) {
            errorMessage += "Field Task Description is required\n";
        }
        if (!validateUtils.validateRequired(this._taskModel.id)) {
            errorMessage += "Field Task ID is required\n";
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