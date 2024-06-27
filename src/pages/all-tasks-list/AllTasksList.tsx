import React, { ReactElement, useState } from "react";
import ToDoTable from "../../components/to-do-table/ToDoTable";
import { useSelector } from "react-redux";
import { IStateType, ITask, IToDoTableColumn } from "../../types/types";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addTask, completeTask, deleteTask, editTask } from "../../store";
import { EditAddTaskDialog } from "../edit-add-task-dialog";
import { Badge, Button, Space } from "antd";
import "./all-tasks-list.scss";
import { TaskStatus } from "../../types/enum";

const AllTasksList: React.FC = () => {
  const dispatch = useDispatch();

  const { tasksList } = useSelector((state: IStateType) => state.tasks);

  const [showEditAddTaskDialog, setShowEditAddTaskDialog] =
    useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

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
      render: (status) => renderStatusColumn(status),
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
      dataIndex: "actions",
      render: (_value: any, item: any) => renderActions(item),
    },
  ];

  const renderNewTaskButton = (): ReactElement => {
    return (
      <div className={"all-tasks-list__add-button"}>
        <Button type="primary" onClick={onShowEditAddTaskDialog}>
          {"New Task"}
        </Button>
      </div>
    );
  };

  const onShowEditAddTaskDialog = (): void => {
    setSelectedTask(null);
    setShowEditAddTaskDialog(true);
  };

  const renderStatusColumn = (status: string): ReactElement => {
    let color: string;

    switch (status) {
      case TaskStatus.REMOVED:
        color = "red";
        break;

      case TaskStatus.COMPLETED:
        color = "green";
        break;

      default:
        color = "orange";
        break;
    }

    return (
      <Badge
        color={color}
        text={
          <span className={"all-tasks-list__status-column-text"}>{status}</span>
        }
      />
    );
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
    setSelectedTask(item);
    setShowEditAddTaskDialog(true);
  };

  const onCompleteTodoItem = (id: number): void => {
    dispatch(completeTask({ id }));
  };

  const onHideEditAddTaskDialog = (): void => {
    setSelectedTask(null);
    setShowEditAddTaskDialog(false);
  };

  const onSubmitEditAddTaskDialog = (data: ITask): void => {
    if (selectedTask) {
      const editedData: ITask = {
        ...selectedTask,
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

    setShowEditAddTaskDialog(false);
    setSelectedTask(null);
  };

  return (
    <>
      {renderNewTaskButton()}
      <ToDoTable columns={columns} data={tasksList} />
      {showEditAddTaskDialog && (
        <EditAddTaskDialog
          isVisible={showEditAddTaskDialog}
          onHide={onHideEditAddTaskDialog}
          initialValues={
            selectedTask || { title: "", description: "", deadline: "" }
          }
          onSubmit={onSubmitEditAddTaskDialog}
        />
      )}
    </>
  );
};

export { AllTasksList };
