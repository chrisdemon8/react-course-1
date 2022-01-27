import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';



interface TodoListItemInterface { id: string, title: string; description: string; deleteCard: (id: string) => void }

export default function TodoListItem({ id, title, description, deleteCard }: TodoListItemInterface): JSX.Element {

    return (
        <Card sx={{ minWidth: 275, maxWidth: 350 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">Modifier</Button><Button color="error" onClick={() => { deleteCard(id) }}><DeleteIcon /></Button>
            </CardActions>
        </Card>
    );
}
