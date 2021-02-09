class Task {
  title: string = "";
  detail: string = "";
  state: number = 1;
  id: number | null = null;
  lock: boolean = false;
  constructor(title: string, detail: string, stateId: number = 1) {
    this.title = title;
    this.detail = detail;
    this.state = stateId;
  }
  public setId(id: number): void {
    this.id = id;
  }
}
export default Task;
