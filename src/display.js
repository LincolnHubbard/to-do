import { Manager } from "./manager";
import { PopUpWindow } from "./popup";
import { ToDo } from "./todo";

export class DisplayController{

    constructor(){
        this.manager = new Manager();

        //find DOM elements
        this.newProjectButton = document.querySelector('#newProjectButton');
        this.newTaskButton = document.querySelector('#newTaskButton');
        this.projectList = document.querySelector('#project-list');
        this.taskList = document.querySelector('#task-list');
        this.activeProject = null;

        this.initializeDisplay();
    }

    initializeDisplay(){
        if(this.newProjectButton){
            console.log("New project button found");
            this.newProjectButton.addEventListener('click', () =>{
                this.createNewProjectWindow();
            })
        }

        if(this.newTaskButton){
            console.log("New task button found");
            this.newTaskButton.addEventListener('click', () =>{
                this.createNewTaskWindow();
            })
        }

        if(this.projectList){
            console.log("Project list found");
            this.renderProjects();
        }

        if(this.taskList){
            console.log("Task list found");
            this.renderTasks();
        }
    }
    
    createNewProjectWindow(){
        console.log("Creating New Project Window");
        new PopUpWindow({
            title: 'New Project',
            fields: [
                { name: 'title', label: 'Title', type: 'text'}
            ],
            onSubmit: () =>{
                console.log('submitting project title');
            }
        });
    }

    createNewTaskWindow(){
        console.log("Creating new task");
        new PopUpWindow({
            title: 'New Task',
            fields: [
                {name: 'title', label: 'Title', type: 'text'},
                {name: 'desc', label: 'Description', type: 'text'},
                {name: 'date', label: 'Due Date', type: 'date'},
                {name: 'prio', label: 'Important?', type: 'checkbox'},
            ],
            onSubmit: () =>{
                console.log("Submitting Task Info");
            }
        })
    }

    renderProjects(){
        let projectList = this.manager.getAllProjects();
        console.log(projectList);
    }

    renderTasks(activeProject){
        if(activeProject === null) return;
        const listContainer = document.getElementById('task-list');
        listContainer.textContent = '';
        let taskList = activeProject.getAllTasks();
        taskList.forEach(task => {
            listContainer.appendChild(this.createTaskListItem());
        });
    }

    createTaskListItem(task){
        const listItem = document.createElement('li');
        listItem.className = "task";
        const taskTitle = document.createElement('p');
        taskTitle.id = "task-title";
        taskTitle.textContent = task.getTitle();
        listItem.appendChild(taskTitle);

        const itemButtons = document.createElement('div');
        const viewButton = document.createElement('button');
        viewButton.textContent = "View";
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        itemButtons.appendChild(viewButton);
        itemButtons.appendChild(editButton);
        itemButtons.appendChild(deleteButton);
        listItem.appendChild(itemButtons);
                
        return listItem;
    }

}

