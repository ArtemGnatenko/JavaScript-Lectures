/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
	app.addModule("task", {
		createTask: createTask
	});

	function createTask(task, onDelete, onMoveTop, onMoveBottom, onComplete, onActive) {
		var controller =  new CreateController(task, onDelete, onMoveTop, onMoveBottom, onComplete, onActive);
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
                <p class="taskDescription">Assignd to <span>'+ task.assignedTo.length +'</span> users</p>\
                <div>\
                	<button class="moveTopButton" type="button">Move top</button>\
                	<button class="moveBottomButton" type="button">Move bottom</button>\
                	<button class="deleteButton" type="button">Delete task</button>\
                </div>\
                <button class="completeButton" type="button">Complete task</button>\
            </li>'
		);

		var $deleteButton = $viewTemplate.find(".deleteButton");
		var $moveTopButton = $viewTemplate.find(".moveTopButton");
		var $moveBottomButton = $viewTemplate.find(".moveBottomButton");
		var $completeButton = $viewTemplate.find(".completeButton");

		if (task.completed) {
			$viewTemplate.addClass("completed");
		}
		else if (task.active) {
			$viewTemplate.addClass("active");
		}

		$deleteButton.on("click", function(e) {
			e.stopPropagation();
			controller.deleteTask();
		});

		$moveTopButton.on("click", function (e) {
			e.stopPropagation();
			controller.moveTop();
		});

		$moveBottomButton.on("click", function (e) {
			e.stopPropagation();
			controller.moveBottom();
		});

		$completeButton.on("click", function (e) {
			e.stopPropagation();
			controller.completeTask();
		});

		$viewTemplate.on("click", function(e) {
			e.stopPropagation();
			controller.activeTask();
		});

		function getFormattedDate(date) {
			return date.getDate() + "/" +
					(date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "/" +
					date.getFullYear() + " " +
					(date.getHours() < 10 ? "0" + date.getHours() : date.getHours())  + ":" +
					(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
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
		this._updateState = $.noop;
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
		this._onComplete(this._task);
	}

	function activeTask() {
		if (!this._task.completed && !this._task.active) {
			this._onActive(this._task);
		}
	}

	function addUpdateState(method) {
		this._updateState = method;
	}
})();