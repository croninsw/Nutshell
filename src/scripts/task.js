/*
Author: Sam
Task: handles all functions specific to the tasks listing in Nutshell
*/



const tasksModule = {
    taskToHTML: function (taskObject) {
        return `
            <h1>${taskObject.name}</h1>
            <section id="completion_date">${taskObject.completion_date}</section>
            <label for="is_complete" id="task_complete">${taskObject.is_complete}</label>

            <button id="tasks--delete">Delete ${taskObject.name}</button>
            <button id="tasks--edit">Edit ${taskObject.name}</button>

        `
    },
    taskForm: function (objectId) {
        return `
        <fieldset>
            <input type="hidden" id="userId" value="${objectId}"><br>
            <label for="name">Name of task: </label><br>
            <input type="text" placeholder="Task name" id="taskName">
        </fieldset>
            <label for="completion_date">Date to be completed by: </label><br>
            <input type="date" id="taskDate">
        <fieldset>
            <label>Is task complete: </label><br>
            <input type="checkbox" id="taskComplete" value="Yes">Yes<br>
            <input type="checkbox" id="taskComplete" value="No">No<br>
        </fieldset>
        <fieldset>
            <button id="tasks--create">Submit</button>
        </fieldset>
        `
    },
    captureFormValues: function () {
        const taskObject = {
            name: document.querySelector("#taskName").value,
            completion_date: document.querySelector("#taskDate").value,
            is_complete: document.querySelector("#taskComplete").value,
            //userId: Window.sessionStorage.getItem("userId")
            userId: 1
        }
        return taskObject
    }
}

export default tasksModule


