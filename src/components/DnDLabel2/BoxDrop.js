import React from 'react';
import { useDrop } from 'react-dnd';

const BoxDrop = ({ id, img, order, type, limit }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: type,
    drop: () => ({ name: 'Artículos', limit: limit }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  // let imgDrop = path;
  if (isActive) {
    // imgDrop = pathTarget;
  } else if (canDrop) {
    // imgDrop = pathTarget;
  }
  return (
    <div className = {'dF-C-cc itemDrop'} id = {'itemDrop-' + (order)} ref = { drop } style = {{ }} >
      <img
        alt = 'Drop'
        className = ''
        id = { 'imgDrop-' + id }
        src = { img } />

    </div>
  )
}
// <p>{ data }</p>
export default BoxDrop;
// ...style, 'top': posY, 'left': posX 