export class Project{
    constructor(title){
        this.title = title;
        this.taskList = [];
    }

    addTask(item){
        if (this.taskList.includes(item)) return;
        this.taskList.push(item);

    }

    getAllTasks(){
        return this.taskList;
    }

    getTitle(){
        return this.title;
    }

    setTitle(newTitle){
        this.title = newTitle;
    }
}