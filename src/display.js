import { Manager } from "./manager";

export class DisplayController{

    constructor(){
        this.manager = new Manager();

        //find DOM elements
        this.newProjectButton = document.querySelector('#newProjectButton');
        this.newTaskButton = document.querySelector('#newTaskButton');
        this.projectList = document.querySelector('#project-list');
        this.taskList = document.querySelector('#task-list');

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
                this.createTaskWindow();
            })
        }

        if(this.projectList){
            console.log("Project list found");
        }

        if(this.taskList){
            console.log("Task list found");
        }
    }
    
    createNewProjectWindow(){
        console.log("Creating new project");
        let pageBody = document.querySelector('body');
        let mainContent = document.querySelector('.main');
        mainContent.classList.add('blur');
    
        let newProjectWindow = document.createElement('div');
        newProjectWindow.id = "project-new-window";

        let projectWindowTop = document.createElement('div');
        projectWindowTop.id = "task-edit-window-top";
        let projectWindowHeader = document.createElement('h2');
        projectWindowHeader.textContent = "New Project";
        let closeButton = document.createElement('button');
        closeButton.textContent = "X";
        closeButton.addEventListener('click', () =>{
            pageBody.removeChild(newProjectWindow);
            mainContent.classList.remove('blur');
        });
        projectWindowTop.appendChild(projectWindowHeader);
        projectWindowTop.appendChild(closeButton);
        newProjectWindow.appendChild(projectWindowTop);


        let newProjectForm = document.createElement('form');
        let formList = document.createElement('ul');
        let formListItem = document.createElement('li');
        let titleLabel = document.createElement('label');
        titleLabel.setAttribute('for', 'title');
        titleLabel.textContent = "Title";
        let titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('name', 'title');
        titleInput.setAttribute('id', 'title');
        formListItem.appendChild(titleLabel);
        formListItem.appendChild(titleInput);
        let submitButton = document.createElement('button');
        submitButton.textContent = "Submit";

        formList.appendChild(formListItem);
        newProjectForm.append(formList);
        newProjectWindow.appendChild(newProjectForm);
        newProjectWindow.appendChild(submitButton);
        pageBody.appendChild(newProjectWindow);
    }

    createTaskWindow(){
        console.log("Creating new task");
    }


}