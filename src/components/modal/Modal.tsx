import React, { useState, useEffect, useRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

interface ModalProps {
  active: boolean;
  id: string;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(!!props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
};

interface ModalContentProps {
  onClose: () => void;
  children: ReactNode;
}

export const ModalContent = (props: ModalContentProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    if (contentRef.current !== null) {
      contentRef.current.classList.remove('active');
    }
    if (props.onClose) props.onClose();
  };

  return (
    <div ref={contentRef} className='modal__content'>
      {props.children}
      <div className='modal__content__close' onClick={closeModal}>
        <i className='bx bx-x'></i>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

export default Modal;
