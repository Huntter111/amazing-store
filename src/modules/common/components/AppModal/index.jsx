import { Modal } from "antd";

const AppModal = ({ children, isOpen, onCancel }) => {
  return (
    <Modal closable={false} footer={false} open={isOpen} onCancel={onCancel}>
      {children}
    </Modal>
  );
};

export default AppModal;
