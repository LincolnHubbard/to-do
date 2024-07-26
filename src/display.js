import { Manager } from "./manager";
import { PopUpWindow } from "./popup";
import { ToDo } from "./todo";
import { Project } from "./project";

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
            this.manager.createProject('Default');
            let projectBuffer = this.manager.getProject("Default");
            let taskBuffer = this.manager.createToDoItem('Test', 
                'test', 'test', false, projectBuffer
            );
            this.manager.addToProjectList(projectBuffer, taskBuffer);
            taskBuffer = this.manager.createToDoItem('Test2', 
                'test2', 'test2', false, projectBuffer
            );
            this.manager.addToProjectList(projectBuffer, taskBuffer);
            this.renderProjects();
            this.activeProject = projectBuffer;
            this.renderTasks(this.activeProject);
            console.log(this.activeProject);
        }

        // if(this.taskList){
        //     console.log("Task list found");
        //     this.renderTasks();
        // }
    }
    
    createNewProjectWindow(){
        console.log("Creating New Project Window");
        new PopUpWindow({
            title: 'New Project',
            fields: [
                { name: 'title', label: 'Title', type: 'text'}
            ],
            onSubmit: (formData) =>{
                console.log('submitting project title', formData.title);
                this.manager.createProject(formData.title);
                this.updateDisplay();
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
        const listContainer = document.getElementById('project-list');
        listContainer.textContent = '';
        projectList.forEach(project => {
            listContainer.appendChild(this.createProjectListItem(project));
        });
        console.log(projectList);
    }

    renderTasks(activeProject){
        if(activeProject === null) return;
        const listContainer = document.getElementById('task-list');
        listContainer.textContent = '';
        let taskList = activeProject.getAllTasks();
        taskList.forEach(task => {
            listContainer.appendChild(this.createTaskListItem(task));
        });
    }

    createTaskListItem(task){
        const listItem = document.createElement('li');
        listItem.className = "task";
        const taskTitle = document.createElement('p');
        taskTitle.className = "task-title";
        taskTitle.textContent = task.getTitle();
        listItem.appendChild(taskTitle);

        const itemButtons = document.createElement('div');
        const viewButton = document.createElement('button');
        viewButton.textContent = "View";
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.addEventListener('click', () =>{
            this.createNewTaskWindow();
        })
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', () =>{
            this.manager.removeTaskFromProject(this.activeProject, task.getTitle());
            this.updateDisplay();
        })
        itemButtons.appendChild(viewButton);
        itemButtons.appendChild(editButton);
        itemButtons.appendChild(deleteButton);
        listItem.appendChild(itemButtons);
                
        return listItem;
    }

    createProjectListItem(project){
        const listItem = document.createElement('li');
        listItem.textContent = project.getTitle();

        return listItem;
    }

    updateDisplay(){
        this.renderProjects();
        this.renderTasks(this.activeProject);
    }

}

