/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
	"use strict";
	app.addModule("tasksList", {
		createTasksList: createTasksList
	});

	var taskModule = app.getModule("task");
	var arrayUtils = app.getModule("arrayUtils");

	function createTasksList(tasksList, onTaskDeleted, onTaskCompleted) {
		var controller =  new CreateController(tasksList, onTaskDeleted, onTaskCompleted);
		return createView(controller);
	}

	function createView(controller) {
		var tasksList = controller.getTasksList();

		var $viewTemplate = $('\
            <div class="tasksList">\
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

		controller.addResetView(buildTasksList);
		app.addMethod("tasksList", "refreshView", buildTasksList);

		buildTasksList();
		function buildTasksList() {
			$listContainer.empty();
			tasksList.forEach(function (user) {
				$listContainer.append(taskModule.createTask(user,
					controller.deleteTask.bind(controller),
					controller.moveTop.bind(controller),
					controller.moveBottom.bind(controller),
					controller.completeTask.bind(controller)
				));
			})
		}

		return $viewTemplate;
	}

	function CreateController(tasksList, onTaskDeleted, onTaskCompleted) {
		this._tasksList = tasksList || [];
		this._onTaskDeleted = onTaskDeleted || $.noop;
		this._onTaskCompleted = onTaskCompleted || $.noop;
	}
	CreateController.prototype = {
		deleteTask: deleteTask,
		sortTasks: sortTasks,
		getTasksList: getTasksList,
		moveTop: moveTop,
		moveBottom: moveBottom,
		completeTask: completeTask,
		addResetView: addResetView
	};

	function deleteTask(task) {
		var index = this._tasksList.indexOf(task);
		this._onTaskDeleted(this._tasksList.splice(index, 1)[0]);
		this.resetView();
	}

	function sortTasks(field, direction) {
		arrayUtils.sortArray(this._tasksList, field, direction);
		this.resetView();
	}

	function getTasksList() {
		return this._tasksList;
	}

	function moveTop() {

	}

	function moveBottom() {

	}

	function completeTask(task) {
		var index = this._tasksList.indexOf(task);
		task.completed = true;
		this._onTaskCompleted(task);
	}

	function addResetView(resetView) {
		this.resetView = resetView;
	}
})();