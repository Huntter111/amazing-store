import { createContext, useContext } from 'react';
import { notification } from 'antd';
import useLoyaltyDB from '../../../api/loyalty';

const LoyaltiesContext = createContext();

export const LoyaltiesDataProvider = ({ children }) => {
  const { loyaltiesData, createLoyaltiesData, getAllLoyaltiesData, deleteLoyaltyDataData } = useLoyaltyDB();

  const getAllLoyaltiesDataInfo = async () => {
    try {
      await getAllLoyaltiesData();
    } catch (error) {
      notification.error({
        message: 'Не вдалося отримати даних лоялностi',
        description: 'На жаль не вдалося отримати даних  лоялностi, спробуйте пізніше',
      });
    }
  };

  const createLoyaltiesDataInfo = async (data) => {
    try {
      await createLoyaltiesData(data);

      notification.success({
        message: 'Налаштування додано',
        description: 'Налаштування додано. Ви можете актівуваті його у будь-який час',
      });
    } catch (error) {
      notification.error({
        message: 'Не вдалося додати даних лоялностi',
        description: 'На жаль не вдалося додати даних лоялностi, спробуйте пізніше',
      });
    }
  };

  const deleteLoyaltyDataDataInfo = async (id) => {
    try {
      await deleteLoyaltyDataData(id);
      notification.success({
        message: 'Налаштування видалено',
        description: 'Налаштування видалено та деактивовано',
      });
    } catch (error) {
      notification.error({
        message: 'Не вдалося видалити налаштування.',
        description: 'На жаль не вдалося видалити та деактивувати налаштуванняю',
      });
    }
  };

  return (
    <LoyaltiesContext.Provider
      value={{
        loyaltiesData,
        getAllLoyaltiesDataInfo,
        deleteLoyaltyDataDataInfo,
        createLoyaltiesDataInfo,
      }}
    >
      {children}
    </LoyaltiesContext.Provider>
  );
};

export const useLoyaltiesData = () => {
  return useContext(LoyaltiesContext);
};
