import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function UpdateMovie(props) {

  const [data, setData] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ['', '', '']
  })
  console.log(props)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setData({
          id: props.match.params.id,
          title: res.data.title,
          director: res.data.director,
          metascore: res.data.metascore,
          stars: [res.data.stars[0], res.data.stars[1], res.data.stars[2]]
        })
        console.log('>>--> response from GET request to /movies/:id', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [props.match.params.id])

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(data)

    axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, data)
      .then(res => {
        console.log(res)
        props.history.push('/')
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div className="update-form-container">
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <label>
        Title
          <input 
            type="text"
            name="title"
            placeholder="Title"
            value={data.title}
            onChange={handleChange}
          />
        </label>
        <br /><br />
        <label>
        Director
          <input 
            type="text"
            name="director"
            placeholder="Director"
            value={data.director}
            onChange={handleChange}
          />
        </label>
        <br /><br />
        <label>
        Metascore
          <input 
            type="number"
            name="metascore"
            placeholder="Metascore"
            value={data.metascore}
            onChange={handleChange}
          />
        </label>
        <br /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
