import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './InteractivePath1.scss';

library.add(fas, fab, far);

class InteractivePath1 extends Component {

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
          <button className = { 'circleButton ' + ( i + 1 !== 1 ? 'disabledGray' : '')} id = { i + 1 } onClick = { this.enableItem }>
            <img alt = '' className = '' id = { i + 1 } src = { item.urlImgBtn }/>
          </button>
        </div>
      );
    } );
    return ITEM;
  }

  enableItem = (e) => {
    const { multimedia } = this.props.dataPage;
    e.preventDefault();
    const IDITEM = e.target.id;
    let idItem = parseInt(IDITEM);
    // console.log(e.target);

    document.getElementById(idItem).classList.add('visited');
    document.querySelector('#itemGlobe-' + (idItem)).classList.remove('itemGlobeDisabled');
    if (document.querySelector('h4')) {
      document.querySelector('#itemGlobe-' + (idItem) + 'h4').classList.remove('hideText');
    }
    document.querySelector('#itemGlobe-' + (idItem) + ' p').classList.remove('hideText');

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
  }

  //FUNCION PARA CERRAR LA MODAL Y CAMBIAR EL STATE DE COVER style = {{ 'marginTop': 40, 'marginLeft': -480 }}
  hideModal = () => { this.showGlobe(); }

  render() {
    const { multimedia } = this.props.dataPage;

    const style = {
      backgroundImage: 'url(' + this.props.dataPage.background.bg + ')',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }

    return (
      <div className = 'InteractivePath1 mT-5 mL-6' style = {{ ...style }}>
        {
          multimedia.map((item, i) => {
            return(
              <div
              className = { 'itemGlobe animated fadeIn pAbs d-Flex d-C j-C aI-C mT-2 itemGlobeDisabled' }
              id = { 'itemGlobe-' + (i + 1) }
              key = { i }
              style = { { 'top': item.itemInfo.posGlobe.posY, 'left': item.itemInfo.posGlobe.posX, 'borderColor': item.itemInfo.color } }>
                {
                  item.itemInfo.title && <h2 className = 'mB-4 fw-2 mT-2 pT-6 c-20 hideText' dangerouslySetInnerHTML = {{ __html: item.itemInfo.title }}></h2>
                }
                {
                  item.itemInfo.text && <p className = 'fw-4 hideText' dangerouslySetInnerHTML = {{ __html: item.itemInfo.text }}></p>
                }
              </div>
            );
          })
        }
        { this.showItems() }
      </div>
    );
  }
}

export default InteractivePath1;


