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

	function createTasksList(tasksList, onTaskDeleted, onTaskCompleted, onTaskActive) {
		var controller =  new CreateController(tasksList, onTaskDeleted, onTaskCompleted, onTaskActive);
		return createView(controller);
	}

	function createView(controller) {
		var tasksList = controller.getTasksList();

		var $viewTemplate = $('\
            <div class="tasksList">\
                <div>\
                    Sort by name:\
					<button class="sortByTitleAscending" type="button">A...z</button>\
                    <button class="sortByTitleDescending" type="button">Z...a</button>\
                </div>\
					Sort by date:\
                    <button class="sortByDateAscending" type="button">First...last</button>\
                    <button class="sortByDateDescending" type="button">Last...first</button>\
                <ul></ul>\
            </div>'
		);

		var $listContainer = $viewTemplate.find("ul");

		$viewTemplate.find(".sortByTitleAscending").on("click", function() {
			controller.sortTasks("title", "ascending");
		});

		$viewTemplate.find(".sortByTitleDescending").on("click", function() {
			controller.sortTasks("title", "descending");
		});

		$viewTemplate.find(".sortByDateAscending").on("click", function() {
			controller.sortTasks("createDate", "ascending");
		});

		$viewTemplate.find(".sortByDateDescending").on("click", function() {
			controller.sortTasks("createDate", "descending");
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
					controller.completeTask.bind(controller),
					controller.activeTask.bind(controller)
				));
			})
		}

		return $viewTemplate;
	}

	function CreateController(tasksList, onTaskDeleted, onTaskCompleted, onTaskActive) {
		this._tasksList = tasksList || [];
		this._onTaskDeleted = onTaskDeleted || $.noop;
		this._onTaskCompleted = onTaskCompleted || $.noop;
		this._onTaskActive = onTaskActive || $.noop;
	}
	CreateController.prototype = {
		deleteTask: deleteTask,
		sortTasks: sortTasks,
		getTasksList: getTasksList,
		moveTop: moveTop,
		moveBottom: moveBottom,
		completeTask: completeTask,
		activeTask: activeTask,
		addResetView: addResetView
	};

	function deleteTask(task) {
		var index = this.getTasksList().indexOf(task);
		this._onTaskDeleted(this.getTasksList().splice(index, 1)[0]);
		this.resetView();
	}

	function sortTasks(field, direction) {
		arrayUtils.sortArray(this.getTasksList(), field, direction);
		this.resetView();
	}

	function getTasksList() {
		return this._tasksList;
	}

	function moveTop(task) {
		if (!task.completed) {
			var index = this.getTasksList().indexOf(task);
			if (index > 0) {
				this._tasksList.splice(index - 1, 0, this._tasksList.splice(index, 1)[0]);
				this.resetView();
			}
		}
	}

	function moveBottom(task) {
		if (!task.completed) {
			var index = this.getTasksList().indexOf(task);
			if (index < this.getTasksList().length - 1) {
				this._tasksList.splice(index + 1, 0, this._tasksList.splice(index, 1)[0]);
				this.resetView();
			}
		}
	}

	function completeTask(task) {
		if (!task.completed) {
			var index = this.getTasksList().indexOf(task);
			this.getTasksList().push(this.getTasksList().splice(index, 1)[0]);
			task.completed = true;
			this._onTaskCompleted(task);
			this.resetView();
		}
	}

	function activeTask(task) {
		this._onTaskActive(task);
	}

	function addResetView(resetView) {
		this.resetView = resetView;
	}
})();