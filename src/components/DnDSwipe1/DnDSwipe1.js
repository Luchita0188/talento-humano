import React, {Component} from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoxDrop from './BoxDrop';
import DragItem from './DragItem';

import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './DnDSwipe1.scss';

library.add(fas, fab, far);

class DnDSwipe1 extends Component {
  state = {
    actualItem: 0
  }

  hideModal = (e) => {
    document.getElementById('infoDrop-' + (e.currentTarget.id)).classList.add('dNone');
    document.querySelector('.footer').classList.remove('dNone');
    document.querySelector('.instruction ').classList.remove('dNone');
    
    console.log(this.state.actualItem);

    if (this.state.actualItem === 8) {
      this.props.isEnded(true); // SI LLEGA EL FINAL DE LA ACT ENVÍA EL TRUE
    } else {
      this.setState({
        actualItem: this.state.actualItem + 1
      });

      document.getElementById('dropBg-' + (this.state.actualItem + 1)).classList.remove('disabledGray2');
    }
  }

  render() {
    const { multimedia } = this.props;

    const style = {
      backgroundImage: 'url(' + multimedia.resources.bg + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };

    return (
      <div className = 'DnDSwipe1' style={style}>
        <audio
          className = 'audio'
          autoPlay = { '' }
          id = 'audioNotification'
          src = { '' }
          ref = { (audio) => { this.audio = audio } } />
        <DndProvider backend={HTML5Backend}>          
          <div className = 'dropContent c-10'>
            {
              multimedia.dropZone.drops.map( (item, i) => {
                const styleDrop = {
                  'backgroundImage': 'url(' + item.img + ')',
                  'backgroundRepeat': 'no-repeat'
                }
                return(
                  <div className = { 'dropBg pAbs ' + (i !== 0 ? 'disabledGray2' : '') } id = { 'dropBg-' + i }  key = { i } style = {{ ...styleDrop, 'top': item.posY, 'left': item.posX}}>
                    <BoxDrop                    
                      color = { item.color }
                      id = { item.target }
                      img = { item.img }
                      order = { item.type }
                      type = { item.type }
                      top={ item.posY }
                      left={ item.posX } />
                  </div>
                )
              })
            }
          </div>
          <div className = 'dragContent d-Flex d-R j-C aI-C'>
            {
              multimedia.dragItems.map( item => {
                return(
                  <div key = { item.drag } id={'dragItemPath'} className = {'pAbs'}>
                    <DragItem
                      color = { item.color }
                      id = { item.drag }
                      img = { item.img }
                      name = { item.data }
                      path = { item.img }
                      type = { item.type } />
                  </div>
                )
              })
            }
          </div>
        </DndProvider>

        {
          multimedia.dropZone.infoBox.map( (item, i) => {
            return(
              <div className='bgItemGlobe dNone animated fadeIn' id = { 'infoDrop-' + (item.target) } >
                <div
                  className = { 'itemGlobe d-Flex d-C j-C aI-C' }
                  key = { i }>

                  <div className = { 'numType d-Flex j-C aI-C mB-1' } style={{'backgroundColor': item.color}}>
                    <h1 className = 'tCenter F2 blanco'>0{ item.target }</h1>
                  </div>
                  <p className = 'tCenter' dangerouslySetInnerHTML = { {__html: item.text} }/>

                  <button
                    className = 'buttonClose'
                    onClick = { this.hideModal }
                    id = { item.target }
                    >
                    <span className = 'fa-layers fa-fw iconButton' >
                      <FontAwesomeIcon icon="circle" />
                      <FontAwesomeIcon icon="times" inverse transform="shrink-6" />
                    </span>
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default DnDSwipe1;
