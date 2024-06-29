import { ReactElement, ReactNode } from "react";
import { TaskStatus } from "./enum";

export interface ITask {
    id?: number;
    key?: number;
    title: string;
    status: TaskStatus;
    description?: string;
    deadline?: string;
}

export interface IToDoTableColumn {
    key: string;
    title?: any;
    dataIndex?: string | string[];
    render?: (value: any, itemData: object) => ReactElement;
  }

  export interface IToDoTabData {
    key: string;
    label: ReactNode;
    children: ReactNode;
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