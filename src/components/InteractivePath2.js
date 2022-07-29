import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './InteractivePath2.scss';

library.add(fas, fab, far);

class InteractivePath2 extends Component {
  state = {
    actualItem: 0,
    countItem: 0,
  }

  showInfo = e => {
    const { dataPage } = this.props;

    e.preventDefault();

    const IDITEM = e.target.id;

    let idItem = parseInt(IDITEM.substring(4));

    document.getElementById(IDITEM).classList.add('visited');

    console.log(dataPage.items.length);

    if (idItem <= dataPage.items.length - 1) {
      if (idItem !== this.state.actualItem) {
        this.setState({ actualItem : idItem });

        if (idItem !== dataPage.items.length - 1) {
          let nextItem = document.getElementById(idItem);
          nextItem.classList.remove('dNone');
          if (idItem === 1) {
            document.getElementById('btn-' + (idItem + 1)).classList.remove('dNone');
          }

          this.setState({ countItem: this.state.countItem + 1 });
        } else {
          let nextItem = document.getElementById(idItem);
          nextItem.classList.remove('dNone');
          this.setState({ countItem: this.state.countItem + 1 });
          this.props.isEnded(true); // SI LLEGA EL FINAL DE LA ACT ENVÍA EL TRUE
        }
      }
    }
  }

  render() {
    const { dataPage } = this.props;

    return(
      <div className = 'interactivePath2 d-Flex j-Bt aI-C'>
        {
          dataPage.items.map((item, i) => {
            return(
              <div className = 'boxInfo d-Flex j-C aI-C' key = { i } style = {{ 'borderColor': item.color }} >
                <div className = { 'info pL-1 pR-1 d-Flex d-C j-C aI-C animated fadeIn ' + (i !== 0 ? 'dNone' : '') } id = { i }>
                  
                <p className = 'tCenter' dangerouslySetInnerHTML = {{ __html: item.info }}></p>
                </div>
              </div>
            )
          })
        }

        <img
          alt = 'Item'
          className = { 'pAbs btnItem animated fadeIn'}
          id = { 'btn-1' }
          onClick = {this.showInfo}
          src = { 'img/7/bgPage-7.png' }
          style = { { 'top': 65, 'left': 240 } }
         />
         
      </div>
    )
  }

}

export default InteractivePath2;