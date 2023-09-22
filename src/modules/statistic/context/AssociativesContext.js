import { createContext, useContext} from "react";
import { notification } from "antd";

import useAssociativesDB from "../../../api/associatives";

const AssociativesContext = createContext();

export const AssociativeDataProvider = ({ children }) => {
  const { associativeData, associativesData, createAssociativesData, updateAssociativeData, getAllAssociativesData, getAssociativeData, deleteAssociativeData } = useAssociativesDB();

  const getAssociativeDataInfo = async (id) => {
    try {
      await getAssociativeData(id);
    } catch (error) {
      notification.error({
        message: "Не вдалося отримати даних ассоціативних продуктів",
        description:
          "На жаль не вдалося отримати ассоціативних продуктів, спробуйте пізніше",
      });
    }
  };

  const getAllAssociativesDataInfo = async () => {
    try {
      await getAllAssociativesData();
    } catch (error) {
      notification.error({
        message: "Не вдалося отримати даних ассоціативних продуктів",
        description:
          "На жаль не вдалося отримати даних ассоціативних продуктів, спробуйте пізніше",
      });
    }
  };

  const createAssociativesDataInfo = async (data) => {
    try {
      await createAssociativesData(data);

      notification.success({
        message: "Налаштування додано",
        description:
          "Налаштування додано. Ви можете актівуваті його у будь-який час",
      });
    } catch (error) {
      notification.error({
        message: "Не вдалося додати даних ассоціативних продуктів",
        description:
          "На жаль не вдалося додати даних ассоціативних продуктів, спробуйте пізніше",
      });
    }
  };

  const updateAssociativeDataInfo = async (id, data) => {
    try {
      await updateAssociativeData(id, data);
    } catch (error) {
      notification.error({
        message: "Не вдалося оновити даних ассоціативних продуктів",
        description:
          "На жаль не вдалося оновити даних ассоціативних продуктів, спробуйте пізніше",
      });
    }
  };

  const deleteAssociativeDataInfo = async (id) => {
    try {
      await deleteAssociativeData(id);
      notification.success({
        message: "Налаштування видалено",
        description:
          "Налаштування видалено та деактивовано",
      });
    } catch (error) {
      notification.error({
        message: "Не вдалося видалити налаштування.",
        description:
          "На жаль не вдалося видалити та деактивувати налаштуванняю",
      });
    }
  };

  return (
    <AssociativesContext.Provider value={{
      associativeData,
      associativesData,
      getAssociativeDataInfo,
      getAllAssociativesDataInfo,
      createAssociativesDataInfo,
      updateAssociativeDataInfo,
      deleteAssociativeDataInfo
    }}>
      {children}
    </AssociativesContext.Provider>
  );
};

export const useAssociativeData = () => {
  return useContext(AssociativesContext);
};
