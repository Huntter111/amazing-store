import { Radio, Space } from 'antd'
import { useHelperStore } from './store'
import { STEPS, TEXTS } from './constants'

export const Step = ({ type }) => {
  const { answers, addAnswer } = useHelperStore(store => store)
  const onChange = event => addAnswer(type, event.target.value)
  const value = answers[type]

  const title = TEXTS[type]?.title || `Зробіть ваш вібір ${type}`
  const data = Object.values(STEPS[type])

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
