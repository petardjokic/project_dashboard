import React, { Component } from 'react';
import INSIDE_MAPS_API from './service/INSIDE_MAPS_API'
import axios from 'axios'
import ProjectCard from './components/ProjectCard'
import NavBar from './components/NavBar'
import SearchForm from './components/SearchForm'
import Grid from '@material-ui/core/Grid';

class App extends Component {
  state = {
    projects: [],
    busy: false
  }
  getData = (params) => {
    this.setState({
      ...this.state,
      busy: true
    })
    INSIDE_MAPS_API.GET_PROJECTS(params).then(response => {
      let projects = []
      this.setState({
        ...this.state,
        projects: projects
      })
      let sliced = response.data.data
      sliced.forEach(id => {
        let floorRequest = INSIDE_MAPS_API.GET_FLOOR_PLAN(id)
        let metadataRequest = INSIDE_MAPS_API.GET_METADATA(id)
        // let tagsRequest = INSIDE_MAPS_API.GET_TAGS(id)
        axios.all([floorRequest, metadataRequest]).then(axios.spread((...responses) => {
          const responseOne = responses[0].data.data.metric.jpg
          const responseTwo = responses[1].data.data.name
          let project = { id: id, image: responseOne, name: responseTwo, tags: [], tagValue: '' }
          projects.push(project)
          this.setState({
            ...this.state,
            projects: projects,
            busy: false
          })
        })).catch(error => {
          console.log(error)
        })
      })
    })
  }
  addTag = (projectId, tagValue) => {
    let targetProject = this.state.projects.find(project => project.id === projectId)
    if(targetProject) {
      let tagExist = targetProject.tags.find(tag => tag === tagValue)
      if(!tagExist){
      targetProject.tags.push(tagValue)
      targetProject.tagValue = ''
      let projects = this.state.projects
      this.setState({
        ...this.state,
        projects : projects
      })
    }
    }
  }
  render() {
    let projectTemplate = this.state.projects.map(project => {
      return (
        <div key={project.id}>
          <Grid item>
            <ProjectCard addTag={this.addTag} projectInfo={project}></ProjectCard>
          </Grid>
        </div>
      )
    });
    let busyTemplate = this.state.busy ? (<h1>LOADING</h1>) : projectTemplate
    return (
      <div className="App" >
        <main className="flexbox">
          <NavBar></NavBar>
          <SearchForm searchProjects={this.getData}></SearchForm>
          <Grid container>
            {busyTemplate}
          </Grid>
        </main>
      </div>
    );
  }
}

export default App;
