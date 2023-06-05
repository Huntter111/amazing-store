import { Modal } from 'antd'
import { useState } from 'react'

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return { isOpen, openModal, closeModal }
}

const AppModal = ({ children, isOpen, onCancel, className }) => {
  return (
    <Modal
      className={className}
      closable={false}
      footer={false}
      open={isOpen}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  )
}

export default AppModal
