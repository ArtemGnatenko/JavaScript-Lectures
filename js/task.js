/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
	app.addModule("task", {
		createTask: createTask
	});

	function createTask(task, onDelete, onMoveTop, onMoveBottom, onComplete) {
		var controller =  new CreateController(task, onDelete, onMoveTop, onMoveBottom, onComplete);
		return createView(controller);
	}

	function createView(controller) {
		var task = controller.getTask();

		var $viewTemplate = $('\
            <li>\
                <h2 class="taskTitle">'+task.title+'</h2>\
                <p class="taskCreateDate">Create date\
                	<span class="createDate">'+getFormattedDate(task.createDate)+'</span> \
                </p>\
                <p class="taskDescription">Assignd to <span>'+ task.assignedUsers.length +'</span> users</p>\
                <div>\
                	<button class="moveTopButton" type="button">Move top</button>\
                	<button class="moveBottomButton" type="button">Move bottom</button>\
                	<button class="deleteButton" type="button">Delete task</button>\
                </div>\
                <button class="completeButton" type="button">Delete user</button>\
            </li>'
		);

		var $deleteButton = $viewTemplate.find(".deleteButton");
		var $moveTopButton = $viewTemplate.find(".moveTopButton");
		var $moveBottomButton = $viewTemplate.find(".moveBottomButton");
		var $completeButton = $viewTemplate.find(".completeButton");

		setState();
		function setState(task) {
			if (task.completed) {
				$viewTemplate.addClass("completed");
			}
			else if (task.active) {
				$viewTemplate.addClass("active");
			}
		}

		controller.addUpdateState(setState);

		$deleteButton.on("click", function() {
			controller.deleteTask();
		});

		$moveTopButton.on("click", function () {
			controller.moveTop();
		});

		$moveBottomButton.on("click", function () {
			controller.moveBottom();
		});

		$completeButton.on("click", function () {
			$viewTemplate.addClass('completed');
			controller.completeTask();
		});

		function getFormattedDate(date) {
			return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " +
				date.getHours() + ":" + date.getMinutes();
		}

		return $viewTemplate;
	}

	function CreateController(task, onDelete, onMoveTop, onMoveBottom, onComplete, onActive) {
		this._task = task || {};
		this._onDelete = onDelete || $.noop;
		this._onMoveTop = onMoveTop || $.noop;
		this._onMoveBottom = onMoveBottom || $.noop;
		this._onComplete = onComplete || $.noop;
		this._onActive = onActive || $.noop;
	}
	CreateController.prototype = {
		deleteTask: deleteTask,
		moveTop: moveTop,
		moveBottom: moveBottom,
		getTask: getTask,
		activeTask: activeTask,
		completeTask: completeTask,
		addUpdateState: addUpdateState
	};

	function deleteTask() {
		this._onDelete(this._task);
	}

	function getTask() {
		return this._task;
	}

	function moveTop() {
		this._onMoveTop(this._task);
	}

	function moveBottom() {
		this._onMoveBottom(this._task);
	}

	function completeTask() {
		this._task.completed = true;
		this.updateState(this._task);
		this._onComplete(this._task);
	}

	function activeTask() {
		if (!this._task.completed) {
			this._task.active = true;
			this.updateState(this._task);
			this._onActive(this._task);
		}
	}

	function addUpdateState(method) {
		this.updateState = method;
	}
})();