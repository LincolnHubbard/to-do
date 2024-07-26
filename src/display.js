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
            let taskBuffer = {title: 'test', desc: 'test', dueDate: 'test', prio: false};
            this.manager.createToDoItem(taskBuffer, projectBuffer);
            this.activeProject = projectBuffer;
            this.renderProjects();
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
            onSubmit: (formData) =>{
                console.log("Submitting Task Info");
                let taskData = {
                    title: formData.title,
                    desc: formData.desc,
                    dueDate: formData.date,
                    prio: formData.prio
                };
                this.manager.createToDoItem(taskData, this.activeProject);
                this.updateDisplay();
            }
        })
    }

    createEditTaskWindow(task){
        console.log("Editing Task");
        new PopUpWindow({
            title: 'Edit Task',
            fields: [
                {name: 'title', label: 'Title', type: 'text'},
                {name: 'desc', label: 'Description', type: 'text'},
                {name: 'date', label: 'Due Date', type: 'date'},
                {name: 'prio', label: 'Important?', type: 'checkbox'},
            ],
            values: {
                title: task.title,
                desc: task.desc,
                date: task.dueDate,
                prio: task.prio
            },
            onSubmit: (formData) =>{
                console.log("Submitting Task Info");
                let newTask = new ToDo(
                    formData.title,
                    formData.desc,
                    formData.date,
                    formData.prio
                );

                if(task){
                    const index = this.activeProject.getAllTasks().indexOf(task);
                    if (index !== -1) {
                        this.activeProject.getAllTasks().splice(index, 1, newTask);
                    }
                }
                this.updateDisplay();
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
        const header = document.getElementById('main-header');
        header.textContent = activeProject.title;

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
        // viewButton.textContent = "View";
        viewButton.classList.add('view');
        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.addEventListener('click', () =>{
            this.createEditTaskWindow(task);
        })
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
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
        if(project === this.activeProject){
            listItem.classList.add("active-project");
        }else{
            listItem.className = '';
        }
        listItem.addEventListener('click', () =>{
            this.activeProject = project;
            this.updateDisplay();
        })

        return listItem;
    }

    updateDisplay(){
        this.renderProjects();
        this.renderTasks(this.activeProject);
    }
}

