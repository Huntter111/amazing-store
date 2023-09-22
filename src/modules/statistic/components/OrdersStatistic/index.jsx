import React, { useEffect, useState } from 'react';
import { getUserStatisticOrdersData } from '../../helpers/getUserStatisticData';
import UsersOrders from '../UsersOrders';
import UserStatisticFilter from '../OrdersStatisticFilter';
import { InputNumber, Card, Button } from 'antd';
import styles from './ordersStatistic.module.scss';
import { useCallback } from 'react';

const OrdersStatistic = ({ allOrders }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [highlightDates, setHighlightDates] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [ordersSum, setOrdersSum] = useState(null);
  const [profitability, setProfitability] = useState(null);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    const { from, to } = dateRange;
    const { datepickerHighlightDates, graphData, fullOrdersSum } = getUserStatisticOrdersData(allOrders, from, to);
    setGraphData(graphData);
    setHighlightDates(datepickerHighlightDates);
    setOrdersSum(fullOrdersSum);
  }, [allOrders, dateRange]);

  const handlerChangeInputDate = useCallback((value) => {
    setInputValue(value);
  }, []);

  const setColorByProfitability = (procent) => {
    if (procent <= 30) {
      return 'red';
    }
    if (procent >= 30 && procent <= 50) {
      return 'blue';
    } else {
      return 'green';
    }
  };

  const hendlerRent = useCallback(() => {
    const profit = (ordersSum - inputValue).toFixed(2);
    const profitability = ((profit / ordersSum) * 100).toFixed(2);
    const color = setColorByProfitability(profitability);
    setProfitability([
      {
        title: 'Виручка',
        result: ordersSum,
      },
      {
        title: 'Прибуток',
        result: profit,
      },
      {
        title: 'Рентабельність',
        result: `${profitability} %`,
        color,
      },
    ]);
  }, [ordersSum, inputValue]);

  return (
    <>
      <UserStatisticFilter setDateRange={setDateRange} highlightDates={highlightDates} />
      <UsersOrders graphData={graphData} />

      <div className={styles.inputWrapper}>
        <div className={styles.content}>
          <div className={styles.wrapperButtons}>
            <InputNumber className={styles.input} min={0} max={100000000} defaultValue={0} onChange={handlerChangeInputDate} />
            <Button onClick={hendlerRent} className={styles.btn}>
              Розрахувати рентабельнiсть
            </Button>
          </div>
          <Card className={styles.list} title="Рентабельнiсть" bordered={false}>
            {profitability?.map((data) => {
              return (
                <p key={data.title}>
                  {data.title} = <span style={{ color: data.color ? data.color : 'black' }}>{data.result} </span>
                </p>
              );
            })}
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrdersStatistic;
