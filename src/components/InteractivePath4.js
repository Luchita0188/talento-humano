import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './InteractivePath4.scss';

library.add(fas, fab, far);

class InteractivePath4 extends Component {

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
    const ITEM = dataPage.multimedia.map( (item, i) => {
      return(
        <div className = 'circleItems' key = { i } style = { { 'top': item.pos.top, 'left': item.pos.left } }>
          <button className = { 'circleButton ' + ( i !== 0 ? 'disabledGray' : '')} id = { i } onClick = { this.enableItem }>
            <img alt = '' className = '' id = { i } src = { item.urlImgBtn }/>
          </button>
        </div>
      );
    } );
    return ITEM;
  }

  enableItem = (e) => {
    const { multimedia } = this.props.dataPage;
    e.preventDefault();
    const IDITEM = e.currentTarget.id;
    let idItem = parseInt(IDITEM);

    this.setState({ actualItem : idItem });

    if (idItem < multimedia.length - 1) {

      // console.log('Menor');

      let nextItem = document.getElementById(idItem + 1);
      nextItem.classList.remove('disabledGray');
      
      this.setState({ countItem: this.state.countItem + 1 });
    } else {
      

      this.setState({ countItem: this.state.countItem + 1 });
      this.props.isEnded(true); // SI LLEGA EL FINAL DE LA ACT ENVÍA EL TRUE
    }

    if (this.state.countItem === multimedia.length - 1) {
      this.setState({ countItem: multimedia.length });
    }

    this.showGlobe();
  }

  showGlobe = () => {
    this.setState({
      openGlobe: !this.state.openGlobe
    });
  }

  //FUNCION PARA CERRAR LA MODAL Y CAMBIAR EL STATE DE COVER style = {{ 'marginTop': 40, 'marginLeft': -480 }}
  hideModal = () => { this.showGlobe(); }

  render() {
    const { multimedia } = this.props.dataPage;
    const { actualItem } = this.state;

    const style = {
      backgroundImage: 'url(' + this.props.dataPage.background.bg + ')',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    // console.log(this.state.countItem);
    return (
      <div className = 'InteractivePath4 ' style = {{ ...style }}>
        { this.showItems() }
        {
          // MOSTRAR LOS GLOBOS DE TEXTO
          this.state.openGlobe !== false ?
          <div className = 'bgItemGlobe'>
            <div
              className = { 'itemGlobe dF-C-cs  animated fadeInDown ' + multimedia[actualItem ].itemInfo.trian } style = {{'borderColor': multimedia[actualItem].itemInfo.color, 'top': multimedia[actualItem].itemInfo.posGlobe.posY, 'left': multimedia[actualItem].itemInfo.posGlobe.posX }}>
             {
             multimedia[actualItem].itemInfo.title ? <h4 className = 'mB-05 mL-025 F2' dangerouslySetInnerHTML = {{ __html: multimedia[actualItem].itemInfo.title }}></h4> : null
             
             }
              {
                multimedia[actualItem].itemInfo.text ? <p className = 'mB-1 fw-4 #5C657C' dangerouslySetInnerHTML = {{ __html: multimedia[actualItem].itemInfo.text }}></p> : null
              }

              <button
                className = 'buttonClose'
                onClick = { this.hideModal }
                >
                <span className = 'fa-layers fa-fw iconButton' >
                  <FontAwesomeIcon icon="circle" />
                  <FontAwesomeIcon icon="times" inverse transform="shrink-6" />
                </span>
                </button>
            </div>
          </div> : null
        }
      </div>
    );
  }
}

export default InteractivePath4;


