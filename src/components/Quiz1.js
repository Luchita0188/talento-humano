import React, { Component } from 'react';
import DnDLabel2 from './DnDLabel2/DnDLabel2';
import DraggableWords from './DraggableWords/DraggableWords';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './Quiz1.scss';

// CREATING LIBRARY ICONS
library.add(fas, fab, far);

class Quiz1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      accumulatedPoints: 0,
      totalPoints: props.multimedia.questions.length,
      raw: 0,
      showModal: false,
      isNext: false,
    }
  }

  statusQuiz = () => {
    console.log(
      `
      Question          : ${this.state.question}
      Accumulated Points: ${this.state.accumulatedPoints}
      Total Points      : ${this.state.totalPoints}`
    );
  }

  isEnded = () => {
    this.props.isEnded(true);
  }

  accumulatedPoints = (points) => {
    console.log(points);
    this.setState({
      accumulatedPoints: this.state.accumulatedPoints + points
    });
  }

  nextQuestion = () => {
     this.setState({
      isNext: this.state.isNext,
      question: this.state.question + 1,  
    });
  }

  showModal = (modal) => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  //FUNCION PARA CERRAR LA MODAL
  hideModal = event => {
    event.preventDefault();

    document.querySelector('.footer').classList.remove('dNone');

    this.showModal();

    this.props.endQuiz(document.getElementById('buttonCloseQuizModal').id); // VA EN EL BOTON DE FINALIZACIÓN

    this.isEnded();
  }

  actividadHandle = (event) => {
    const { questions } = this.props.multimedia;

    // SELECCION DEL ID DE LA OPCION
    let idSelect = event.target.id;
    // NUMERO ID 0, 1, 2, 3, ...
    let numId = idSelect.substring(7, 8);

    let typeQuestion = questions[this.state.question].type;

    // console.log(this.state.question);

    switch (typeQuestion) {
      case 'single':
        // console.log('Valor de la respuesta: ' + document.getElementById(idSelect).getAttribute('value'));
        for (var i = 0; i < questions[this.state.question].options.length; i++) {
          document.getElementsByClassName('icon')[i].classList.remove('dNone');
          document.getElementsByClassName('iconCheck')[i].classList.add('dNone');
          document.getElementsByClassName('iconError')[i].classList.add('dNone');
          document.getElementsByClassName('optionAct3')[i].classList.remove('labelTrue');
          document.getElementsByClassName('optionAct3')[i].classList.remove('labelFalse');
        }
        //QUITAR LA SELECCION DE LA OPCIÓN

        // VALIDAR QUE LA RESPUESTA ES CORRECTA
        if (document.getElementById(idSelect).getAttribute('value') === 'true') {
          
          document.getElementById('icon-' + numId).classList.add('dNone');
          document.getElementById('iCheck-' + numId).classList.remove('dNone');
          document.getElementById('option-' + numId).classList.add('labelTrue');

          this.accumulatedPoints(1);

          document.getElementById('audioNotification').src = 'audio/check.mp3';
          document.getElementById('audioNotification').play();
        } else {
          document.getElementById('icon-' + numId).classList.add('dNone');
          document.getElementById('iError-' + numId).classList.remove('dNone');
          document.getElementById('option-' + numId).classList.add('labelFalse');

          document.getElementById('audioNotification').src = 'audio/error.mp3';
          document.getElementById('audioNotification').play();
        }

        document.getElementById('btnNextQuiz').classList.add('disabled');
        document.getElementById('btnNextQuiz').classList.remove('disabled');
        document.getElementById('act-').classList.remove('disabledSolid2');
        // document.getElementById('act-').classList.add('disabledSolid2');
        break;

      default:
        break;
    }
  }

  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y PASAR A LA PAGINA FINAL
  endQuiz = () => {
    console.log('Puntos acumulados: ' + this.state.accumulatedPoints);

    // Suma de la pregunta multiple
    let totalFinal = (this.state.accumulatedPoints * 100) / this.state.totalPoints;

    this.props.setScore(totalFinal);
    console.log('Puntaje total: ' + totalFinal);

    this.setState({
      raw: totalFinal
    })
    console.log('Final no va más');

    this.setState({
      showModal: !this.state.showModal
    })
    document.querySelector('.footer').classList.add('dNone');
  }

  render() {
    const { multimedia } = this.props;

    this.statusQuiz();

    return (
      <div className = 'Quiz1 c-10 '>
        <audio
          className = 'audio'
          autoPlay = { '' }
          id = 'audioNotification'
          src = { '' }
          ref = { (audio) => { this.audio = audio } } />
        {
          this.state.showModal !== false &&
          <div className = 'modalQuiz animated fadeIn'>
            <div className = 'showModal'>
              <div className = 'c-10 d-Flex d-C j-C aI-C'>
                <img alt = 'Imagen' className = 'mB-2' src = { this.state.raw >= 70 ? multimedia.modal.check.img : multimedia.modal.error.img }/>
                <h2 className = 'mB-1 tCenter' dangerouslySetInnerHTML = {{ __html: this.state.raw >= 70 ? multimedia.modal.check.title : multimedia.modal.error.title }}></h2>
                <h3 className = 'mB-1 tCenter'>Tu calificación fue de: { Math.round(this.state.raw) }%</h3>
                <p className = 'tCenter mB-2' dangerouslySetInnerHTML = {{ __html: this.state.raw >= 70 ? multimedia.modal.check.text : multimedia.modal.error.text }}></p>

                <button
                  className = 'buttonQuiz pT-05 pB-05 pL-1 pR-1'
                  onClick = { this.hideModal }
                  id = { 'buttonCloseQuizModal' }
                  >
                    Continuar
                </button>
              </div>
            </div>
          </div>
        }

        <div className = { 'question d-Flex d-C j-E aI-S' } id = { 'question-' + this.state.question }>
          <p className = 'mB-1' dangerouslySetInnerHTML = {{ __html: multimedia.questions[this.state.question].instruction }}></p>
          <p className = { 'labelStatement mB-1'} dangerouslySetInnerHTML = {{ __html: multimedia.questions[this.state.question].statement }}></p>
          {
            multimedia.questions[this.state.question].type === 'LabelDnD' &&
            <DraggableWords multimedia = { multimedia.questions[this.state.question].labelDnD } accumulatedPoints = { this.accumulatedPoints } nextQuestion={this.nextQuestion} />
          }
          {
            multimedia.questions[this.state.question].type === 'single' &&
            <div className='d-Flex aI-C'>
              <div id='act-'>
                {
                  multimedia.questions[this.state.question].options.map((choice, i) => {
                    return(
                      <div className = 'option mB-05 d-Flex j-S aI-C' key = {i} id = { 'Op-' + (i) }>
                        <span className = { 'fa-layers icon mR-1 ' + (multimedia.questions[this.state.question].type === 'FV' ? 'dNone' : '') } id = { 'icon-' + (i) }>
                          <FontAwesomeIcon icon="circle" className = 'circle color-6' />
                          <p className = { 'typeLabel' }>{ choice.type }</p>
                        </span>

                        <span className = { 'fa-layers iconCheck mR-1 dNone ' + (multimedia.questions[this.state.question].type === 'FV' ? 'dNone' : '')} id = { 'iCheck-' + (i) }>
                          <FontAwesomeIcon icon="circle" className = 'circle' />
                          <FontAwesomeIcon icon="check" inverse transform="shrink-6" className = 'check' />
                        </span>

                        <span className = { 'fa-layers iconError mR-1 dNone ' + (multimedia.questions[this.state.question].type === 'FV' ? 'dNone' : '')} id = { 'iError-' + (i) }>
                          <FontAwesomeIcon icon="circle" className = 'circle' />
                          <FontAwesomeIcon icon="times" inverse transform="shrink-6" className = 'check' />
                        </span>

                        <p className = {'labelStatement optionAct3 ' + (choice.type === 'VR' ? 'labelTrue fw-7 mR-05 ': '') + (choice.type === 'FR' ? 'labelFalse fw-7 mL-05': '') } id = { 'option-' + (i) } value = { choice.value } dangerouslySetInnerHTML = {{ __html: choice.text }} onClick = { this.actividadHandle }></p>
                      </div>
                    )
                  })
                }
              </div>
              {/* <div>
                <img
                alt = 'Imagen Quiz'
                className = ' mL-7'
                src = { multimedia.questions[this.state.question].img }/>
              </div> */}
            </div>
          }
          {
            (multimedia.questions.length - 1) === this.state.question &&
            <button
              className = {'buttonQuiz mT-2 pT-05 pB-05 pL-1 pR-1' + (multimedia.questions.length - 1) !== this.state.question ? '' : ' disabled'}
              id = 'btnNextQuiz'
              onClick = { this.nextQuestion }>
              Finalizar
            </button>
          }
          
        </div>
      </div>
    );
  }
}

export default Quiz1;