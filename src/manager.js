import ToDo from "todo.js";
import Project from "project.js"

class Manager{
    constructor(){
        this.projects = [];
    }

    // addProject(newProject){
    //     if (this.projects.includes(newProject)) {
    //         return;
    //     }
    //     this.projects.push(newProject);
    // }

    createProject(title){
        if (title === null) {
            alert("Projects must have a title!");
            return;
        }
        let project = new Project(title);
        this.projects.push(project);
    }


    addToProjectList(project, toDo){
        if(project){
            project.addToDoItem(toDo);
        }
    }
}
