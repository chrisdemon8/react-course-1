import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, TextField } from '@mui/material';



interface TodoListItemInterface { task: any, title: string; description: string; assignTo: string, status: boolean; deleteCard: (key: string) => void; modifyCard: (title: string, description: string, assignTo: string, status: boolean, key: string) => void }

export default function TodoListItem({ task, title, description, assignTo, status, deleteCard, modifyCard }: TodoListItemInterface): JSX.Element {


    const [edit, setEdit] = useState(false);

    const [inputValues, setInputValues] = useState({
        title: title, description: description, assignTo: assignTo, status: status
    });

    const handleOnChange = (event: { target: { name: string; value: string; }; }) => {

        const { name, value } = event.target;

        setInputValues({ ...inputValues, [name]: value });

    };

    const handleOnChangeCheckbox = (event: { target: { name: string; checked: boolean }; }) => {

        const { name, checked } = event.target;
        setInputValues({ ...inputValues, [name]: checked });

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

                {
                    edit ?
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="selectAssignTo">Assigné à</InputLabel>
                            <Select
                                labelId="selectAssignTo"
                                id="selectAssignTo"
                                value={inputValues["assignTo"]}
                                label="Age"
                                name="assignTo"
                                onChange={handleOnChange}
                            >
                                <MenuItem value={'Chris'}>Chris</MenuItem>
                                <MenuItem value={'Laurine'}>Laurine</MenuItem>
                            </Select>
                        </FormControl>
                        :
                        <FormControl sx={{ m: 1, minWidth: 120 }} disabled>
                            <InputLabel id="selectAssignTo">Assigné à</InputLabel>
                            <Select
                                labelId="selectAssignTo"
                                id="selectAssignTo"
                                value={assignTo}
                                label="Age"
                                name="assignTo"
                                onChange={handleOnChange}
                            >
                                <MenuItem value={'Chris'}>Chris</MenuItem>
                                <MenuItem value={'Laurine'}>Laurine</MenuItem>
                            </Select>
                            <FormHelperText>Disabled</FormHelperText>
                        </FormControl>
                }
                <br></br>

                {
                    edit ?
                        <Checkbox name='status' checked={inputValues["status"]} onChange={handleOnChangeCheckbox} color="success" />

                        :
                        <Checkbox name='status' checked={status} onChange={handleOnChangeCheckbox} color="success"  disabled/>
                }
            </CardContent>
            <CardActions>
                {
                    edit ?
                        <><Button size="small" onClick={() => { modifyCard(inputValues['title'], inputValues['description'], inputValues['assignTo'], inputValues['status'], task.key); setEdit(false); }}>Valider</Button><Button color="error" onClick={() => { setEdit(false) }}>Annuler</Button>
                        </>
                        :
                        <><Button size="small" onClick={() => { setEdit(true) }}>Modifier</Button><Button color="error" onClick={() => { deleteCard(task.key) }}><DeleteIcon /></Button>
                        </>
                }
            </CardActions>
        </Card>
    );
}
