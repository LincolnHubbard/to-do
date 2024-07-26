export class Project{
    constructor(title){
        this.title = title;
        this.toDoList = [];
    }

    addToDoItem(item){
        if (this.toDoList.includes(item)) return;
        this.toDoList.push(item);

    }

    getAllTasks(){
        return this.toDoList;
    }

    getTitle(){
        return this.title;
    }
}