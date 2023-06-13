import { Radio, Space } from 'antd'
import { SET_PRODUCTS, SINGLE_PRODUCT } from './constants'
import { useHelperStore } from './store'

export const ProductStep = ({ type }) => {
  const { answers, addAnswer } = useHelperStore(store => store)
  const onChange = event => addAnswer(type, event.target.value)
  const value = answers[type]

  const isSet = answers.sets
  const title = isSet
    ? 'Что больше предпочитаете взять за основу?'
    : 'Зделайте ваш выбор'
  const data = isSet
    ? Object.values(SET_PRODUCTS)
    : Object.values(SINGLE_PRODUCT)

  return (
    <>
      <h2>{title}</h2>

      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical" align="start">
          {data.map(({ value, label }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </>
  )
}
