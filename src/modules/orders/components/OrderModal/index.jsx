import AppModal from "../../../common/components/AppModal";
import OrderForm from "../OrderForm";
import styles from "./orderModal.module.scss";

const OrderModal = ({ isOpenModal, setIsOpenModal, clearCart }) => {
  return (
    <AppModal
      className={styles.modal}
      isOpen={isOpenModal}
      onCancel={() => setIsOpenModal(false)}
    >
      <OrderForm
        closeModal={() => setIsOpenModal(false)}
        clearCart={clearCart}
      />
    </AppModal>
  );
};

export default OrderModal;
