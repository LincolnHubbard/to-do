import { Manager } from "./manager";
import { PopUpWindow } from "./PopUpWindow";

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

    createTaskWindow(){
        console.log("Creating new task");
    }


}

