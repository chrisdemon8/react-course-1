import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { ListsInterface } from './Todo';


export default function TodoList(props: { setLists: any, lists: ListsInterface, nameList: string }): JSX.Element {
    const { setLists, lists, nameList } = props;


    const deleteCard = (key: string) => {
        setLists((prevState: any) => ({
            ...prevState,
            [nameList]: {
                ...prevState[nameList],
                tasks: prevState[nameList].tasks.filter((task: { key: string; }) => {
                    return task.key !== key
                })
            }
        }
        ));
    }


    const modifyCard = (title: string, description: string, key: string) => {
        console.log('test', description, title, key);

        /*
        setLists((prevState: any) => ({
            ...prevState,
            [nameList]: {
                ...prevState[nameList],
                tasks: [
                    prevState[nameList].tasks.filter((task: { key: string; title: string; description: string }) => {
                        if (task.key === key) {
                            task.description = description;
                            task.title = title;
                            return task;
                        } 
                    }), ...prevState[nameList].tasks,
                ]
            }

        }
        ));*/
  
        console.log(lists)
    }




    const addCard = () => {
        setLists((prevState: any) => ({
            ...prevState,
            [nameList]: {
                ...prevState[nameList],
                tasks: [
                    {
                        key: uuidv4(),
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
        <div><h1>{lists[nameList].title} <Button onClick={() => { addCard() }}>+</Button></h1>

            <Droppable droppableId={nameList}>
                {(provided) => (
                    <div  {...provided.droppableProps} ref={provided.innerRef}>
                        {lists[nameList].tasks.map((task: { key: string; title: string; description: string; }, index: number) => {
                            return (
                                <Draggable key={task.key} draggableId={task.key} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <TodoListItem key={task.key} task={task} title={task.title} description={task.description} deleteCard={deleteCard} modifyCard={modifyCard}  ></TodoListItem>
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