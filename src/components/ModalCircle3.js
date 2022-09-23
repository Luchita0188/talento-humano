import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './ModalCircle3.scss';

library.add(fas, fab, far);

class ModalCircle3 extends Component {
  componentDidMount() {
    document.querySelector('.footer').classList.add('dNone'); // OCULTAR EL FONDO
    document.querySelector('.instruction').classList.add('dNone'); // OCULTAR EL FONDO
  }

  //FUNCION PARA CERRAR LA MODAL Y CAMBIAR EL STATE DE COVER style = {{ 'marginTop': 40, 'marginLeft': -480 }}
  hideModal = () => { 
    this.props.setModal(false); // MUESTRA EL MODAL
    
    document.querySelector('.footer').classList.remove('dNone'); // OCULTAR EL FONDO
    document.querySelector('.instruction').classList.remove('dNone'); // OCULTAR EL FONDO
  }

  render() {
    const { infoEnd1 } = this.props.dataPage;
    // console.log(infoEnd);
    return (
      <div className = 'ModalCircle3 d-Flex d-C'>
        <div className = 'bgItemGlobe animated fadeIn'>
          <div className = { 'itemGlobe animated fadeIn d-Flex d-C j-C aI-C'} >

            <h3 className = 'mB-1 color-14 italic '>{ infoEnd1.title }</h3>

            <p className = 'mB-1 mL-2 pB-1' dangerouslySetInnerHTML = { { __html: infoEnd1.text1 } } />
            {
              infoEnd1.text2 &&
              <p className = 'c-75 enfasis-1' dangerouslySetInnerHTML = { { __html: infoEnd1.text2 } } />
            }

            <img alt = '' className = '' src = { infoEnd1.img2 }/>

            <button
              className = 'buttonClose'
              onClick = { this.hideModal }
              style = { { 'top': infoEnd1.buttonClose.posY, 'right': (infoEnd1.buttonClose.posX) } }
              >
              <span className = 'fa-layers fa-fw iconButton' >
                <FontAwesomeIcon icon="circle" />
                <FontAwesomeIcon icon="times" inverse transform="shrink-6" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalCircle3;
