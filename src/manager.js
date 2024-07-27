import {Task} from "./task.js";
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

        return project;
    }

    createTask(newTask, project){
        if(!project) return;
        let item = new Task(
             newTask.title,
             newTask.desc,
             newTask.dueDate, 
             newTask.prio);
        project.addTask(item);
    }

    // updateToDoItemPrio(toDoItem){
    //     toDoItem.updatePriority(newPrio);
    // }


    // addToProjectList(project, toDo){
    //     if(project){
    //         if(toDo instanceof ToDo){
    //             project.addToDoItem(toDo);
    //         }
    //     }
    // }

    removeTaskFromProject(project, taskTitle){
        if (project){
            const index = project.getAllTasks().findIndex( task => task.title === taskTitle)
            if (index !== -1){
                project.getAllTasks().splice(index, 1);
            }
        }
    }

    getAllProjects(){
        return this.projects;
    }

    getProject(title){
        return this.projects.find(project => project.title === title);
    }

    removeProject(projectToRemove){
        if (projectToRemove){
            const index = this.getAllProjects().findIndex(project => project.title === projectToRemove.title);
            if (index !== -1){
                this.getAllProjects().splice(index, 1);
            }
        }
    }

    saveProjectsToLocalStorage(){
        try {
            const projectsJSON = JSON.stringify(this.projects);
            localStorage.setItem("projects", projectsJSON);
            console.log("Projects saved to local storage");
        } catch (error) {
            console.log('Local storage not available on this device');
        }
    }

    loadProjectsFromLocalStorage(){
        try {
            const projectsJSON = localStorage.getItem("projects");
            if(projectsJSON){
                // this.projects = JSON.parse(projectsJSON);
                // console.log("Projects successfully loaded from local storage");
                const projectData = JSON.parse(projectsJSON);
                projectData.forEach(project => {
                    const loadedProject = this.createProject(project.title);

                    project.taskList.forEach(task => {
                        let taskData = {
                            title: task.title,
                            desc: task.desc,
                            dueDate: task.dueDate,
                            prio: task.prio
                        };
                        this.createTask(taskData, loadedProject);
                    });
                    
                });
                console.log("Project data: " +  projectData);
            }else{
                console.log("No projects found");
                this.createProject('Inbox');
            }

        } catch (error) {
            console.log('Local storage not available on this device');
        }
    }
}
