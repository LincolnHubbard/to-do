import { Manager } from "./manager.js";

export class DisplayController{

    constructor(){
        this.newProjectButton = document.querySelector('#newProjectButton');
        this.newTaskButton = document.querySelector('#newTaskButton');
        initializeDisplay();
    }

    initializeDisplay(){
        if(this.newProjectButton){
            console.log("New project button found");
        }
        if(this.newTaskButton){
            console.log("New task button found");
        }
    }


}