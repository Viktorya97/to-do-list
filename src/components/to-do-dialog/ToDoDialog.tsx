import { Modal } from "antd";
import React, { ReactElement } from "react";

interface IToDoDialogProps {
  title?: string;
  isVisible: boolean;
  body?: ReactElement | ReactElement[] | string | string[];
  onCancel?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const ToDoDialog: React.FC<IToDoDialogProps> = ({
  title,
  isVisible,
  body,
  onCancel,
  style,
  className,
}) => {
  return (
    <Modal
      title={title}
      open={isVisible}
      footer={null}
      onCancel={onCancel}
      className={className}
    >
      <div style={style}>{body}</div>
    </Modal>
  );
};

export default ToDoDialog;
