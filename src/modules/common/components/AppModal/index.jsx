import { Modal } from "antd";

const AppModal = ({ children, isOpen, onCancel, className }) => {
  return (
    <Modal
      className={className}
      closable={false}
      footer={false}
      open={isOpen}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
