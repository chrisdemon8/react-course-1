import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { AddCard } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";



export default function TodoList(props: { name: string }): JSX.Element {
    const { name } = props;

    const [tasks, setTasks] = useState([{ id: uuidv4(), title: "Carte 1", description: "Description 1" },
    { id: uuidv4(), title: "Carte 2", description: "Description 2" },
    { id: uuidv4(), title: "Carte 3", description: "Description 3" }]);

    const deleteCard = (id: string) => {
        setTasks(tasks.filter(task => {
            return task.id !== id
        }))
    }

    const addCard = () => {
        setTasks([...tasks, { id: uuidv4(), title: "carte New", description: "Description new" }]);
    }

    const onDragEnd = (result: DropResult): void => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        /*
        const items: Item[] = reorder(
          state,
          result.source.index,
          result.destination.index
        );
    
        setState(items);*/
    };



    console.log(tasks);

    return (
        <div><h1>{name} <Button onClick={() => { addCard() }}>+</Button></h1>
            {tasks.map(function (task) {
                return <TodoListItem key={task.id} title={task.title} description={task.description} deleteCard={deleteCard} id={task.id}></TodoListItem>
            })
            }
        </div>);
}