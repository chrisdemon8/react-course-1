import React, { useState } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
 
interface TaskInterface{ 
     id : string;
     description : string;
     title : string;
}

 
interface ListInterface{ 
    id : string; 
    title : string;
    tasks : TaskInterface[]; 
}


interface ListsInterface{ 
    [key : string] : ListInterface;
}



export default function Todo() {
  
    const [lists, setLists] = useState<ListsInterface>({
        "todo" : {
            id: uuidv4(), title: "à faire", tasks: [
                { id: uuidv4(), title: "Carte 1", description: "Description 1" },
                { id: uuidv4(), title: "Carte 2", description: "Description 2" },
                { id: uuidv4(), title: "Carte 3", description: "Description 3" }
            ]
        }, "progress": {
            id: uuidv4(), title: "En cours", tasks: [
                { id: uuidv4(), title: "Carte 1", description: "Description 1" },
                { id: uuidv4(), title: "Carte 2", description: "Description 2" }
            ]
        }, "finish": {
            id: uuidv4(), title: "Terminé", tasks: [
                { id: uuidv4(), title: "Carte 1", description: "Description 1" },
                { id: uuidv4(), title: "Carte 2", description: "Description 2" }
            ]
        }
    });


    const handleDragEnd = (result : any) => {
        if (!result.destination) {
          return
        }
    
        if (result.destination.index === result.source.index && result.destination.droppableId === result.source.droppableId) {
          return
        }
    
        // Creating a copy of item before removing it from state
        const itemCopy = {...lists[result.source.droppableId].tasks[result.source.index]}
    
        setLists(prev => {
          prev = {...prev}
          // Remove from previous items array
          prev[result.source.droppableId].tasks.splice(result.source.index, 1)
     
          // Adding to new items array location
          prev[result.destination.droppableId].tasks.splice(result.destination.index, 0, itemCopy)
    
          return prev
        })
      }
    

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                { 
                    Object.keys(lists).map(function (key: string, index: number) {  
                        return <TodoList nameList={key} key={lists[key].id} title={lists[key].title} tasks={lists[key].tasks} setLists={setLists} lists={lists}></TodoList>
                    })
                }
            </div>
        </DragDropContext>

    );
}