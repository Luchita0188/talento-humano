import React from 'react';
import { useDrag } from 'react-dnd';

const style = {
  // marginRight: '1.5rem',
  // marginBottom: '1.5rem',
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

const DragItem = ({ name, type, id, color, img }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item.type && dropResult) {
        // console.log(`You dropped ${item.type} into ${dropResult.top}!`);
        // console.log(`You dropped ${id} item`);
        // AQUI ES DONDE VA EL CODIGO PARA MOSTRAR EL GLOBO INFO
        console.log(document.querySelector('#dragItemPath'));
        document.getElementById('dragItemPath').style.top = (dropResult.top + 110) + 'px';
        document.getElementById('dragItemPath').style.left = (dropResult.left - 5) + 'px';

        document.getElementById('infoDrop-' + dropResult.id).classList.remove('dNone');
        document.querySelector('.footer').classList.add('dNone');
        document.querySelector('.instruction ').classList.add('dNone');

        document.getElementById('audioNotification').src = 'audio/check.mp3';
        document.getElementById('audioNotification').play();
      } else {
        document.getElementById('audioNotification').src = 'audio/error.mp3';
        document.getElementById('audioNotification').play();
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // const opacity = isDragging ? 'dragging' : 'noDragging'
  const opacity = isDragging ? 'dragging' : 'noDragging'

  return (
    <div
      className = { 'dragBox d-Flex j-C aI-C '}
      onDragStart = { dragStart }
      onDragOver = { dragOver }
      onDragEnd = { dragEnd }
      ref = { drag } style = {{ ...style, }} id = {'dragBox-' + id } >
        <img
          alt = 'Imagen Drag'
          className = ''
          src = { img } />
    </div>
  )
}

export default DragItem;
