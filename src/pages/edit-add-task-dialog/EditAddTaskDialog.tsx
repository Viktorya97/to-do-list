import React, { ReactElement, useEffect } from "react";
import ToDoDialog from "../../components/to-do-dialog/ToDoDialog";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../validation/ValidationSchema";
import "./edit-add-task-dialog.scss";

interface IEditAddTaskDialogProps {
  isVisible: boolean;
  initialValues?: { title?: string; description?: string; deadline?: string };
  onHide?: () => void;
  onSubmit?: (data: any) => void;
}

const EditAddTaskDialog: React.FC<IEditAddTaskDialogProps> = ({
  isVisible = false,
  initialValues = {},
  onSubmit,
  onHide,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [reset, initialValues]);

  const renderBody = (): ReactElement => (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={"edit-add-task-dialog__inputs"}>
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input placeholder={"Title*"} type="text" {...field} />
            )}
          />
          <div className="edit-add-task-dialog__error-message">
            {errors.title?.message}
          </div>
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea placeholder={"Description"} {...field} />
            )}
          />
        </div>
        <div>
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <Input placeholder={"Deadline"} type="date" {...field} />
            )}
          />
        </div>
      </div>
      <div className={"edit-add-task-dialog__button"}>
        <Button htmlType="submit" type="primary">
          {initialValues?.title ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );

  const handleFormSubmit = (data: any): void => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <ToDoDialog isVisible={isVisible} body={renderBody()} onCancel={onHide} />
  );
};

export { EditAddTaskDialog };
