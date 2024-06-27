import React, { ReactElement, useState } from "react";
import ToDoTable, {
  IToDoTableColumn,
} from "../../components/to-do-table/ToDoTable";
import { useSelector } from "react-redux";
import { IStateType, ITask } from "../../types/types";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addTask, completeTask, deleteTask, editTask } from "../../store";
import { EditAddTaskDialog } from "../edit-add-task-dialog";
import { Button, Space } from "antd";
import "./all-tasks-list.scss";

const AllTasksList: React.FC = () => {
  const dispatch = useDispatch();

  const { tasksList } = useSelector((state: IStateType) => state.tasks);

  const [showEditTodoDialog, setShowEditToDoDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<ITask | null>(null);

  const columns: IToDoTableColumn[] = [
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "deadline",
      title: "Deadline",
      dataIndex: "deadline",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (_value: any, item: any) => renderActions(item),
    },
  ];

  const renderAddTaskButton = (): ReactElement => {
    return (
      <div className={"all-tasks-list__add-button"}>
        <Button type="primary" onClick={onOpenAddTaskDialog}>
          {"Add Task"}
        </Button>
      </div>
    );
  };

  const onOpenAddTaskDialog = (): void => {
    setEditingItem(null);
    setShowEditToDoDialog(true);
  };

  const renderActions = (item: ITask): ReactElement => {
    return (
      <Space size={"middle"}>
        <DeleteOutlined
          onClick={() => onDeleteTodoItem(item.id as number)}
          style={{ color: "red" }}
        />
        <EditOutlined
          onClick={() => onEditTodoItem(item)}
          style={{ color: "blue" }}
        />
        <CheckCircleOutlined
          onClick={() => onCompleteTodoItem(item.id as number)}
          style={{ color: "green" }}
        />
      </Space>
    );
  };

  const onDeleteTodoItem = (id: number): void => {
    dispatch(deleteTask({ id }));
  };

  const onEditTodoItem = (item: ITask): void => {
    setEditingItem(item);
    setShowEditToDoDialog(true);
  };

  const onCompleteTodoItem = (id: number): void => {
    dispatch(completeTask({ id }));
  };

  const onHideEditToDoDialog = (): void => {
    setEditingItem(null);
    setShowEditToDoDialog(false);
  };

  const onSubmit = (data: ITask): void => {
    if (editingItem) {
      const editedData: ITask = {
        ...editingItem,
        ...data,
      };

      dispatch(editTask(editedData));
    } else {
      const newTask: ITask = {
        id: tasksList.length + 1,
        key: tasksList.length + 1,
        ...data,
      };

      dispatch(addTask({ newTask }));
    }

    setShowEditToDoDialog(false);
    setEditingItem(null);
  };

  return (
    <>
      {renderAddTaskButton()}
      <ToDoTable columns={columns} data={tasksList} />
      <EditAddTaskDialog
        isVisible={showEditTodoDialog}
        onHide={onHideEditToDoDialog}
        initialValues={editingItem as any}
        onSubmit={onSubmit}
      />
    </>
  );
};

export { AllTasksList };
