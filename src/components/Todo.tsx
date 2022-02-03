import React, { useState } from 'react';
import TodoList from './TodoList';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Box, FormControl, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { FilterList } from '@mui/icons-material';

export interface TaskInterface {
    key: string;
    description: string;
    title: string;
    assignTo: string;
    status: boolean;
}


export interface ListInterface {
    key: string;
    title: string;
    tasks: TaskInterface[];
}


export interface ListsInterface {
    [key: string]: ListInterface;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Todo() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [inputValues, setInputValues] = useState({
        title: "", assignTo : ""
    });

    const handleOnChange = (event: { target: { name: string; value: string; }; }) => {

        const { name, value } = event.target;
  
        setInputValues({ ...inputValues, [name]: value });

    };





    const [lists, setLists] = useState<ListsInterface>({
        "todo": {
            key: uuidv4(), title: "à faire", tasks: [
                { key: uuidv4(), title: "Carte 1", description: "Description 1", assignTo: "Chris", status: false },
                { key: uuidv4(), title: "Carte 2", description: "Description 2", assignTo: "Chris", status: false },
                { key: uuidv4(), title: "Carte 3", description: "Description 3", assignTo: "Chris", status: false }
            ]
        }, "progress": {
            key: uuidv4(), title: "En cours", tasks: [
                { key: uuidv4(), title: "Carte 1", description: "Description 1", assignTo: "Chris", status: false },
                { key: uuidv4(), title: "Carte 2", description: "Description 2", assignTo: "Chris", status: false }
            ]
        }, "finish": {
            key: uuidv4(), title: "Terminé", tasks: [
                { key: uuidv4(), title: "Carte 1", description: "Description 1", assignTo: "Chris", status: false },
                { key: uuidv4(), title: "Carte 2", description: "Description 2", assignTo: "Chris", status: false }
            ]
        }
    });


    const handleDragEnd = (result: any) => {
        if (!result.destination) {
            return
        }

        if (result.destination.index === result.source.index && result.destination.droppableId === result.source.droppableId) {
            return
        }

        // Creating a copy of item before removing it from state
        const itemCopy = { ...lists[result.source.droppableId].tasks[result.source.index] }

        setLists(prev => {
            prev = { ...prev }
            // Remove from previous items array
            prev[result.source.droppableId].tasks.splice(result.source.index, 1)

            // Adding to new items array location
            prev[result.destination.droppableId].tasks.splice(result.destination.index, 0, itemCopy)

            return prev
        })
    }


    const addList = () => {

        const keyList = uuidv4();
        setLists((prevState: any) => ({
            ...prevState,
            [keyList]: {
                key: uuidv4(),
                title: [inputValues["title"]],
                tasks: [],
            }
        }
        ));

        setOpen(false)
    };


     


    return (
        <div>

            <h1><Button onClick={handleOpen}  >Add list +</Button></h1>

            <h3>Filtre par assignation :

                <FormControl sx={{ m: 1, minWidth: 120 }} >
                    <Select
                        labelId="selectAssignTo"
                        id="selectAssignTo"
                        value={inputValues['assignTo']} 
                        label="Age"
                        name="assignTo"
                        onChange={handleOnChange}
                    >
                        <MenuItem value={''}>All</MenuItem>
                        <MenuItem value={'Chris'}>Chris</MenuItem>
                        <MenuItem value={'Laurine'}>Laurine</MenuItem>
                    </Select>
                </FormControl>
            </h3>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {
                        Object.keys(lists).map(function (key: string, index: number) {
                            return <TodoList nameList={key} key={lists[key].key} setLists={setLists} assignToFilter={inputValues["assignTo"]} lists={lists}></TodoList>
                        })
                    }
                </div>
            </DragDropContext>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ajout d'une nouvelle liste
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField onChange={handleOnChange} label="Titre de la liste" name="title" color="secondary" focused />
                    </Typography>
                    <Button onClick={() => { addList() }}>Ajouter</Button>
                </Box>
            </Modal>


        </div>
    );
}