import React, { ReactElement } from "react";
import { AllTasksList } from "../all-tasks-list/AllTasksList";
import { ToDoTabs } from "../../components/to-do-tabs";
import { TrashList } from "../trash-list";
import "./overview.scss";
import { IToDoTabData } from "../../types/types";

const Overview: React.FC = () => {
  const renderAllTasksLstTab = (): ReactElement => {
    return <AllTasksList />;
  };

  const renderTrashListTab = (): ReactElement => {
    return <TrashList />;
  };

  const tabsData: IToDoTabData[] = [
    {
      key: "all",
      label: "All",
      children: renderAllTasksLstTab(),
    },
    {
      key: "trash",
      label: "Trash",
      children: renderTrashListTab(),
    },
  ];

  return (
    <div className={"overview"}>
      <h1 className={"overview__title"}>{"Todo List"}</h1>
      <div className={"overview__tabs"}>
        <ToDoTabs items={tabsData} />
      </div>
    </div>
  );
};

export { Overview };
