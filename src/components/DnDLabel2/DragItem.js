import React from 'react';
import { useDrag } from 'react-dnd';

const style = {
  cursor: 'move',
}

const dragStart = (e) => {
  document.getElementById(e.currentTarget.id).classList.add('onDrag');
}

const dragOver = (e) => {
  e.stopPropagation();
}

const dragEnd = (e) => {
  document.getElementById(e.currentTarget.id).classList.remove('onDrag');
};

const DragItem = ({ countDrop, countOk, name, path, type, id }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        // console.log(`You dropped ${item.name} into ${dropResult.limit}!`);
        // console.log(`You dropped ${id} item`);
        // AQUI ES DONDE VA EL CODIGO PARA MOSTRAR EL GLOBO INFO

        document.getElementById('dragBox-' + id).classList.add('dNone');
        countOk();

        document.getElementById('audioNotification').src = 'audio/check.mp3';
        document.getElementById('audioNotification').play();
      } else {
        document.getElementById('dragBox-' + id).classList.add('dNone');

        document.getElementById('audioNotification').src = 'audio/error.mp3';
        document.getElementById('audioNotification').play();
      }

      countDrop();
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 'dragging' : 'noDragging'

  // isDragging ? document.getElementById('dragBox-' + id).classList.add('onDrag') : document.getElementById('dragBox-' + id).classList.remove('onDrag');

  return (
    <div
      className={'dragImg dropType-' + type}
      onDragStart = { dragStart }
      onDragOver = { dragOver }
      onDragEnd = { dragEnd }
      ref = { drag } style = {{ ...style, }} id = {'dragBox-' + id } >
      <img
        alt = 'Drag'
        className = { opacity }
        src = { path } />
    </div>
  )
}

export default DragItem;
