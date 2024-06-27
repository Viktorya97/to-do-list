import React from "react";
import { Table } from "antd";
import { ITask, IToDoTableColumn } from "../../types/types";

interface IToDoTableProps {
  columns: IToDoTableColumn[];
  data?: ITask[];
  className?: string;
}

const ToDoTable: React.FC<IToDoTableProps> = ({ columns, data, className }) => (
  <div className={className}>
    <Table columns={columns} dataSource={data} pagination={false} />
  </div>
);

export default ToDoTable;
