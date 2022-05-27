import React, { Component } from 'react';
import { FontAwesomeIcon } from'@fortawesome/react-fontawesome';

// IMPORT FONT AWESOME LIBRARY
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './Footer.scss';

// CREATING LIBRARY ICONS
library.add(fas, fab, far);

class Footer extends Component {

  // ENVIO DE ID PARA NAVEGAR EL CURSO
  navigationCourse = e => {
    const { actualIndex } = this.props;
    e.preventDefault();
    if (e.target.id === 'btnNavRight') {
      //console.log(actualIndex);

      document.getElementById('btnNavRight').classList.remove('animationBtnNav');

      this.props.clickNavigation(e.target.id);
    } else {
      this.props.clickNavigation(e.target.id);
    }
  }

  // MOSTRAR EL LOGO CUANDO NO ESTÁ EN LA PÁGINA 1
  showLogo = () => {
    const { actualIndex, imageFooter } = this.props;

    if (actualIndex !== 0) {
      return(
        <img
          alt=''
          className='imageFooter'
          src={ imageFooter }/>
      );
    } else {
      return null;
    }
  }

  // MOSTRAR EL MENU DE NAVEGACIÓN Y BLOQUEAR LOS BOTONES DEPENDIENDO DE LA PAGINA
  showNavigation = () => {
    const { actualIndex, limitNavigation, data } = this.props;

    if (actualIndex !== 0) {
      return (
        <div className='buttonPannel'>
          <button
            className = { 'buttonNav ' + (actualIndex === 1 || actualIndex === 16 ? 'disabled': '') }
            id = 'btnNavLeft'
            onClick = { this.navigationCourse }>
            <FontAwesomeIcon
              className = 'iconButton'
              icon = { ['fas', 'arrow-left'] }
              size = '2x' />
          </button>

            <button
            className = { 'buttonNav ' + (actualIndex === limitNavigation || Object.values(data)[actualIndex].endCourse === true ? 'disabled': '') + (actualIndex === 1 || actualIndex === 15 || actualIndex === 16
            || actualIndex === 17 ? 'disabled': '') }
            id = 'btnNavRight'
            onClick = { this.navigationCourse }>
            <FontAwesomeIcon
              className = 'iconButton'
              icon = { ['fas', 'arrow-right'] }
              size = '2x' />
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  showLabel = () => {
    const { actualIndex, labelFooter } = this.props;

    if (actualIndex !== 0) {
      return(
        <h3 className = 'labelFooter fw-7' dangerouslySetInnerHTML = {{ __html: labelFooter }}></h3>
      );
    }
  }

  showPage = () => {
    const { actualIndex } = this.props;
    if (actualIndex !== 0) {
      return(
        <h2 className = 'numberPage fw-7 azul'>{ ((actualIndex) <= 9 ? '0' + (actualIndex) : (actualIndex)) }/17</h2>
      );
    }
  }

  // { this.showPage() }

  render() {
    const { actualIndex, endActivities } = this.props;
    // console.log(endActivities);

    return (
      <div className = { (actualIndex === 0 || actualIndex === 17 ? 'footer-desc' : 'footer') + ' d-Flex j-S aI-C' }>

        { this.showLogo() }
        { this.showLabel() }
        { this.showNavigation() }
        { this.showPage() }
        <div className = { 'restrict' + ((endActivities[actualIndex]) === true ? 'dNone' : '') } />
      </div>
    );
  }
}
export default Footer;
