
import axios from 'axios'
export const getVersion = () => {
  axios('version.json')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch((error) => {
      console.error('Error:', error)
    })
}
