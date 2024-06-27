import { TaskStatus } from "./enum";

export interface ITask {
    id?: number;
    key?: number;
    title: string;
    status: TaskStatus;
    description?: string;
    deadline?: any;
}

export interface IFormData {
    title: string;
    description?: string;
    deadline?: string;
}

export interface IStateType {
    tasks: ITasksState;
}

export interface ITasksState {
    tasksList: ITask[];
    trashList: ITask[];
}