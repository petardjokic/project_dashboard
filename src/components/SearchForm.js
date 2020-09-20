import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class SearchForm extends Component {
    state = {
        updatedSince: '2020-09-01',
        updatedTo: '2020-09-21',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if(new Date(this.state.updatedSince) > new Date(this.state.updatedTo)){
            console.log("Invalid params")
            return 
        }
        this.props.searchProjects(this.state)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={3}>
                <Grid item>
                <TextField id="updatedSince" label="Updated since" type="date" defaultValue={this.state.updatedSince} onChange={this.handleChange} />
                </Grid>
                <Grid item>
                <TextField id="updatedTo" label="Updated to" type="date" defaultValue={this.state.updatedTo} onChange={this.handleChange} />
                </Grid>
                <Grid item>
               
                <Button variant="contained" type="submit" color="primary">Search</Button>
                </Grid>
            </Grid>
            </form>
        );
    }
}

export default SearchForm;