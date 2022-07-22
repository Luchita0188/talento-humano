import React, { Component } from 'react';
import ItemInteractiveAudio from '../components/ItemInteractiveSubtitle';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './InteractiveSubtitle.scss';

library.add(fas, fab, far);

class InteractiveAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }
   makeItems = () => {
  return (
     <ItemInteractiveAudio dataItem = { this.props.dataPage.layers } time = { this.state.time } />
   )
  }

  render() {
    const { dataPage } = this.props;
    // console.log('play: ' + this.state.play);
    // console.log('mute: ' + this.state.mute);
    // console.log('ended: ' + this.state.ended);
    return (
      <div className = {'areaItems'}>
      { //areaItems
        this.makeItems()
      } 
        </div> 
    );
  }
}

export default InteractiveAudio;
