import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './ModalInfo7.scss';

library.add(fas, fab, far);

class ModalVideo1 extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ended: false,
  //     time: 0
  //   }
  // }

  componentDidMount() {
    document.querySelector('.footer').classList.add('dNone');
  }

  //FUNCION PARA CERRAR LA MODAL Y CAMBIAR EL STATE DE COVER
  hideModal = () => {
    document.querySelector('.footer').classList.remove('dNone');
    if (this.props.count >= 2) {
    }
    this.props.showModal();
  }

  render() {
    const { dataModal } = this.props;
    return (
      <div className = 'modalInfo7 animated fadeIn'>
        <div className = 'showModal d-Flex j-S aI-S pT-1'>
          <img
            alt = 'Imagen Corporativa'
            className = 'imageFooter mR-1'
            src = { dataModal.modal.img }/>
          <div className = 'pT-3 c-10 mL-1'>
            <h2 className = 'mB-1'>{ dataModal.title }</h2>
            <p className = 'mB-1 fw-4' dangerouslySetInnerHTML = { { __html: dataModal.modal.text } } />
            {
              dataModal.modal.title ? <p className = 'bg-color-6 pT-2 pB-1 pR-1 pL-1' style = {{ 'border': '1px solid #29427D', 'borderRadius': '5px' }} dangerouslySetInnerHTML = { { __html: dataModal.modal.title } } /> : null
            }
          </div>

          { dataModal.modal.closedModal === true ?
            <button
              className = 'buttonClose'
              onClick = { this.hideModal }
              >
              <span className = 'fa-layers fa-fw iconButton' >
                <FontAwesomeIcon icon="circle" />
                <FontAwesomeIcon icon="times" inverse transform="shrink-6" />
              </span>
            </button> : null
          }
        </div>
      </div>
    );
  }
}

export default ModalVideo1;

