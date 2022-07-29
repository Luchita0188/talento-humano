import React, {Component} from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoxDrop from './BoxDrop';
import DragItem from './DragItem';
// import ModalInfo from './ModalInfo2';

import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './DnDLabel2.scss';

library.add(fas, fab, far);

class DnDLabel2 extends Component {
  state = {
    countDrop: 0,
    countOk: 0,
  }

  countOk = () => {
    this.setState({
      countOk: this.state.countOk + 1
    })
  }

  countDrop = () => {
    this.setState({
      countDrop: this.state.countDrop + 1,
    });

    if (this.state.countDrop === 8) {
      this.props.accumulatedPoints(this.state.countOk/8);    
      // funcion setTimeout
      setTimeout(() => {
        this.props.nextQuestion();
      }, 1000);
    }
  }

  render() {
    const { multimedia } = this.props;

    return (
      <div className = 'DnDLabel2 d-Flex j-S aI-E' style = {{ }}>
        <audio
          className = 'audio'
          autoPlay = { '' }
          id = 'audioNotification'
          src = { '' }
          ref = { (audio) => { this.audio = audio } } />
        <DndProvider backend={HTML5Backend}>    
          <div className = 'dropContent d-Flex j-S aI-E mR-1' id = 'dropContent'>
            {
              multimedia.dropZone.drops.map( (item, i) => {
                return(
                  <div className = 'dropInfo d-Flex d-C j-E aI-C mL-05 mR-05'  key = { i }>
                    <BoxDrop
                      id = { item.target }
                      img = { item.img }
                      order = { i }
                      type = { item.type }
                      limit={item.limit} />
                  </div>
                )
              })
            }
          </div>

          <div className = 'dragContent d-Flex d-R j-Ar aI-C wW c-3'>
            {
              multimedia.dragItems.map( item => {
                return(
                  <div key = { item.drag } className = {'d-Flex j-C aI-C mL-05 mR-05'}>
                    <p className = 'textDrag tCenter' dangerouslySetInnerHTML = { {__html: item.text} }/>
                    <DragItem
                      countDrop = { this.countDrop }
                      countOk = { this.countOk }
                      id = { item.drag }
                      name = { item.data }
                      path = { item.img }
                      type = { item.type } />
                  </div>
                )
              })
            }
          </div>
        </DndProvider>
      </div>
    );
  }
}

export default DnDLabel2;
