import React, { Component } from "react";
import './Pairing.scss';

class Pairing extends Component {

  constructor(props) {
  super(props);
  this.state = {
    count: 1,
    countCorrect: 0,
    _color: "#FFFFFF",
    _isDraw: false,
    _showFeed: false
}

  this._canvas = null;
  this._root = null;
  this._ctx = null;
  this.draw = this.draw.bind(this);
  this.select = this.select.bind(this);
  this.deselect = this.deselect.bind(this);
  this._x = this._y = 0;
  this._count = 0;
  this._max = 0;
  this._snap = null;
  this._current = null;
}

componentDidMount() {
  const { multimedia } = this.props;
  this._canvas = this.refs["lienzo"];
  this._root = this._canvas.parentNode.parentNode;
  this._canvas.width = this._canvas.offsetWidth;
  this._canvas.height = this._canvas.offsetHeight;
  this._ctx = this._canvas.getContext('2d');
  this._max = multimedia.questions[4].lbl.label.length;
  console.log("pair Máximo: " + this._max);
}

draw(ev) {
  if(!this.state._isDraw) return;
  this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  this.drawLine(ev);
}

drawLine(ev) {
  this._ctx.putImageData(this._snap, 0, 0);
  let client = this._canvas.getBoundingClientRect();
  this._ctx.beginPath();
  this._ctx.moveTo(1, this._y);
  this._ctx.lineTo(ev.pageX - client.left, ev.pageY - client.top);
  this._ctx.strokeStyle = this.state._color;
  this._ctx.stroke();
}

//////////////////////////////////

select(ev) {
  console.log("Clic en la columna A");
    console.log(ev.target);
    if(ev.target.classList.contains("lock")) return;

    if(this.state._isDraw) {
      this.resetCanvas();
    }

    this._current = ev.target; // Current columna A
    this._current.style.background = this._current.dataset.color;

    let client = this._canvas.getBoundingClientRect();
    this._x = ev.pageX - client.left;
    this._y = ev.pageY - client.top;
    this.setState({_isDraw: true, _color:this._current.dataset.color});
    this._snap = this._ctx.getImageData(0,0, this._ctx.canvas.width, this._ctx.canvas.height);
}

//////////////////////////////////

deselect(ev) {
  this._x = this._y = 0;
  console.log("Clic en la columna B");
  console.log(ev.target);

  // let isFinish = false;
  if (!this.state._isDraw) {
    return
  }

  // this.resetCanvas();

  this.setupAdvance(ev.target, this._current.id);

  this.setState({_isDraw: false});
}

resetCanvas() {
  this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
}

//////// cambio de color en las opciones cuando se seleccionan las correctas

setupAdvance( tg, dtg ){
  console.log("Recibido columna B: " + tg.dataset.pair);
  console.log("Recibido columna A: " + dtg);
  let targetOptionParent=null
  let targetSelectParent =null;
  // let countPair = 0;


  tg.style.background=this.state._color;
  targetOptionParent = tg.parentNode.querySelector(".box-rounded");
  // targetOptionParent.style.background=this.state._color;
  // targetOptionParent.querySelector(".p-o").style.color = "white";
  targetOptionParent.classList.remove("border")

  targetSelectParent = this._current.parentNode.querySelector(".box-rounded");
  // targetSelectParent.style.background=this.state._color;
  // targetSelectParent.querySelector(".p-o").style.color = "white";
  targetSelectParent.classList.remove("border")

  this._current.classList.add("lock");
  this._count++;

  if (dtg === tg.dataset.pair) {
    if (this.state.countCorrectPairing === 0) {
      console.log("primera pareja");
      this.state.countCorrectPairing = 1
      // this.setState({ countCorrectPairing: countPair })
    } else {
      console.log("otras parejas");
      this.state.countCorrectPairing = this.state.countCorrectPairing + 1
      // this.setState({ countCorrectPairing: this.state.countCorrectPairing + 1 })
    }

    console.log("Empajeradas buenas: " + this.state.countCorrectPairing);
  }

  
    // SI ES EL MAXIMO ES PORQUE TERMINÓ
    if(this._count === this._max) {
      console.log(this._max);
      let button = document.getElementById('btnNextQuiz');
      button.classList.remove('disabled');
      if (this.state.countCorrectPairing === this._max) {
        this.setState({ countCorrect: this.state.countCorrect + 1 }); // contador de las preguntas correctas y conteo de seguimiento
        console.log("Se suma un punto");
      } else {
        console.log("Parejas buenas: " + this.state.countCorrectPairing);
        let puntoParcial = (this.state.countCorrectPairing * 1) / this._max;
        this.setState({ countCorrect: this.state.countCorrect + puntoParcial });
        console.log("Punto Parcial: " + puntoParcial);
        console.log("Suma Completa: " + (this.state.countCorrect + puntoParcial));
        console.log("Se suma una decima");
      }

    }
  }

render(){
  const { multimedia } = this.props;
  return(
    <div  className="pairin-cont dF-R-bc mL-3 mR-3">
      <div className="colum-1">
        {
          multimedia.labels.map((label, i) => {
            return(
              <div key = {label.p} className="option-cont dF-R-cc">
                <div className="p boxInfo border"> <p className="p-o">{label.p}</p></div>
                <div className="point mL-05" id = {label.pair} onClick={this.select}></div>
              </div>
            )
          })
        }
      </div>
      <canvas ref="lienzo"  id="lienzo" onMouseMove={this.draw}></canvas>
      <div className="colum-2">
        {
          multimedia.text.map((label, ix) => {
            return(
              <div key={label.p} className="option-cont dF-R-cc">
                <div className="point mR-05" data-pair={label.pair} onClick={this.deselect}></div>
                <div className="p boxInfo border"  ><p className="p-o">{label.p}</p></div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
}

export default Pairing;
