import React, { ReactElement } from "react";
import { Table } from "antd";
import { ITask } from "../../types/types";

export interface IToDoTableDataItem {
  id: number | null;
  key: number | null;
  title: string;
  status: string;
  description?: string;
  deadline?: string;
}

export interface IToDoTableColumn {
  key: string;
  title?: any;
  dataIndex?: string | string[];
  render?: (value: any, itemData: object) => ReactElement;
}

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
