import React, { Component } from "react";
import DnDCircle3 from "../../components/DnDCircle3/DnDCircle3";
import DnDLabel2 from "../../components/DnDLabel2/DnDLabel2";
import DnDLabel1 from "../../components/DnDLabel1/DnDLabel1";
import DnDIcon1 from "../../components/DnDIcon1/DnDIcon1";
import DnDSwipe1 from "../../components/DnDSwipe1/DnDSwipe1";
import DraggableWords from "../../components/DraggableWords/DraggableWords";
import DraggableFV from "../../components/DraggableFV/DraggableFV";
import Instruction from "../../components/Instruction";
import InteractiveTimeLine from "../../components/InteractiveTimeLine";
import InteractiveFlip1 from "../../components/InteractiveFlip1";
import InteractivePath1 from "../../components/InteractivePath1";
import InteractivePath2 from "../../components/InteractivePath2";
import InteractivePath4 from "../../components/InteractivePath4";
import InteractivePath5 from "../../components/InteractivePath5";
import InteractiveSubtitle from "../../components/InteractiveSubtitle";
import InteractiveSubtitle2 from "../../components/InteractiveSubtitle2";
import ModalInfo5 from "../../components/ModalInfo5";
import ModalInfo7 from "../../components/ModalInfo7";
import ModalCircle1 from "../../components/ModalCircle1";
import ModalCircle2 from "../../components/ModalCircle2";
import ModalCircle3 from "../../components/ModalCircle3";
import ModalCircle4 from "../../components/ModalCircle4";
import ModalVideo1 from "../../components/ModalVideo1";
import ModalGallery2 from "../../components/ModalGallery2";
import ModalGallery1 from "../../components/ModalGallery1";
import Quiz1 from "../../components/Quiz1";
import SlideDot1 from "../../components/SlideDot1";
import SlideLR1 from "../../components/SlideLR1";
import SlideLR2 from "../../components/SlideLR2";
import SlideUpDown from "../../components/SlideUpDown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// IMPORT FONT AWESOME LIBRARY
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import "./Pages.scss";

class Cover extends Component {
  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y EMPEZAR EL CURSO
  startCourse = (e) => {
    const target = e.currentTarget.id;

    this.props.startCourse(target);
  };

  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: "url(" + dataPage.background.bg + ")",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    const styleBtn = {
      backgroundImage: "url(" + dataPage.background.bgBtn + ")",
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100px",
      height: "44px",
    };

    return (
      <div className={dataPage.type + " pL-4 animated fadeIn"} style={style}>
        <div className="c-7 dF-C-cs">
          {dataPage.logoCourse && (
            <img
              alt="Imagen Corporativa"
              className="imageLogo mT-2 mB-2"
              src={dataPage.logoCourse}
            />
          )}
          {dataPage.title && (
            <h1
              className="mT-1 mB-1 F3"
              dangerouslySetInnerHTML={{ __html: dataPage.title }}
            ></h1>
          )}
          {dataPage.subTitle && (
            <h3
              className="mB-1 pB-05"
              dangerouslySetInnerHTML={{ __html: dataPage.subTitle }}
            ></h3>
          )}
          {dataPage.module && (
            <h3
              className="mB-1 mR-4"
              dangerouslySetInnerHTML={{ __html: dataPage.module }}
            ></h3>
          )}
          {dataPage.courseName && (
            <p
              className="mB-2 mR-2 texto2 fw-4"
              dangerouslySetInnerHTML={{ __html: dataPage.courseName }}
            ></p>
          )}

          <button
            className="buttonQuiz pL-3 pR-5"
            onClick={this.startCourse}
            id={"btnIniciar"}
            style={styleBtn}
          >
            Iniciar
          </button>
        </div>
      </div>
    );
  }
}

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 0,
      showModal: true,
    };
  }

  componentDidMount() {
    document.querySelector(".footer").classList.add("dNone"); // OCULTAR EL FONDO
  }

  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y EMPEZAR EL CURSO
  startCourse = (e) => {
    e.preventDefault();
    this.props.startCourse(e.target.id);
  };

  // MOSTRAR ITEM
  showItem = (e) => {
    e.preventDefault();

    let numId = parseInt(e.target.id.substring(12, 13));

    this.setState({
      item: numId,
    });
  };

  // OCULTAR MODAL
  hideModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });

    document.querySelector(".footer").classList.remove("dNone");
  };

  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: "url(" + dataPage.resources.bg + ")",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: 430,
    };

    return (
      <div className={"pageContent"}>
        {this.state.showModal ? (
          <div className="modalInstruction">
            <div className="bgCircle dF-R-cc showModal">
              <div className="boxInfo d-C d-Flex j-C aI-C pT-2 pB-2 pL-2 pR-2">
                <hr className="mB-1 line-5"></hr>
                <p className="tCenter blanco mB-1">
                  Antes de iniciar, te invitamos a hacer el recorrido de
                  navegación dando clic en el siguiente botón.
                </p>
                <button className="buttonClose blanco" onClick={this.hideModal}>
                  Instructivo
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="c-10 animated fadeIn">
          <div className="c-5 mB-2">
            <h1
              className="mT-4 mL-5 titulo2"
              dangerouslySetInnerHTML={{ __html: dataPage.title }}
            ></h1>
          </div>

          <div
            className="c-10 d-Flex d-C j-E aI-C"
            style={{
              ...style,
              paddingTop: 40,
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 40,
            }}
          >
            <div className="boxContent d-Flex d-C j-C aI-C pT-1">
              {this.state.item !== dataPage.information.length - 1 ? (
                dataPage.information.map((item, i) => {
                  return (
                    <div
                      className={
                        "d-Flex d-C j-C aI-C animated fadeIn " +
                        (this.state.item === i ? "" : "dNone")
                      }
                      key={i}
                    >
                      {item.img1 ? (
                        <img alt="Imagen" className="mB-1" src={item.img1} />
                      ) : null}
                      {item.text1 ? (
                        <p
                          className="tCenter c-7 mB-025"
                          dangerouslySetInnerHTML={{ __html: item.text1 }}
                        ></p>
                      ) : null}
                      {item.img2 ? (
                        <img alt="Imagen" className="mB-025" src={item.img2} />
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <div className={"c-10 d-Flex j-C aI-C"}>
                  <button
                    className="buttonStart"
                    id="btnInstruction"
                    onClick={this.startCourse}
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>
            <div className="buttonBoxInst d-Flex j-C aI-C">
              {dataPage.information.map((button, i) => {
                return (
                  <div
                    className={
                      "btnItemInst " +
                      (this.state.item === i ? "btnActive" : "")
                    }
                    id={"btnItemInst-" + i}
                    key={i}
                    onClick={this.showItem}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>

        <Instruction dataPage={dataPage.instruction} />
      </div>
    );
  }
}

class Page2 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(2, end);
  };
  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent animated fadeIn"}>
        <div className="c-10">
          <div className="mL-5 mT-6">
            <img
              alt="Imagen"
              className="imageNPC pAbs"
              src={dataPage.resources.img1}
            />
            {dataPage.title ? (
              <h1
                className="c-7 mB-05 F3"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h1>
            ) : null}
            {dataPage.text ? (
              <p
                className="c-55 mB-2 fw-4"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

class Page3 extends Component {
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(3, end);
  };
  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: "url(" + dataPage.background.bg + ")",
      backgroundSize: "auto",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "380px",
    };

    return (
      <div className={"pageContent"}>
        <div className="c-10 animated fadeIn">
          <div className="c-10 animated fadeIn d-Flex d-C j-C mL-40 mT-4">
            <div className="mL-5 c-35">
              {dataPage.title ? (
                <h2
                  className="mB-1 F2"
                  dangerouslySetInnerHTML={{ __html: dataPage.title }}
                ></h2>
              ) : null}
              {dataPage.text ? (
                <p
                  className="mB-1 fw-4"
                  dangerouslySetInnerHTML={{ __html: dataPage.text }}
                ></p>
              ) : null}
            </div>
            <div className="c-75 d-Flex j-C aI-S" style={style}>
              <ModalCircle2 dataPage={dataPage} isEnded={this.isEnded} />
            </div>
          </div>
        </div>

        <Instruction dataPage={dataPage.instruction} />
      </div>
    );
  }
}

class Page4 extends Component {
  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        <div className="c-10 d-Flex  animated fadeIn j-C aI-S">
          <div className="mL-5 c-35 mT-6 mR-3">
            {dataPage.title ? (
              <h2
                className="textHeader F2 mB-1 pT-2"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h2>
            ) : null}
            {dataPage.text ? (
              <p
                className="mB-2 fw-4"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            ) : null}
          </div>

          <div className="c-5 d-Flex j-C aI-S mT-7 pT-2">
            <img alt="Imagen" className="" src={dataPage.img} />
          </div>
        </div>
      </div>
    );
  }
}

class Page5 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(5, end);
  };
  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        <div className="c-10 animated fadeIn d-Flex d-C aI-S pT-3 mL-20">
          <div className="headerTitle mL-7 mR-2">
            {dataPage.title ? (
              <h2
                className="F2 mB-2"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h2>
            ) : null}
            {dataPage.text ? (
              <p
                className="mB-5 fw-7"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            ) : null}
          </div>

          <div className="c-3 d-Flex j-C aI-S mL-2">
            <InteractivePath4 dataPage={dataPage} isEnded={this.isEnded} />
          </div>

          <Instruction dataPage={dataPage.instruction} />
        </div>
      </div>
    );
  }
}

class Page6 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(6, end);
  };
  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        <div className="c-10 animated fadeIn d-Flex d-C j-C aI-S">
          <div className="headerTitle c-75 d-Flex d-C j-C aI-S mL-5 mT-7">
            {dataPage.title ? (
              <h2
                className="mB-1 fw-5 F2"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h2>
            ) : null}
            {dataPage.text ? (
              <p
                className="mB-1 fw-4"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            ) : null}
          </div>
          <div className="mL-6">
            <DnDLabel1
              multimedia={dataPage.multimedia}
              isEnded={this.isEnded}
            />
          </div>

          <Instruction dataPage={dataPage.instruction} />
        </div>
      </div>
    );
  }
}

class Page7 extends Component {
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(7, end);
  };
  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: "url(" + dataPage.background.bg + ")",
      backgroundSize: "auto",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "400px",
    };

    return (
      <div className={"pageContent"}>
        <div className="c-10 animated fadeIn">
          <div className="c-10 animated fadeIn d-Flex aI-C j-S pT-3 mL-1">
            <div className="mL-6 c-35 mR-2 mT-2">
              {dataPage.title ? (
                <h2
                  className="mB-1 fw-6"
                  dangerouslySetInnerHTML={{ __html: dataPage.title }}
                ></h2>
              ) : null}
              {dataPage.text ? (
                <p
                  className="mB-2 fw-3"
                  dangerouslySetInnerHTML={{ __html: dataPage.text }}
                ></p>
              ) : null}
            </div>
            <div className="c-5 d-Flex j-C aI-S mT-6" style={style}>
              <ModalCircle1 dataPage={dataPage} isEnded={this.isEnded} />
            </div>
          </div>

          <Instruction dataPage={dataPage.instruction} />
        </div>
      </div>
    );
  }
}
class Page8 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(8, end);
  };

  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        <div className="animated fadeIn d-Rr j-E aI-C mB-1 mT-2 c-8">
          <div className="mL-4 c-4 mR-1 mT-7">
            {dataPage.title ? (
              <h2
                className="mB-1 fw-2 F1"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h2>
            ) : null}
          </div>
          <p
            className="mL-4 mT-2 mB-3 c-6 fw-4"
            dangerouslySetInnerHTML={{ __html: dataPage.text }}
          ></p>

          <div className="mL-4 d-Flex d-R j-E aI-C wWr fW-3 c-3">
            <a
              className="d-Flex j-S aI-E c-3 mB-1"
              href={dataPage.link.route}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Imagen" className="" src={dataPage.resources.img1} />
            </a>
            <p dangerouslySetInnerHTML={{ __html: dataPage.link.text }}></p>
          </div>
        </div>

        <Instruction dataPage={dataPage.instruction} />

        <img
          alt="Imagen"
          className="imageNPC-2 pAbs"
          src={dataPage.resources.img}
        />
      </div>
    );
  }
}
class Page9 extends Component {
  state = {
    openModal: false,
  };

  // FUNCION PARA ABRIR MODAL
  showModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(9, end);
  };

  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        {/* MUESTRA LA MODAL DE ACUERDO AL ESTADO openModal */}
        {this.state.openModal !== false ? (
          <ModalGallery2
            dataPage={dataPage.multimedia.gallery}
            showModal={this.showModal}
            isEnded={this.isEnded}
          />
        ) : null}

        <div className="c-10 animated fadeIn d-Flex j-S aI-C pT-7 mT-1">
          <div className="mL-5 c-35">
            {dataPage.title ? (
              <h2
                className="F1 mB-1"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h2>
            ) : null}
            {dataPage.text ? (
              <p
                className="mB-2 fw-3"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            ) : null}
          </div>

          <div className="c-7 d-Flex j-C aI-S">
            <button className={"buttonVideo"} onClick={this.showModal}>
              <img
                alt="Imagen"
                className="c-85"
                src={dataPage.multimedia.buttonModal.imgBg}
              />
            </button>
          </div>
        </div>

        <Instruction dataPage={dataPage.instruction} />
      </div>
    );
  }
}

class Page10 extends Component {
  state = {
    openModal: false,
    openModal2: false,
    count: 0,
  };

  // FUNCION PARA ABRIR MODAL
  showModal = () => {
    this.setState({
      openModal: !this.state.openModal,
      count: this.state.count + 1,
    });
    console.log(this.state.count);

    if (this.state.count >= 2) {
      this.isEnded(true);
    }
  };

  showModal2 = () => {
    this.setState({
      openModal2: !this.state.openModal2,
      count: this.state.count + 1,
    });
    console.log(this.state.count);

    if (this.state.count >= 2) {
      this.isEnded(true);
    }
  };

  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(10, end);
  };

  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        {/* MUESTRA LA MODAL DE ACUERDO AL ESTADO openModal */}
        {this.state.openModal !== false ? (
          <ModalInfo7
            dataModal={dataPage.boxInfo[0]}
            showModal={this.showModal}
            count={this.state.count}
          />
        ) : null}
        {this.state.openModal2 !== false ? (
          <ModalInfo7
            dataModal={dataPage.boxInfo[1]}
            showModal={this.showModal2}
            count={this.state.count}
          />
        ) : null}

        <div className="c-10 animated fadeIn d-Flex j-C aI-S pT-7">
          <div className="headerTitle c-75 mL-4 mT-3 pL-1">
            <h3
              className="F2 mB-1"
              dangerouslySetInnerHTML={{
                __html: dataPage.headerPage.textHeader,
              }}
              style={{ borderColor: dataPage.headerPage.color }}
            ></h3>
            {dataPage.text && (
              <p
                className="fw-4"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            )}
          </div>

          <div className="c-40">
            <div className="d-Flex d-C mT-3 mB-2 pL-2 pR-2">
              <button
                className="buttonVideo mB-1 j-C aC-S pT-05"
                onClick={this.showModal}
              >
                <img
                  alt="Imagen Corporativa"
                  className="imageFooter"
                  src={dataPage.boxInfo[0].imgBg}
                />
              </button>
              <button className="buttonVideo" onClick={this.showModal2}>
                <img
                  alt="Imagen Corporativa"
                  className="imageFooter"
                  src={dataPage.boxInfo[1].imgBg}
                />
              </button>
            </div>
          </div>
        </div>

        <Instruction dataPage={dataPage.instruction} />
      </div>
    );
  }
}
class Page11 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(11, end);
  };

  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        <div className="c-10 animated fadeIn d-Flex j-S aI-S pT-3 mT-2">
          <div className="mL-5 c-35">
            <h3
              className="mB-1 F2"
              dangerouslySetInnerHTML={{ __html: dataPage.title }}
            ></h3>
            <p
              className="fw-3 mB-1"
              dangerouslySetInnerHTML={{ __html: dataPage.text }}
            ></p>

            <div className="c-10 d-Flex aI-C j-S mL-7 mB-2 pL-3">
              <DraggableWords
                multimedia={dataPage.multimedia}
                isEnded={this.isEnded}
              />
            </div>

            <Instruction dataPage={dataPage.instruction} />
          </div>
        </div>
      </div>
    );
  }
}
class Page12 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(12, end);
  };

  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: "url(" + dataPage.background.bg + ")",
      backgroundSize: "auto",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "380px",
    };

    return (
      <div className={"pageContent"}>
        <div className="c-10 animated fadeIn">
          <div className="c-10 animated fadeIn d-Flex d-C j-C mL-50 mT-1">
            <div className="mL-5 c-35">
              {dataPage.title ? (
                <h2
                  className="mB-1 F2 mT-3"
                  dangerouslySetInnerHTML={{ __html: dataPage.title }}
                ></h2>
              ) : null}
              {dataPage.text ? (
                <p
                  className="mB-2 fw-4 mT-1"
                  dangerouslySetInnerHTML={{ __html: dataPage.text }}
                ></p>
              ) : null}
            </div>
            <div className="c-10  d-Flex j-S aI-S" style={style}>
              <ModalCircle4 dataPage={dataPage} isEnded={this.isEnded} />
            </div>
          </div>

          <Instruction dataPage={dataPage.instruction} />
        </div>
      </div>
    );
  }
}
class Page13 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    // console.log('Recibí: ' + end);
    checkEndActivity(13, end);
  };

  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        <div className="headerTitle d-Flex d-Rr j-E aI-C mB-1 mL-4 mT-5"></div>

        <div className="c-10 animated fadeIn">
          <div className="mL-5 c-7 mR-1 mB-2">
            {dataPage.title ? (
              <h2
                className="mB-1 pT-1 mR-2"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h2>
            ) : null}
            {dataPage.text ? (
              <p
                className="mB-2 fw-4 pT-1"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            ) : null}
          </div>
          <InteractiveFlip1
            dataPage={dataPage.multimedia}
            isEnded={this.isEnded}
          />
        </div>

        <Instruction dataPage={dataPage.instruction} />
      </div>
    );
  }
}

class Page14 extends Component {
  state = {
    openModal: false,
    openModal2: false,
  };

  // FUNCION PARA ABRIR MODAL
  showModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  // FUNCION PARA ABRIR MODAL
  showModal2 = () => {
    this.setState({
      openModal2: !this.state.openModal2,
    });
  };

  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(14, end);
  };

  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        {/* MUESTRA LA MODAL DE ACUERDO AL ESTADO openModal */}
        {this.state.openModal !== false ? (
          <ModalGallery2
            dataPage={dataPage.multimedia.gallery}
            showModal={this.showModal}
            isEnded={this.isEnded}
          />
        ) : null}
        {this.state.openModal2 !== false ? (
          <ModalGallery2
            dataPage={dataPage.multimedia.gallery2}
            showModal={this.showModal2}
            isEnded={this.isEnded}
          />
        ) : null}

        <div className="c-10 animated fadeIn d-Flex aI-C j-S pT-7 mT-1">
          <div className="mL-5 c-35">
            {dataPage.title ? (
              <h2
                className="F2 mB-1"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h2>
            ) : null}
            {dataPage.text ? (
              <p
                className="mB-1 fw-3"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            ) : null}
          </div>

          <div className="c-7 d-Flex j-C aI-S">
            <button className={"buttonVideo"} onClick={this.showModal}>
              <img
                alt="Imagen"
                className="c-75"
                src={dataPage.multimedia.buttonModal.imgBg1}
              />
            </button>

            <button className={"buttonVideo"} onClick={this.showModal2}>
              <img
                alt="Imagen"
                className="c-85"
                src={dataPage.multimedia.buttonModal.imgBg2}
              />
            </button>
          </div>
        </div>

        <Instruction dataPage={dataPage.instruction} />
      </div>
    );
  }
}
class Page15 extends Component {
  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y EMPEZAR EL QUIZ
  startQuiz = (e) => {
    e.preventDefault();
    this.props.startQuiz(e.target.id);
  };

  render() {
    const { dataPage } = this.props;

    const style = {
      backgroundImage: "url(" + dataPage.bg + ")",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    return (
      <div className={"pageContent"} style={style}>
        <div className="headerTitle d-Flex d-Rr j-E aI-C mT-7"></div>

        <img alt="Imagen" className="imageNPC-3 pAbs" src={dataPage.img} />

        <div className="c-5 mL-1 mT-1 mB-2">
          {dataPage.title ? (
            <h3
              className="tCenter mL-3 mB-05 F2 pL-2 aI-S"
              dangerouslySetInnerHTML={{ __html: dataPage.title }}
            ></h3>
          ) : null}

          {dataPage.text ? (
            <p
              className="tCenter mL-3 mB-2 pL-2 pT-0 fw-4"
              dangerouslySetInnerHTML={{ __html: dataPage.text }}
            ></p>
          ) : null}

          {dataPage.text1 ? (
            <p
              className="d-Flex mL-3 mB-2 pT-0 pL-2 j-C  F2 fw-7 color-17"
              dangerouslySetInnerHTML={{ __html: dataPage.text1 }}
            ></p>
          ) : null}

          {dataPage.text2 ? (
            <p
              className="tCenter mL-3 mB-2 pL-2 fw-4"
              dangerouslySetInnerHTML={{ __html: dataPage.text2 }}
            ></p>
          ) : null}
          {dataPage.text3 ? (
            <p
              className="d-Flex mL-3 mB-2 pT-0 pL-2 j-C F2 fw-7 color-17"
              dangerouslySetInnerHTML={{ __html: dataPage.text3 }}
            ></p>
          ) : null}

          <button
            className="buttonQuiz pT-1 pB-1 pL-2 fw-3 pR-2 mL-2 mB-3 aI-C "
            id="btnQuiz"
            onClick={this.startQuiz}
          >
            {dataPage.button}
          </button>
        </div>

        <Instruction dataPage={dataPage.instruction} />
      </div>
    );
  }
}

class Page16 extends Component {
  // FUNCION QUE RECIBE EL TRUE CUANDO FINALIZA LA ACTIVIDAD
  isEnded = (end) => {
    const { checkEndActivity } = this.props;
    checkEndActivity(16, end);
  };

  // FUNCION PARA ENVIAR EL INDEX ACTUALIZADO Y EMPEZAR EL QUIZ
  endQuiz = (buttonPress) => {
    this.props.endQuiz(buttonPress);
  };

  render() {
    const { dataPage } = this.props;

    return (
      <div className={"pageContent"}>
        <div className="c-10 animated fadeIn d-Flex d-C j-C aI-S">
          <div className="headerTitle d-Rr j-E aI-C mB-2 mL-4 mT-2">
            {dataPage.title ? (
              <h2
                className="F2"
                dangerouslySetInnerHTML={{ __html: dataPage.title }}
              ></h2>
            ) : null}
            {dataPage.text ? (
              <p
                className="fw-3"
                dangerouslySetInnerHTML={{ __html: dataPage.text }}
              ></p>
            ) : null}
          </div>

          <div className="mL-5 c-9">
            <Quiz1
              multimedia={dataPage.multimedia}
              isEnded={this.isEnded}
              endQuiz={this.endQuiz}
              setScore={this.props.setScore}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Page17 extends Component {
  closeCourse = () => {
    // ESTO SOLO SE EJECUTA CUANDO SE INICIA EL SERVIDOR O CUANDO SE ABRE COMO EMERGENTE
    window.parent.parent.close();
  };

  render() {
    const { dataPage, calificacion } = this.props;

    const style = {
      backgroundImage: "url(" + dataPage.background.bg + ")",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    return (
      <div
        className={dataPage.type + " pL-4 animated fadeIn"}
        style={{ style }}
      >
        {
        dataPage.logoCourse && (
          <img
            alt="Imagen Corporativa"
            className="mB-2 F2 pL-4 mL-7"
            src={dataPage.logoCourse}
          />
        )}
        <div
          className="'mB-6 mL-7 pT-3 F2 c-10 pL-7 titulo1 tCenter fw-7"
          style={{ marginLeft: "16rem" }}
        >
          {dataPage.message.success.title ? (
            <h1
              className="mB-2 F3 tCenter"
              dangerouslySetInnerHTML={{
                __html:
                  calificacion >= 70
                    ? dataPage.message.success.title
                    : dataPage.message.error.title,
              }}
            ></h1>
          ) : null}

          {dataPage.message.success.module ? (
            <h3
              className="mB-1 tCenter"
              dangerouslySetInnerHTML={{
                __html:
                  calificacion >= 70
                    ? dataPage.message.success.module
                    : dataPage.message.error.module,
              }}
            ></h3>
          ) : null}
          {dataPage.message.success.courseName ? (
            <p
              className="c-8 mL-7 pL-7 pB-2 mB-1 fw-4 tCenter titulo1"
              dangerouslySetInnerHTML={{
                __html:
                  calificacion >= 70
                    ? dataPage.message.success.courseName
                    : dataPage.message.error.courseName,
              }}
            ></p>
          ) : null}
          {dataPage.message.success.subTitle ? (
            <h2
              className="mB-2 F2 tCenter titulo1"
              dangerouslySetInnerHTML={{
                __html:
                  calificacion >= 70
                    ? dataPage.message.success.subTitle
                    : dataPage.message.error.subTitle,
              }}
            ></h2>
          ) : null}
          {dataPage.buttonEnd ? (
            <h2
              className="tCenter fw-3 buttonEnd"
              dangerouslySetInnerHTML={{ __html: dataPage.buttonEnd }}
              onClick={this.closeCourse}
              style={{ cursor: "pointer" }}
            />
          ) : null}

          {/* Restricción de avance <div className = { 'restrict-3 ' + (endActivities === true ? 'dNone' : '') } /> */}
        </div>
      </div>
    );
  }
}

export {
  Cover,
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8,
  Page9,
  Page10,
  Page11,
  Page12,
  Page13,
  Page14,
  Page15,
  Page16,
  Page17,
};
