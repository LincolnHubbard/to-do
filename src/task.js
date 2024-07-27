export class Task{
    constructor(title, desc, dueDate, prio){
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.prio = prio;
    }

    getTitle(){
        return this.title;
    }
}