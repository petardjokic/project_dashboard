import axios from 'axios';


export default {
    token : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InA3c2RYcVVIdm8iLCJpYXQiOjE2MDA0NTcyNjIsImV4cCI6MTYwMTA2MjA2Mn0.3JOeubPktB74TSARwTmsVfjW8wT3IWYTvIwSozPpulo',
    organizationId: 'p7sdXqUHvo',
     GET_PROJECTS(payload) {
        let url = `/organizations/${this.organizationId}/projects`
        return axios.get(url, {
            params: payload,
            headers: {
                'Authorization': this.token
            }
        })
    },
     GET_FLOOR_PLAN(payload) {
        let url = `/projects/${payload}/floorplans/singlepage/metric`
        return axios.get(url, {
            headers: {
                'Authorization': this.token
            }
        })
    },
    GET_METADATA(payload) {
        let url = `/projects/${payload}`
        return axios.get(url, {
            headers: {
                'Authorization': this.token
            }
        })
    },
    // GET_TAGS(payload) {
    //     let url = `/projects/${payload}/smartTags`
    //     return axios.get(url, {
    //         headers: {
    //             'Authorization': this.token
    //         }
    //     })
    // }
}