import AppModal from '../common/components/AppModal'
import AppButton from '../common/components/AppButton'
import { BUTTON_TYPE } from '../common/constants'
import { useHelperStore } from './store'
import { FirstStep } from './FirstStep'
import { ProductStep } from './ProductStep'
import { Step } from './Step'
import { TYPES } from './constants'

const steps = [
  { content: <FirstStep type={'sets'} /> },
  { content: <ProductStep type={TYPES.product} /> },
  { content: <Step type={TYPES.productSize} /> },
  { content: <Step type={TYPES.productCost} /> },
  { content: <Step type={TYPES.drinkProduct} /> },
  { content: <Step type={TYPES.drinkSize} /> },
]

export const HelperModal = ({ isOpenModal, setIsOpenModal }) => {
  const store = useHelperStore(state => state)
  const { current, next, prev, done } = store

  const contentStyle = {
    textAlign: 'center',
    marginTop: 16,
  }

  return (
    <AppModal isOpen={isOpenModal} onCancel={() => setIsOpenModal(false)}>
      <p>
        {current + 1} / {6}
      </p>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current > 0 && (
          <AppButton
            type={BUTTON_TYPE.DEFAULT}
            onClick={prev}
            name="Previous"
            style={{ marginRight: 16 }}
          />
        )}
        {current < steps.length - 1 && (
          <AppButton type={BUTTON_TYPE.PRIMARY} onClick={next} name="Next" />
        )}
        {current === steps.length - 1 && (
          <AppButton type={BUTTON_TYPE.PRIMARY} onClick={done} name="Done" />
        )}
      </div>
      <div style={contentStyle}>{steps[current].content}</div>
    </AppModal>
  )
}
