import { Radio, Space } from 'antd'
import { useHelperStore } from './store'

export const FirstStep = ({ type }) => {
  const { answers, addAnswer } = useHelperStore(store => store)
  const onChange = event => addAnswer(type, event.target.value)
  const value = answers[type]

  return (
    <>
      <h2>Віддаєте перевагу сетам?</h2>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical" align="start">
          <Radio value={true}>Так</Radio>
          <Radio value={false}>Ні</Radio>
        </Space>
      </Radio.Group>
    </>
  )
}
