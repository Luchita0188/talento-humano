import React, {Component} from 'react';
import Content from './sections/Content';

// SCORM
import Tracking from './SCORM/Trackin';
import SCORMLib from './SCORM/scormLib';

// ESTILOS
import './App.scss';

// DATOS
import DataCourse from './data/data.json';

// DEFINICION DEL LIMITE CON LA CANTIDAD DE OBJETOS QUE HAY EN DataCourse
// SE RESTAN 1 al LIMIT PARA SACAR EL BACK COVER QUE ES UNA MODAL DE FINALIZACION
const LIMIT = Object.keys(DataCourse).length - 1;
const UNITS = DataCourse.coverPage.units;
const LABELFOOTER = DataCourse.coverPage.footer.label;
const BGFOOTER = DataCourse.coverPage.footer.bgImgs;
const LOGOFOOTER = DataCourse.coverPage.logoFooter;

const tracking = new Tracking(new SCORMLib(), LIMIT);

//// FUNCION PARA HACER EL CÁLCULO DEL TIEMPO DE CADA SESIÓN ////

const timeSession = new Date();
// console.log('Hora inicial de la sesión: ' + timeSession.toLocaleTimeString());

const setTimeSession = () => {
  let endTime, hours, minutes, seconds, duration, timeToSCO;

  endTime = new Date();

  duration = (endTime.getTime() - timeSession);

  hours = parseInt((duration /(1000 * 60 * 60)) % 24);
  minutes = parseInt((duration / (1000 * 60)) % 60);
  seconds = parseInt((duration / 1000) % 60);

  timeToSCO = (hours < 10 ? ( '000' + hours ) : ('00' + hours)) + ":" + (minutes < 10 ? ( '0' + minutes ) : (minutes)) + ":" + (seconds < 10 ? ( '0' + seconds ) : (seconds));

  // console.log('Hora formateada para guardar en SCORM');
  // console.log(timeToSCO);

  tracking._setSessionTime(timeToSCO);
}

class App extends Component {
  constructor(props) {
   super(props);
    this.state = {
      calificacion: 0,
      conectLMS: false,
      index: 16,
      nextUnit: 1,
      pages: LIMIT,
      units: UNITS,
      unitActual: 0,
      unitFinal: [true],
      enableUnit: [true],
      // endActivities debe ir en FALSE para permitir las restricciones, en TRUE para editar
      // endActivities: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
      endActivities: [false, false, true, false, true, false, false, false, true, false, false, false, false, false, false, false, false, true]
  }
  }

  // METODOS DEL SCORM CUANDO SE EJECUTA EL CURSO
  componentDidMount() {
    tracking._setLessonStatus("incomplete");

    ///////////////////////////////////////////////////////////
    // CARGA SUSPEND DATA CUANDO HAY INFORMACIÓN Y SE MONTA EL CURSO

    if (tracking._getSuspendData() !== "") {

      // SEPARA LOS DIFERENTES TIPOS DE DATOS POR #
      let arrayInfoSuspend = tracking._getSuspendData().split('#');

      // console.log('Array separado por #');
      // console.log(arrayInfoSuspend);

      // SEPARO CADA ELEMENTO DEL ARRAY EN UN NUEVO ARRAY HIJO
      for (var i = 0; i < arrayInfoSuspend.length; i++) {
        arrayInfoSuspend[i] = arrayInfoSuspend[i].split(',');
      }

      // console.log('Array hijos separados por ,');
      // console.log(arrayInfoSuspend);

      // CONVIERTO LOS TRES PRIMEROS ELEMENTOS DEL ARRAY EN INT
      for (var j = 0; j < 3; j++) {
        arrayInfoSuspend[j] = parseInt(arrayInfoSuspend[j]);
      }

      // console.log('Elementos de NUMBER hijos convertidos a INT');
      // console.log(arrayInfoSuspend);

      // PASO AL STATE LOS DOS PRIMEROS ELEMENTOS QUE SON INT
      this.setState({
        index: arrayInfoSuspend[0],
        unitActual: arrayInfoSuspend[1],
        nextUnit: arrayInfoSuspend[2]
      });

      // CONVIERTO CADA ELEMENTO EN UN BOOLEANO
      for (var k = 3; k < 6; k++) {
        for (var l = 0; l < arrayInfoSuspend[k].length; l++) {
          arrayInfoSuspend[k][l] = (arrayInfoSuspend[k][l] === "true");
        }
      }

      // console.log('Elementos de Array hijos convertidos a Bool');
      // console.log(arrayInfoSuspend);

      // PASO AL STATE LOS TRES ULTIMOS ELEMENTOS QUE SON ARRAY CON BOOLEANOS
      this.setState({
        unitFinal: arrayInfoSuspend[3],
        enableUnit: arrayInfoSuspend[4],
        endActivities: arrayInfoSuspend[5]
      });
    }
  }

  ///////////////////////////////////////////////////////////
  // Calificación INVOCADA CUANDO SE COMPLETAN ACTIVIDADES O SE AVANZA DE PAGINA

  setScore = (raw) => {
    console.log('Recibo: ' + raw);
    console.log('Calificación en el estado: ' + this.state.calificacion);

    this.setState({
      calificacion: raw
    });

    //SCORM
    tracking._scoreSet(raw);
    // tracking.closeCourse(); // CUANDO SE COMPLETA INVOCA LA FINALAZACION EN EL SCORM
    this.setSuspend();
  }

  ///////////////////////////////////////////////////////////
  // ENVÍO DE DATOS AL SUSPEND DATA

  setSuspend = () => {
    const { index, unitActual, nextUnit, unitFinal, enableUnit, endActivities } = this.state;

    let dataConcat = index + "#" + unitActual + "#" + nextUnit + "#" + unitFinal + "#" + enableUnit + "#" + endActivities;

    // console.log('Información concatenada: ' + dataConcat);

    tracking._setSuspendData(dataConcat);
  }

  //////////////////////////////////////////////////////////

  // METODO DE SEGUIMIENTO - SOLO DE VISUALIZACIÓN
  _stateCourse() {
    console.clear();
    const messageState = ` SEGUIMIENTO DEL CURSO
    - Calificación:          -> ${this.state.calificacion}
    - Conectado a un LMS     -> ${this.state.conectLMS}
    - Index                  -> ${this.state.index}
    - LIMIT                  -> ${this.state.pages}
    - Páginas                -> ${this.state.pages}
    - Siguiente Unidad       -> ${this.state.nextUnit}
    - Unidades o Temas       -> ${this.state.units}
    - Unidad Actual          -> ${this.state.unitActual} `;
    console.log(messageState);
    console.log(this.state.endActivities);
    console.log();
  }

  // FUNCION PARA ACTUALIZAR EL INDEX Y NAVEGAR RECIBE PARAMETRO DE FOOTER EL ID DEL BOTON
  navigationCourse = (buttonPress) => {
     //console.log('Recibo en App.js: ' + buttonPress);
    //SCORM
    if (this.state.index < 0) {
      this.setState({index: 0})
    }

    switch (buttonPress) {
      // BOTONES ANTERIOR Y SIGUIENTE
      case 'btnNavLeft':
        this.setState({
          index: this.state.index - 1
        });
        tracking.saveLocation(this.state.index);
        break;

      case 'btnNavRight':
        this.setState({
          index: this.state.index + 1
        });
        tracking.saveLocation(this.state.index);
        break;

      // DROP PARA COMENZAR EL CURSO
      case 'btnIniciar':
        this.setState({
          index: this.state.index +1
        });
        tracking.saveLocation(this.state.index);
        break;

      // VALIDACIONES DEL BOTON INICIO INSTRUCTION
      case 'btnInstruction':
        this.setState({
          index: 2
        });
        tracking.saveLocation(this.state.index);
        break;

      // INICIO DEL QUIZ
      case 'btnQuiz':
        this.setState({
          index: 16
        });
        tracking.saveLocation(this.state.index);
        break;

      // FINAL DEL QUIZ
      case 'buttonCloseQuizModal':
        this.setState({
          index: 17
        });
        tracking.saveLocation(this.state.index);
        break;
    
      default:
        this.setState({
          index: 0
        });
        tracking.saveLocation(this.state.index);
    }
  }

  // FUNCION PARA IR AL TEMA AL PRESIONAR LOS BOTONES "IR AL TEMA"
  goToPage = (goPage) => {
    this.setState({index: goPage});
  }

  // ACTUALIZAR EL ACTUALUNIT
  updateActualUnit = (unit) => {
    const UNIT = parseInt(unit);

    // GUARDA EL SUSPEND DATA CADA QUE SE HACE UN AVACE EN EL CURSO o UNA MODIFICACION
    this.setSuspend();

    if (UNIT !== this.state.unitActual) {
      this.setState({unitActual: UNIT});
    }
  }

  // ACUTALIZAR NEXTUNIT
  updateNextUnit = (nextUnit) => {
    // GUARDA EL SUSPEND DATA CADA QUE SE HACE UN AVACE EN EL CURSO o UNA MODIFICACION
    this.setSuspend();

    if (nextUnit !== this.state.nextUnit) {
      this.setState({ nextUnit: nextUnit })
    }
  }

  // MARCAR CADA UNIDAD COMO FINALIZADA
  checkEndUnit = (idUnit) => {
    // console.log('Unidad: ' + idUnit);
    let checkArray = this.state.unitFinal;
    checkArray[idUnit] = true;
    this.setState({unitFinal: checkArray})
    // console.log(this.state.unitFinal);

    // GUARDA EL SUSPEND DATA CADA QUE SE HACE UN AVACE EN EL CURSO o UNA MODIFICACION
    this.setSuspend();
  }

  // HABILITAR LA SIGUIENTE UNIDAD
  checkEnabledUnit = (idUnit) => {
    // console.log('Unidad: ' + idUnit);
    let enabledArray = this.state.enableUnit;
    enabledArray[idUnit] = true;
    this.setState({enableUnit: enabledArray})
    // console.log(this.state.enableUnit);

    // console.log(this.state.unitActual); // UNIDAD ACTUAL

    // GUARDA EL SUSPEND DATA CADA QUE SE HACE UN AVACE EN EL CURSO o UNA MODIFICACION
    this.setSuspend();
  }

  // HABILITAR LA NAVEGACION LUEGO DE HACER LAS ACTIVIDADES
  checkEndActivity = (idActivity, actEnd) => {
    let nActivityArray = this.state.endActivities;
    nActivityArray[idActivity] = actEnd;
    this.setState({endActivities: nActivityArray})
    // console.log(this.state.endActivities);

    const {index} = this.state;
    if (index !== 1 && index !== 16 && index !== 17) {
      document.getElementById('btnNavRight').classList.add('animationBtnNav');
    }

    // GUARDA EL SUSPEND DATA CADA QUE SE HACE UN AVACE EN EL CURSO o UNA MODIFICACION
    this.setSuspend();
  }

  render() {
    const { index, unitActual, nextUnit, unitFinal, enableUnit, endActivities } = this.state;

    return (
      // CUERPO PRINCIPAL DE LA APP
      <div className = 'App mT-1' > {/* SEGUIMIENTO */}

        { this._stateCourse() }

        {/* CARGA DEL COMPONENTE CONTENT */}
        <Content
          actualIndex         = { index }
          bgFooter            = { BGFOOTER }
          calificacion        = { this.state.calificacion }
          checkEndActivity    = { this.checkEndActivity }
          checkEndUnit        = { this.checkEndUnit }
          checkEnabledUnit    = { this.checkEnabledUnit }
          clickNavigation     = { this.navigationCourse }
          data                = { DataCourse }
          enableUnit          = { enableUnit }
          endActivities       = { endActivities }
          goToPage            = { this.goToPage }
          imageFooter         = { LOGOFOOTER }
          labelFooter         = { LABELFOOTER }
          limitNavigation     = { LIMIT }
          nextUnit            = { nextUnit }
          setScore            = { this.setScore }
          unitActual          = { unitActual }
          unitFinal           = { unitFinal }
          updateActualUnit    = { this.updateActualUnit }
          updateNextUnit      = { this.updateNextUnit } />
      </div>
    );
  }
}

window.addEventListener('beforeunload', () => {
  // AQUI TAMBIÉN DEBE IR EL SUSPEND DATA PARA GUARDAR LA INFORMACIÓN
  setTimeSession();
  tracking.exit(); // GUARADADO DE LA INFORMACION AL CERRAR EL PAQUETE
})

export default App;
