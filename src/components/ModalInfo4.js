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
      Act3: false
    }
  }

  actividad3Handle = (event) => {
    let idSelect = event.target.id;
    let numId = idSelect.substring(7, 8);

    if (document.getElementById(event.target.id).getAttribute('value') === 'true') {

      document.getElementById('audioNotification').src = 'audio/check.mp3';
      document.getElementById('audioNotification').play();

      document.getElementById('option-' + numId + '-check-act3-Op-' + numId).classList.remove('dNone');
      document.getElementById('option-' + numId + '-error-act3-Op-' + numId).classList.add('dNone');
      document.getElementById('option-' + numId + '-icon-act3-Op-' + numId).classList.add('dNone');

      document.getElementById('actividad-3').classList.remove('disabledSolid2');

      this.setState({
        Act2: this.state.Act2 - 1
      });

      this.setState({
        Act2: this.state.Act2 + 1
      });

    } else {
      document.getElementById('audioNotification').src = 'audio/error.mp3';
      document.getElementById('audioNotification').play();

      for (var j = 0; j < 2; j++) {
        document.getElementsByClassName('iconAct')[j].classList.remove('dNone');
        document.getElementsByClassName('iError')[j].classList.add('dNone');
      }

      document.getElementById('option-' + numId + '-error-act3-Op-' + numId).classList.remove('dNone');
      document.getElementById('option-' + numId + '-icon-act3-Op-' + numId).classList.add('dNone');
    }
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
          <div className = 'optionsBox' id = 'actividad-3'>
            {
              dataPage.actividad3.choices.map((choice, i) => {
                return(
                  <div className = 'option mB-05 d-Flex j-S aI-C' key = {i} id = {'act3-Op-' + (i)}>
                    <span className = 'fa-layers icon iconAct mR-05 d-Flex j-C aI-C' id = { 'option-' + (i) + '-icon-act3-Op-' + (i) }>
                      <FontAwesomeIcon icon="circle" className = 'circle' style = {{ 'color': choice.color }} />
                      <h6 className = 'blanco fw-3'>{ choice.type }</h6>
                    </span>
                    <span className = 'fa-layers iconCheck iCheck mR-05 dNone' id = { 'option-' + (i) + '-check-act3-Op-' + (i) }>
                      <FontAwesomeIcon icon="circle" className = 'circle' />
                      <FontAwesomeIcon icon="check" inverse transform="shrink-6" className = 'check' />
                    </span>
                    <span className = 'fa-layers iconError iError mR-05 dNone' id = { 'option-' + (i) + '-error-act3-Op-' + (i) }>
                      <FontAwesomeIcon icon="circle" className = 'circle' />
                      <FontAwesomeIcon icon="times" inverse transform="shrink-6" className = 'check' />
                    </span>

                    <p className = 'labelStatement optionAct3 c-9 mR-1' id = { 'option-' + (i) } value = { choice.value } dangerouslySetInnerHTML = {{ __html: choice.text }} onClick = { this.actividad3Handle }></p>
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
