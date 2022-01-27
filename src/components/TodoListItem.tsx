import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';



interface TodoListItemInterface { task: any, title: string; description: string; deleteCard: (key: string) => void; modifyCard: (title: string, description : string, key : string) => void }

export default function TodoListItem({ task, title, description, deleteCard, modifyCard }: TodoListItemInterface): JSX.Element {


    const [edit, setEdit] = useState(false);

    const [inputValues, setInputValues] = useState({
        title: title, description: description
    });

    const handleOnChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };



    


    return (
        <Card sx={{ minWidth: 275, maxWidth: 350 }}>
            <CardContent>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {title}
                </Typography>

                {
                    edit ?
                        <TextField label="Outlined secondary" onChange={handleOnChange} name="title" defaultValue={title} color="secondary" focused />
                        :
                        <Typography variant="h5" component="div">
                            {title}
                        </Typography>
                }


                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>

                {
                    edit ?
                        <TextField label="Outlined secondary" onChange={handleOnChange} name="description" defaultValue={description} color="secondary" focused />
                        :
                        <Typography variant="body2">
                            {description}
                        </Typography>
                }

            </CardContent>
            <CardActions>
                {
                    edit ?
                        <><Button size="small" onClick={() => { modifyCard(inputValues['title'] , inputValues['description'], task.key); setEdit(false);    }}>Valider</Button><Button color="error" onClick={() => { setEdit(false) }}>Annuler</Button>
                        </>
                        :
                        <><Button size="small" onClick={() => { setEdit(true) }}>Modifier</Button><Button color="error" onClick={() => { deleteCard(task.key) }}><DeleteIcon /></Button>
                        </>
                }
            </CardActions>
        </Card>
    );
}
