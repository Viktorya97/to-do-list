import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITasksState, ITask } from '../../types/types';
import { TaskStatus } from '../../types/enum';

const initialState: ITasksState = {
  tasksList: [{id: 1, key: 1, title: 'Task 1', status: TaskStatus.PENDING, description: 'to do', deadline: '2024-05-06'}],
  trashList: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: ITasksState, action: PayloadAction<{ newTask: ITask}>) => {
      const newTask: ITask = {
        ...action.payload.newTask,
        status: TaskStatus.PENDING,
      };

      state.tasksList.push(newTask);

    },
    editTask: (state: ITasksState, action: PayloadAction<ITask>) => {
      const { tasksList } = state;
      const updatedItem: ITask = action.payload;

      state.tasksList = tasksList.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    },
    completeTask: (state: ITasksState, action: PayloadAction<{ id: number }>) => {
      const { tasksList } = state;
      const completedItem: ITask | undefined = tasksList.find((item) => item.id === action.payload.id);

      if (completedItem) {
        completedItem.status = TaskStatus.COMPLETED;
      }
    },
    deleteTask: (state: ITasksState, action: PayloadAction<{ id: number }>) => {
      const { tasksList } = state;
      const deletedItem: ITask | undefined = tasksList.find((item) => item.id === action.payload.id);

      if (deletedItem) {
        state.tasksList = tasksList.filter((item) => item.id !== action.payload.id);
        deletedItem.status = TaskStatus.DELETED;
        state.trashList.push(deletedItem);
      }
    },
  },
});

export const { addTask, deleteTask, editTask, completeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
