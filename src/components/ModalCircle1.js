import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './ModalCircle1.scss';

library.add(fas, fab, far);

class ModalCircle1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actualItem: 0,
      countItem: 0,
      openGlobe: false
    }
  }

  showItems = () => {
    const { dataPage } = this.props;
    return dataPage.multimedia.map( (item, i) => {
      // console.log(item);
      return(
        <div className = 'circleItems pAbs' key = { i } style={{top: item.itemInfo.pos.top, left: item.itemInfo.pos.left}}>
          <button 
            className = { 'circleButton ' + ( i + 1 !== 1 ? 'disabledGray' : '')} 
            id = { i + 1 } 
            onClick = { this.enableItem } >

            <img alt = '' className = '' id = { i + 1 } src = { item.urlImgBtn }/>
          </button>
        </div>
      );
    } );
    // return ITEM;
  }

  enableItem = (e) => {
    const { multimedia } = this.props.dataPage;
    e.preventDefault();
    const IDITEM = e.target.id;
    let idItem = parseInt(IDITEM);
    // console.log(idItem);

    document.getElementById(idItem).classList.add('visited');

    if (idItem <= multimedia.length) {
      if (idItem !== this.state.actualItem) {
        this.setState({ actualItem : idItem });
        if (idItem !== multimedia.length) {
          let nextItem = document.getElementById(idItem + 1);
          nextItem.classList.remove('disabledGray');
          this.setState({ countItem: this.state.countItem + 1 });
        } else {
          this.setState({ countItem: this.state.countItem + 1 });
          this.props.isEnded(true); // SI LLEGA EL FINAL DE LA ACT ENVÍA EL TRUE
        }
      }
    }

    if (this.state.countItem === multimedia.length) {
      this.setState({ countItem: multimedia.length });

    }

    this.showGlobe();
  }

  showGlobe = () => {
    this.setState({
      openGlobe: !this.state.openGlobe
    });

    document.querySelector('.footer').classList.add('dNone'); // OCULTAR EL FONDO
    // document.querySelector('.menuContent').classList.add('dNone'); // OCULTAR EL FONDO
    document.querySelector('.instruction').classList.add('dNone'); // OCULTAR EL FONDO
  }

  //FUNCION PARA CERRAR LA MODAL Y CAMBIAR EL STATE DE COVER style = {{ 'marginTop': 40, 'marginLeft': -480 }}
  hideModal = () => { 
    this.setState({
      openGlobe: !this.state.openGlobe
    });

    document.querySelector('.footer').classList.remove('dNone'); // OCULTAR EL FONDO
    // document.querySelector('.menuContent').classList.remove('dNone'); // OCULTAR EL FONDO
    document.querySelector('.instruction').classList.remove('dNone'); // OCULTAR EL FONDO
  }

  render() {
    const { multimedia } = this.props.dataPage;
    const { actualItem } = this.state;
    // console.log(this.state.countItem);
    return (
      <div className = 'ModalCircle1 d-Flex d-C'>
        {
          // MOSTRAR LOS GLOBOS DE TEXTO
          this.state.openGlobe !== false ?
          <div className = 'bgItemGlobe animated fadeIn'>
            <div className = { 'itemGlobe animated fadeIn d-Flex d-C j-C aI-S'} >

              <img alt = '' className = 'mB-2 mT-2' src = { multimedia[actualItem - 1].urlImgBtn }/>

              <h3 className = 'mB-1 color-13'>{ multimedia[actualItem - 1].itemInfo.title }</h3>

              <p className = 'mB-1' dangerouslySetInnerHTML = { { __html: multimedia[actualItem - 1].itemInfo.text1 } } />
              {
                multimedia[actualItem - 1].itemInfo.text2 &&
                <p className = 'c-75 enfasis-1' dangerouslySetInnerHTML = { { __html: multimedia[actualItem - 1].itemInfo.text2 } } />
              }

              <img alt = '' className = 'mB-2 j-C c-10' src = { multimedia[actualItem - 1].itemInfo.img2 }/>

              { 
                multimedia[actualItem - 1].itemInfo.buttonClose.closedModal === true ?
                <button
                  className = 'buttonClose'
                  onClick = { this.hideModal }
                  style = { { 'top': multimedia[actualItem - 1].itemInfo.buttonClose.posY, 'right': (multimedia[actualItem - 1].itemInfo.buttonClose.posX) } }
                  >
                  <span className = 'fa-layers fa-fw iconButton' >
                    <FontAwesomeIcon icon="circle" />
                    <FontAwesomeIcon icon="times" inverse transform="shrink-6" />
                  </span>
                </button> : null
              }
            </div>
          </div> : null
        }

        { this.showItems() }
      </div>
    );
  }
}

export default ModalCircle1;
