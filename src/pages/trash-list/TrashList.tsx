import React, { ReactElement } from "react";
import ToDoTable from "../../components/to-do-table/ToDoTable";
import { useSelector } from "react-redux";
import { IStateType, IToDoTableColumn } from "../../types/types";
import { Badge } from "antd";
import "./trash-list.scss";

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
  ];

  const renderStatusColumn = (status: string): ReactElement => {
    return (
      <Badge
        color={"red"}
        text={
          <span className={"trash-list__status-column-text"}>{status}</span>
        }
      />
    );
  };

  return <ToDoTable columns={columns} data={trashList} />;
};

export { TrashList };
