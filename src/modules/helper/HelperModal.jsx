import { notification } from "antd";

import AppModal from "../common/components/AppModal";
import AppButton from "../common/components/AppButton";
import { BUTTON_TYPE } from "../common/constants";
import { useHelperStore } from "./store";
import { FirstStep } from "./FirstStep";
import { ProductStep } from "./ProductStep";
import { Step } from "./Step";
import { TYPES } from "./constants";
import styles from "./helper.module.scss";
import { useUserAuth } from "../auth/context/AuthContext";
import { useUserData } from "../auth/context/UserDataContext";
import { useEffect } from "react";

const steps = [
  { content: <FirstStep type={TYPES.sets} /> },
  { content: <ProductStep type={TYPES.product} /> },
  { content: <Step type={TYPES.productSize} /> },
  { content: <Step type={TYPES.productCost} /> },
  { content: <Step type={TYPES.drinkProduct} /> },
  { content: <Step type={TYPES.drinkSize} /> },
];

const stepsOrder = [
  TYPES.sets,
  TYPES.product,
  TYPES.productSize,
  TYPES.productCost,
  TYPES.drinkProduct,
  TYPES.drinkSize,
];

export const HelperModal = ({ isOpenModal, closeHelper }) => {
  const store = useHelperStore((state) => state);
  const { current, next, prev, answers } = store;
  const { user } = useUserAuth();
  const { userData, getUserDataInfo, updateUserDataInfo } = useUserData();
  const currentAnswerValue = store.answers[stepsOrder[current]];

  useEffect(() => {
    user && getUserDataInfo(user.email);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AppModal
      isOpen={isOpenModal}
      onCancel={closeHelper}
      className={styles.appModal}
    >
      <p>
        {current + 1} / {6}
      </p>
      <div className={styles.content}>{steps[current].content}</div>
      <div className={styles.control}>
        {current > 0 && (
          <AppButton
            type={BUTTON_TYPE.DEFAULT}
            onClick={prev}
            name="Повернутися"
            style={{ marginRight: 16 }}
          />
        )}
        {console.log("ddd", store.answers[stepsOrder[current]])}
        {current < steps.length - 1 && (
          <AppButton
            type={BUTTON_TYPE.PRIMARY}
            disabled={
              currentAnswerValue === undefined || currentAnswerValue === null
            }
            onClick={next}
            name="Далі"
          />
        )}
        {current === steps.length - 1 && (
          <AppButton
            type={BUTTON_TYPE.PRIMARY}
            onClick={() => {
              updateUserDataInfo(userData.id, {...userData, helperData: answers});
              closeHelper();
              notification.success({
                message: "Дякуємо за ваш вибір",
                description:
                  "Тепер вам будуть запропановані найкращі для вас продукти",
              });
            }}
            name="Завершити"
          />
        )}
      </div>
    </AppModal>
  );
};
