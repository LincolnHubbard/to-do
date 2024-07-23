export class Project{
    constructor(title){
        this.title = title;
        this.toDoList = [];
    }

    addToDoItem(item){
        if (this.toDoList.includes(item)) return;
        this.toDoList.push(item);
    }
}