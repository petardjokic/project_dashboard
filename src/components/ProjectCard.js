import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tags from './Tags'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        margin: '5%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    content: {
        minWidth: 100,
        height: 90
    }
}));

export default function ProjectCard(props) {
    const classes = useStyles();
    const handleClick = () => {
        if(props.projectInfo.tagValue)
            props.addTag(props.projectInfo.id, props.projectInfo.tagValue)
    }
    const handleTagChange = (e) => {
        props.projectInfo.tagValue = e.target.value
    }
   
    return (
        <Card m={2} className={classes.root}>

            <CardMedia
                className={classes.media}
                image={props.projectInfo.image || "logo.192.png"}
                title="Floor plan"
            />
            <h3>{props.projectInfo.name}</h3>
            <CardContent className={classes.content}>
                <Typography variant="body2" color="textSecondary" component="div">
                    <Tags tags={props.projectInfo.tags}></Tags>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton id={props.projectInfo.id} aria-label="add new tag" onClick={handleClick}>
                    <LibraryAdd />
                </IconButton>
                <TextField id={`input-tag-${props.projectInfo.id}`} label="Enter tag" onChange={handleTagChange} />
            </CardActions>
        </Card>
    );
}