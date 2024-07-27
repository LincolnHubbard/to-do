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
            this.manager.loadProjectsFromLocalStorage();
            // this.manager.createProject('Default');
            // let projectBuffer = this.manager.getProject("Default");
            // let taskBuffer = {title: 'test', desc: 'test', dueDate: 'test', prio: false};
            // this.manager.createToDoItem(taskBuffer, projectBuffer);
            this.activeProject = this.manager.getAllProjects()[0];
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

    createEditProjectWindow(project){
        new PopUpWindow({
            title: 'Rename Project',
            fields: [
                { name: 'title', label: 'Title', type: 'text'}
            ],
            values:{
                title: project.title,
            },
            onSubmit: (formData) =>{
                console.log('submitting project title', formData.title);
                project.setTitle(formData.title);
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

        console.log("Active Project:" + activeProject.title);
        const listContainer = document.getElementById('task-list');
        listContainer.textContent = '';
        console.log(activeProject.getAllTasks());
        let taskList = activeProject.getAllTasks();
        taskList.forEach(task => {
            listContainer.appendChild(this.createTaskListItem(task));
        });
    }

    createTaskListItem(task){
        const listItem = document.createElement('li');
        const taskLeftDiv = document.createElement('div');
        listItem.className = "task";
        const taskTitle = document.createElement('p');
        taskTitle.className = "task-title";
        taskTitle.textContent = task.getTitle();
        taskLeftDiv.appendChild(taskTitle);

        const taskDesc = document.createElement('p');
        taskDesc.classList.add('description');
        taskDesc.textContent = task.desc;
        taskLeftDiv.appendChild(taskDesc);
        
        listItem.appendChild(taskLeftDiv);
        const itemButtons = document.createElement('div');
        // const viewButton = document.createElement('button');
        // // viewButton.textContent = "View";
        // viewButton.classList.add('view');
        // viewButton.addEventListener('click', () =>{
        //     this.createTaskDetailWindow(task);
        // })

        const taskDate = document.createElement('p');
        taskDate.textContent = task.dueDate;
        taskDate.classList.add('description');
        listItem.appendChild(taskDate);


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
        if(task.prio === true){
            const starIcon = document.createElement('button');
            starIcon.classList.add('important');
            itemButtons.appendChild(starIcon);
        }
        // itemButtons.appendChild(viewButton);
        itemButtons.appendChild(editButton);
        itemButtons.appendChild(deleteButton);
        listItem.appendChild(itemButtons);
                
        return listItem;
    }

    createProjectListItem(project){
        const listItem = document.createElement('li');
        const projectName = document.createElement('p');
        projectName.textContent = project.getTitle();
        if(project === this.activeProject){
            listItem.classList.add("active-project");
        }else{
            listItem.className = '';
        }
        projectName.addEventListener('click', () =>{
            this.activeProject = project;
            this.updateDisplay();
        });

        listItem.appendChild(projectName);

        const buttons = document.createElement('div');

        if (project.title !== 'Inbox'){
            const editButton = document.createElement('button');
            editButton.classList.add('edit');
            buttons.appendChild(editButton);
            editButton.addEventListener('click', () =>{
                this.createEditProjectWindow(project);
            })
        }

    
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            if (project.title === 'Inbox')
                {
                    alert("The Inbox cannot be deleted!");
                    return;
                } 
            const confirmation = window.confirm(`Are you sure you want to delete the project "${project.title}"? This will also delete all associated tasks!`);
            if(confirmation){
                this.manager.removeProject(project);
                this.updateDisplay();
            }
        });
        buttons.appendChild(deleteButton);

        listItem.appendChild(buttons);
        return listItem;
    }

    updateDisplay(){
        this.renderProjects();
        this.renderTasks(this.activeProject);
        this.manager.saveProjectsToLocalStorage();
    }
}

