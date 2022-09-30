import React from 'react';
import { useDrag } from 'react-dnd';

const STYLE = {
  cursor: 'move'
}

const DragWord = ({ countDrop, countOk, name, type, id, bgColor }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()

      if (item && dropResult) {
        // console.log(`You dropped ${item.name} into ${dropResult.name}!`);
        // console.log(`You dropped ${type} item`);

        document.getElementById('dragWord-' + id).classList.add('dNone');
        if (item.name === dropResult.correct) {
          document.getElementById('boxDrop-' + dropResult.correct).classList.add('WordDropped');
          document.getElementById('boxDrop-' + dropResult.correct).style.backgroundColor = bgColor;
          document.getElementById('boxDrop-' + dropResult.correct).innerHTML = '<p class = "">' + name + '</p>';

          countOk();
          document.getElementById('audioNotification').src = 'audio/check.mp3';
          document.getElementById('audioNotification').play();
        } else {
          document.getElementById('boxDrop-' + dropResult.correct).classList.add('WordDropped');
          document.getElementById('boxDrop-' + dropResult.correct).innerHTML = '<p class = "">' + name + '</p>';
          document.getElementById('boxDrop-' + dropResult.correct).style.backgroundColor = bgColor;

          document.getElementById('audioNotification').src = 'audio/error.mp3';
          document.getElementById('audioNotification').play();
        }

        countDrop();
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const OPACTITY = isDragging ? 0.4 : 1
  const BACKGROUNDCOLOR = bgColor

  return (
    <div className = 'dragWord d-Flex j-C aI-C' ref = { drag } style = {{ ...STYLE, 'opacity': OPACTITY, 'backgroundColor': BACKGROUNDCOLOR }} id = {'dragWord-' + id }>
      <p>{ name }</p>
    </div>
  )
}

export default DragWord;
