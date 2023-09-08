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
import { useUserData } from "../auth/context/UserDataContext";

const steps = [
  { content: <FirstStep type={TYPES.sets} /> },
  { content: <ProductStep type={TYPES.product} /> },
  { content: <Step type={TYPES.productSize} /> },
  { content: <Step type={TYPES.productCost} /> },
  { content: <Step type={TYPES.drinkProduct} /> },
  { content: <Step type={TYPES.drinkSize} /> },
  { content: <Step type={TYPES.drinkCost} /> },
];

const stepsOrder = [
  TYPES.sets,
  TYPES.product,
  TYPES.productSize,
  TYPES.productCost,
  TYPES.drinkProduct,
  TYPES.drinkSize,
  TYPES.drinkCost,
];

export const HelperModal = ({ isOpenModal, closeHelper }) => {
  const store = useHelperStore((state) => state);
  const { current, next, prev, answers } = store;
  const { userData, updateUserDataInfo, createUserDataInfo } = useUserData();
  const currentAnswerValue = store.answers[stepsOrder[current]];

  return (
    <AppModal
      isOpen={isOpenModal}
      onCancel={closeHelper}
      className={styles.appModal}
    >
      {!userData?.helperData ? (
        <>
          <p>
            {current + 1} / {7}
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
            {current < steps.length - 1 && (
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                disabled={
                  currentAnswerValue === undefined ||
                  currentAnswerValue === null
                }
                onClick={next}
                name="Далі"
              />
            )}
            {current === steps.length - 1 && (
              <AppButton
                type={BUTTON_TYPE.PRIMARY}
                onClick={() => {
                  if(userData?.id) {
                    updateUserDataInfo(userData.id, {
                      ...userData,
                      helperData: answers,
                    });
                  } else {
                    createUserDataInfo({helperData: answers})
                  }
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
        </>
      ) : (
        <div className={styles.deacivateWrapper}>
          <h2 className={styles.deacivateTitle}>Ви точно бажаєте відключити помічника?</h2>
          <AppButton
            type={BUTTON_TYPE.PRIMARY}
            onClick={() => {
              if(userData?.id) {
                updateUserDataInfo(userData.id, {
                  ...userData,
                  helperData: null,
                });
              } else {
                createUserDataInfo({helperData: null})
              }
              closeHelper();
              notification.success({
                message: "Помічник відключений",
                description:
                  "Помічник був відключений. Якщо потрібно то ви можете його активувати у будь-який час.",
              });
            }}
            name="Відключити помічника"
          />
        </div>
      )}
    </AppModal>
  );
};
