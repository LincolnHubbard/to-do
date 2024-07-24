import { Manager } from "./manager";

export class DisplayController{

    constructor(){
        this.newProjectButton = document.querySelector('#newProjectButton');
        this.newTaskButton = document.querySelector('#newTaskButton');
        this.initializeDisplay();
    }

    initializeDisplay(){
        if(this.newProjectButton){
            console.log("New project button found");
        }

        if(this.newTaskButton){
            console.log("New task button found");
            this.newProjectButton.addEventListener('click', () =>{
                this.createTaskWindow();
            })
        }
    }

    createTaskWindow(){
        console.log("Creating new task");
    }



}