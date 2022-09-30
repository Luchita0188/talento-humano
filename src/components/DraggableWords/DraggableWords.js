import React, {Component} from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropWord from './DropWord';
import DragWord from './DragWord';

import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './DraggableWords.scss';

library.add(fas, fab, far);

class DraggableWords extends Component {
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

    if (this.state.countDrop === 4) {
      this.props.accumulatedPoints(this.state.countOk/4);
      // funcion setTimeout
      setTimeout(() => {
        this.props.nextQuestion();
      }, 1000);
    }
  }

  render() {
    const { multimedia } = this.props;
    return (
      <div className = 'draggableWords'>
        <audio
          className = 'audio'
          autoPlay = { '' }
          id = 'audioNotification'
          src = { '' }
          ref = { (audio) => { this.audio = audio } } />

        <DndProvider backend = { HTML5Backend }>
          <div className = 'contentWords d-Flex j-S aI-S wW' id = 'contentWords' >
            {
             multimedia.dragItem.map( (item, i) => {
              return(
                <DragWord
                  bgColor = { item.color }
                  countDrop = { this.countDrop }
                  countOk = { this.countOk }
                  id = { item.id }
                  key = { item.id }
                  name = { item.text }
                  type = { item.type }/>
              )
            })
            }
          </div>

          <div className = 'contentSlide d-Flex d-C j-Bt mB-05'>
            {
              multimedia.dropZone.paragraph.map( (item, i) => {
                return(
                  <div key = { item.key } className = {'slideBox animated fadeIn'}>
                    {
                      item.lines.map( (line, i) => {
                        return(
                          <p key = { line.key } className = 'line-drop' style = { { 'top': line.posY, 'left': line.posX } }>{ line.text }</p>
                        )
                      })
                    }
                    {
                      item.drops.map( (boxDrop, i) => {
                        return(
                          <DropWord
                            key = { boxDrop.key }
                            id = { i }
                            size = { boxDrop.size }
                            posY = { boxDrop.posY }
                            posX = { boxDrop.posX }
                            type = { boxDrop.type }
                            correct = { boxDrop.correct } />
                        )
                      })
                    }
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

export default DraggableWords;
