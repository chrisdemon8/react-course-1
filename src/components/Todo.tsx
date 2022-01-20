import React, { useState } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
 

export default function Todo() {

    const [list, setList] = useState([{ id: uuidv4(), name: "à faire" }, { id: uuidv4(), name: "En cours" }, { id: uuidv4(), name: "Terminé" }]);
 
    return (
        <div style={{display:'flex', flexDirection : 'row' , justifyContent : 'space-around'}}>
            {list.map(function (item) {
                return <TodoList key={item.id} name={item.name}  ></TodoList>
            })
            }
        </div>
    );
}