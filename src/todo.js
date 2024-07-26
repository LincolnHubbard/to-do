export class ToDo{
    constructor(title, desc, dueDate, prio){
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.prio = prio;
    }

    updatePriority(newPrio){
        this.prio = newPrio;
    }

    getTitle(){
        return this.title;
    }
}