import { Tabs } from "antd";
import React, { ReactNode } from "react";

export interface IToDoTabData {
  key: string;
  label: ReactNode;
  children: ReactNode;
}

export interface IToDoTabsProps {
  items: IToDoTabData[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  type?: "line" | "card" | "editable-card";
  style?: React.CSSProperties;
  className?: string;
}

const ToDoTabs: React.FC<IToDoTabsProps> = ({
  items,
  defaultActiveKey,
  activeKey,
  type,
  onChange,
  style,
  className,
}) => {
  const extraProps: { [key: string]: any } = {};

  if (activeKey) {
    extraProps.activeKey = activeKey;
  } else if (defaultActiveKey) {
    extraProps.defaultActiveKey = defaultActiveKey;
  }

  return (
    <Tabs
      className={className}
      items={items}
      type={type}
      onChange={onChange}
      style={style}
      {...extraProps}
    />
  );
};

export { ToDoTabs };
