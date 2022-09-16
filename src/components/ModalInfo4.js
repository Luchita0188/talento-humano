import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './ModalInfo4.scss';

library.add(fas, fab, far);

class ModalInfo4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Act3: 1
    }
  }

  actividad3Handle = (event) => {
    let idSelect = event.target.id;
    let numId = idSelect.substring(7, 8);


    if (document.getElementById(event.target.id).getAttribute('value') === 'true') {

      document.getElementById('audioNotification').src = 'audio/check.mp3';
      document.getElementById('audioNotification').play();
     
      document.getElementById('icon-' + numId).classList.add('dNone');
      document.getElementById('iCheck-' + numId).classList.remove('dNone');
      document.getElementById('option-' + numId).classList.add('labelTrue');
      

    } else {
      
      document.getElementById('audioNotification').src = 'audio/check.mp3';
      document.getElementById('audioNotification').play();

      document.getElementById('icon-' + numId).classList.add('dNone');
      document.getElementById('iError-' + numId).classList.remove('dNone');
      document.getElementById('option-' + numId).classList.add('labelFalse');
  
    }
      document.getElementById('actividad-3').classList.add('disabledSolid2');
      document.getElementById('iCheck-' + numId).classList.add('disabled');
      this.setState({
        Act3: this.state.Act3 - 1
      });

       this.setState({
        Act3: this.state.Act3 + 1
      });

    } 

  isEnded = () => {
    this.props.isEnded(true);
  }

  //FUNCION PARA CERRAR LA MODAL Y CAMBIAR EL STATE DE COVER
  hideModal = () => {
    document.querySelector('.footer').classList.remove('dNone');
    this.props.showModal();
  }

  render() {
    const { dataPage } = this.props;
    return (
      <div className = 'modalInfo4Act3 animated fadeIn d-Flex d-C'>

        <audio
          className = 'audio'
          autoPlay = { '' }
          id = 'audioNotification'
          src = { '' }
          ref = { (audio) => { this.audio = audio } } />

        <div className = 'actividad3 mT-1' id = 'actividad3'>
          <div className = 'mB-1'>
            <h4 className = 'labelStatement2 mB-1' dangerouslySetInnerHTML = {{ __html: dataPage.actividad3.statement }}></h4>
            <h4 className = 'labelStatement3' dangerouslySetInnerHTML = {{ __html: dataPage.actividad3.statement2 }}></h4>
          </div>
          <div className = 'optionsBox' id = 'actividad-3' style = {{ "height": 100 }}>
            {
              dataPage.actividad3.choices.map((choice, i) => {
                return(
                  <div className = 'option mB-05 d-Flex j-S aI-C' key = {i} id = { 'Op-' + (i) }>
                    <span className = { 'fa-layers icon mR-1 ' + (dataPage.actividad3.type === 'FV' ? 'dNone' : '') } id = { 'icon-' + (i + 1) }>
                      <FontAwesomeIcon icon="circle" className = 'circle color-6' />
                      <p className = { 'typeLabel' }>{ choice.type }</p>
                    </span>

                    <span className = { 'fa-layers iconCheck mR-1 dNone ' + (dataPage.actividad3.type === 'FV' ? 'dNone' : '')} id = { 'iCheck-' + (i + 1) }>
                      <FontAwesomeIcon icon="circle" className = 'circle' />
                      <FontAwesomeIcon icon="check" inverse transform="shrink-6" className = 'check' />
                    </span>

                      <span className = 'fa-layers iconError iError d-Flex j-C aI-C dNone' id = { 'iError-' + (i + 1) }>
                        <FontAwesomeIcon icon="circle" className = 'circle' />
                        <FontAwesomeIcon icon="times" inverse transform="shrink-6" className = 'check' />
                      </span>

                      <p className = {'labelStatement optionAct3 ' + (choice.type === 'VR' ? 'labelTrue fw-7 mR-05 ': '') + (choice.type === 'FR' ? 'labelFalse fw-7 mL-05': '') } id = { 'option-' + (i + 1 ) } value = { choice.value } dangerouslySetInnerHTML = {{ __html: choice.text }} onClick = { this.actividad3Handle }></p>
                  </div>
                )
              })
            }
          </div>
        </div>


      </div>
    );
  }
}

export default ModalInfo4;
