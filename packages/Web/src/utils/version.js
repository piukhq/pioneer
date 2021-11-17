
import axios from 'axios'
export const getServerVersionNumber = async () => {
  const { theme } = Config
  const versionFilePath = `/mr-316/${theme}/version.json` // test line, TODO: use commented version below
  console.log(versionFilePath)
  return await axios(versionFilePath)
    .then(response => response.json())
    .then(json => json.tag)
    .catch((e) => console.error(e))
}

// export const getServerVersionNumber = async () => {
//   const { env, theme } = Config
//   if (env === 'development') {
//     return null
//   } else {
//     const versionFilePath = `/${env}/${theme}/version.json`
//     return axios(versionFilePath)
//       .then(response => response.json())
//       .then(json => json.tag)
//       .catch((e) => console.error(e))
//   }
// }
