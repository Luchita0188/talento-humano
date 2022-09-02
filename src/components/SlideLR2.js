import React, {Component} from 'react';
// import { DndProvider } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// import DropWord from './subcomponents/DnDFV/DropFV';
// import DragWord from './subcomponents/DnDFV/DragFV';

import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './SlideLR2.scss';

library.add(fas, fab, far);

class SlideLR2 extends Component {
  state = {
    page: 1
  }

  mSlides = e => {
    if (e.currentTarget.id === 'btnAnt') {
      this.setState({
        page: this.state.page - 1
      });
    }
    if (e.currentTarget.id === 'btnSig') {
      this.setState({
        page: this.state.page + 1
      });

      if (this.state.page === this.props.multimedia.items.length - 1) {
        setTimeout(() => {
          this.props.isEnded(true); // SI LLEGA EL FINAL DE LA ACT ENVÍA EL TRUE
          this.props.setModal(true); // MUESTRA EL MODAL
        }, 5000);
      }
    }
  }

  render() {
    const { multimedia } = this.props;
    return (
      <div className = 'SlideLR2 d-Flex j-S aI-C'>
        <div className = 'contentSlide d-Flex d-C j-C aI-C' id = 'contentSlide'>
          {
            multimedia.items.map( (item, i) => {
              return(
                <div key = { i + 1 } id = { 'slideBox-' + (i + 1) } className = {'slideBox d-Flex d-C j-C aI-C animated fadeIn ' + ((i + 1) !== this.state.page ? 'dNone' : '')}>
                  {
                    item.img ? <img alt = 'Imagen' className = '' src = { item.img }/> : null
                  }
                </div>
              )
            })
          }
          <div className = 'contentButton d-Flex j-Bt aI-C pAbs'>
            <button className = { 'buttonSlide ' + (this.state.page === 1 ? 'disabled' : '') } id = 'btnAnt' onClick = { this.mSlides }>
              <span className = 'fa-layers fa-fw iconButton' >
                <FontAwesomeIcon icon="circle" />
                <FontAwesomeIcon icon="arrow-left" inverse transform="shrink-6" />
              </span>
            </button>
            <button className = { 'buttonSlide ' + (this.state.page === multimedia.items.length ? 'disabled' : 'pulse-signal') } id = 'btnSig' onClick = { this.mSlides }>
              <span className = 'fa-layers fa-fw iconButton' >
                <FontAwesomeIcon icon="circle" />
                <FontAwesomeIcon icon="arrow-right" inverse transform="shrink-6" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SlideLR2;
