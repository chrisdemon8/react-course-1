import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { ListsInterface } from './Todo';


export default function TodoList(props: { setLists: any, lists: ListsInterface, nameList: string, assignToFilter: string }): JSX.Element {
    const { setLists, lists, nameList, assignToFilter } = props;


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


    const modifyCard = (title: string, description: string, assignTo: string, status: boolean, key: string) => {

        setLists((prevState: any) => ({
            ...prevState,
            [nameList]: {
                ...prevState[nameList],
                tasks:
                    prevState[nameList].tasks.map((task: { key: string; title: string; description: string, assignTo: string, status: boolean }) => {
                        if (task.key === key) {
                            task.description = description;
                            task.title = title;
                            task.assignTo = assignTo;
                            task.status = status;
                        }
                        return task;
                    })
            }

        }
        ));

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
                        description: 'Description new',
                        assignTo: 'Chris',
                        status: false,
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
                        {lists[nameList].tasks.filter((task: { key: string; title: string; description: string; assignTo: string; status: boolean; }, index: number) => {

                            if (assignToFilter == task.assignTo || assignToFilter === '') {
                                return task;
                            }


                        }).map((task: { key: string; title: string; description: string; assignTo: string; status: boolean; }, index: number) => {

                            return (
                                <Draggable key={task.key} draggableId={task.key} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <TodoListItem key={task.key} task={task} title={task.title} description={task.description} assignTo={task.assignTo} status={task.status} deleteCard={deleteCard} modifyCard={modifyCard}  ></TodoListItem>
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