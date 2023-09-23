import React, { useCallback, useEffect, useState } from 'react';
import { useLoyaltiesData } from '../../context/LoyaltyContext.js';
import { InputNumber } from 'antd';
import AppDropDown from '../../../common/components/AppDropDown';
import AppButton from '../../../common/components/AppButton';
import { BUTTON_TYPE } from '../../../common/constants';
import { LOYALTY_SUPPORT_TYPE, LOYALTY_SUPPORT_TITLE } from '../../constants';
import styles from './loality.module.scss';
import { DeleteOutlined } from '@ant-design/icons';

const Loality = () => {
  const { loyaltiesData, getAllLoyaltiesDataInfo, deleteLoyaltyDataDataInfo, createLoyaltiesDataInfo } =
    useLoyaltiesData();
  const [totalAmount, setTotalAmount] = useState(null);
  const [adjastment, setAdjastment] = useState(null);

  useEffect(() => {
    getAllLoyaltiesDataInfo();
  }, []);

  const handlerChangeInputAmount = useCallback((value) => {
    setTotalAmount(value);
  }, []);
  const handlerChangeInputAdjastment = useCallback((value) => {
    const dataToSet = LOYALTY_SUPPORT_TYPE[value];
    setAdjastment(dataToSet);
  }, []);

  const handlerSaveInDB = useCallback(() => {
    if (totalAmount && adjastment && loyaltiesData && loyaltiesData?.length <= 3) {
      const data = {
        totalAmount,
        adjastment,
      };
      createLoyaltiesDataInfo(data);
      getAllLoyaltiesDataInfo();
    }
  }, [totalAmount, adjastment, loyaltiesData]);

  const handleClickDelete = (id) => {
    deleteLoyaltyDataDataInfo(id);
    getAllLoyaltiesDataInfo();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <InputNumber min={0} max={100000000} defaultValue={0} onChange={handlerChangeInputAmount} />
        <AppDropDown
          styles={styles.inputProcentSale}
          arrayTypes={Object.keys(LOYALTY_SUPPORT_TITLE).map((type) => {
            return { title: type };
          })}
          enumKeyWithoutUppercase
          handleSelect={handlerChangeInputAdjastment}
          placeholder="Процент скидки"
          enumData={LOYALTY_SUPPORT_TITLE}
        />
        <AppButton
          name={'Зберегти налаштування'}
          onClick={handlerSaveInDB}
          disabled={loyaltiesData && loyaltiesData?.length >= 3}
          type={BUTTON_TYPE.PRIMARY}
        />
      </div>
      <div>
        {loyaltiesData?.map((item) => {
          return (
            <div className={styles.settingsInfoWrapper} key={item.id}>
              <div className={styles.settingsInfo}>
                <div>{`Сумма : ${item.totalAmount}`}</div>
                <div className={styles.settingItem}>{`Розмiр скидки : ${item.adjastment * 100} %`}</div>
              </div>
              <DeleteOutlined
                className={styles.deleteIcon}
                onClick={() => {
                  handleClickDelete(item.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Loality;
