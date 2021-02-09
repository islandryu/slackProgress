import {v4 as uuidv4} from "uuid";
class Task{
    title:string="";
    detail:string="";
    state:number=0;
    id:string|null = null;
    constructor(title:string,detail:string){
       this.title = title; 
       this.detail = detail;
       this.id = uuidv4();
    }
}
export default Task;