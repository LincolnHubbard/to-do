import {ToDo} from "./todo.js";
import {Project} from "./project.js"

export class Manager{
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

    createToDoItem(title, desc, dueDate, prio, project){
        if(!project) return;
        let item = new ToDo(title, desc, dueDate, prio);
        project.addToDoItem(item);
    }

    updateToDoItemPrio(toDoItem){
        toDoItem.updatePriority(newPrio);
    }


    addToProjectList(project, toDo){
        if(project){
            if(toDo instanceof ToDo){
                project.addToDoItem(toDo);
            }
        }
    }

    getAllProjects(){
        return this.projects;
    }

    getProject(title){
        return this.projects.find(project => project.title === title);
    }
}
