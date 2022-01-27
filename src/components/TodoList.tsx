import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { AddCard } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

 
export default function TodoList(props: { title: string, tasks: any, setLists: any, lists: any, nameList: string }): JSX.Element {
    const { title, tasks, setLists, lists, nameList } = props;


    console.log("tg", nameList);
    const deleteCard = (id: string) => {
        setLists((prevState: any) => ({
            ...prevState,
            [nameList]: {
                title: prevState[nameList].title,
                tasks: prevState[nameList].tasks.filter((task: { id: string; }) => {
                    return task.id !== id
                })
            }
        } 
        ));
    }

    const addCard = () => {
        setLists((prevState: any) => ({
            ...prevState,
            [nameList]: {
                title: prevState[nameList].title,
                tasks: [
                    {
                        id: uuidv4(),
                        title: 'carte New',
                        description: 'Description new'
                    },
                    ...prevState[nameList].tasks
                ],
            }
        }

        ));
    };
 
    return (
        <div><h1>{title} <Button onClick={() => { addCard() }}>+</Button></h1>

            <Droppable droppableId={nameList}>
                {(provided) => (
                    <div  {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task: { id: string; title: string; description: string; }, index: number) => {
                            return (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <TodoListItem key={task.id} title={task.title} description={task.description} deleteCard={deleteCard} id={task.id}></TodoListItem>
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>);
}