import React from "react";
import ToDoTable, {
  IToDoTableColumn,
} from "../../components/to-do-table/ToDoTable";
import { useSelector } from "react-redux";
import { IStateType } from "../../types/types";

const TrashList: React.FC = () => {
  const { trashList } = useSelector((state: IStateType) => state.tasks);

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
  ];

  return <ToDoTable columns={columns} data={trashList} />;
};

export { TrashList };
