import React, { useCallback, useEffect, useState } from 'react';
import { useLoyaltiesData } from '../../context/LoyaltyContext.js';
import { InputNumber } from 'antd';
import AppDropDown from '../../../common/components/AppDropDown';
import AppButton from '../../../common/components/AppButton';
import { BUTTON_TYPE } from '../../../common/constants';
import { LOYALTY_SUPPORT_TYPE, LOYALTY_SUPPORT_TITLE } from '../../constants';
import styles from './loyalty.module.scss';
import { DeleteOutlined } from '@ant-design/icons';

const Loyalty = () => {
  const { loyaltiesData, getAllLoyaltiesDataInfo, deleteLoyaltyDataDataInfo, createLoyaltiesDataInfo } =
    useLoyaltiesData();
  const [totalAmount, setTotalAmount] = useState(null);
  const [adjustment, setAdjustment] = useState(null);
  const [handled, setHandled] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      getAllLoyaltiesDataInfo();
    }, 100);

    return () => {
      clearTimeout(delay)
    }
    // eslint-disable-next-line
  }, [handled]);

  const handlerChangeInputAmount = useCallback((value) => {
    setTotalAmount(value);
  }, []);

  const handlerChangeInputAdjustment = useCallback((value) => {
    const dataToSet = LOYALTY_SUPPORT_TYPE[value];
    setAdjustment(dataToSet);
  }, []);

  const handlerSaveInDB = useCallback(() => {
    if (totalAmount && adjustment && loyaltiesData && loyaltiesData?.length <= 3) {
      const data = {
        totalAmount,
        adjustment,
      };
      createLoyaltiesDataInfo(data);
      setHandled(prev => !prev);
    }
    // eslint-disable-next-line
  }, [totalAmount, adjustment, loyaltiesData]);

  const handleClickDelete = useCallback(id => {
    deleteLoyaltyDataDataInfo(id);
    setHandled(prev => !prev);
    // eslint-disable-next-line
  }, []);

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
          handleSelect={handlerChangeInputAdjustment}
          placeholder="Процент знижки"
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
                <div>{`Сумма : ${item.totalAmount} грн`}</div>
                <div className={styles.settingItem}>{`Розмiр знижки : ${item.adjustment * 100} %`}</div>
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

export default Loyalty;
