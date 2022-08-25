import React, { Component } from 'react';
import './Pairing.scss';

export default class Pairing extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this._canvas = this.refs["lienzo"];
    this._root = this._canvas.parentNode.parentNode;
    this._canvas.width = this._canvas.offsetWidth;
    this._canvas.height = this._canvas.offsetHeight;
    this._ctx = this._canvas.getContext('2d');
    this._max = this.props.dataPage.multimedia.content.labels.length;
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
    if(ev.target.classList.contains("lock")) return;

    if(this.state._isDraw) {
      this.resetCanvas();
    }

    this._current = ev.target;
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
    // let isFinish = false;

    if(this._current.id !== ev.target.dataset.pair) {
      this.resetCanvas();
      this._ctx.putImageData(this._snap, 0,0);
      this._current.style.background = "white";
    } else {
      this.setupAdvance(ev.target);
    }

    this.setState({_isDraw: false});
  }

  resetCanvas() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }

  //////// cambio de color en las opciones cuando se seleccionan las correctas

  setupAdvance( tg ){
    let targetOptionParent=null
    let targetSelectParent =null;

    tg.style.background=this.state._color;
    targetOptionParent = tg.parentNode.querySelector(".boxInfo");
    targetOptionParent.style.background=this.state._color;
    targetOptionParent.querySelector(".p-o").style.color = "white";
    targetOptionParent.classList.remove("border")

    targetSelectParent = this._current.parentNode.querySelector(".boxInfo");
    targetSelectParent.style.background=this.state._color;
    targetSelectParent.querySelector(".p-o").style.color = "white";
    targetSelectParent.classList.remove("border")

    this._current.classList.add("lock");
    this._count++;

    // console.log(this._count, this._max);

    if(this._count === this._max && this.props.endFunc) {
      this.props.endFunc();
    }

    if(this._count === this._max) {
      this.props.isEnded(true);
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  render(){
    const { content } = this.props.dataPage.multimedia;
    return(
      <div  className="pairin-cont dF-R-bc mL-3 mR-3">
        <div className="colum-1">
          {
            content.labels.map((el, ix) => {
              return(
                <div key={ix} className="option-cont dF-R-cc">
                  <div className="p boxInfo border"><p className="p-o">{el.p}</p></div>
                  <div className="point mL-05" id={el.pair} data-color={content.colors[ix]} onClick={this.select}></div>
                </div>
              )
            })
          }
        </div>
        <canvas ref="lienzo"  id="lienzo" onMouseMove={this.draw}></canvas>
        <div className="colum-2">
          {
            content.texts.map((el, ix) => {
              return(
                <div key={ix} className="option-cont dF-R-cc">
                  <div className="point mR-05" data-pair={el.pair} onClick={this.deselect}></div>
                  <div className="p boxInfo border"  ><p className="p-o">{el.p}</p></div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
