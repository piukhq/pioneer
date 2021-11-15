
export const getServerVersion = async () => {
  const { env, theme } = Config
  if (env === 'development') { // placeholder for MR testing
    return 'development'
  }
  // console.log(window.location.href)
  let versionFilePath = `/${env}/${theme}/version.json`
  if (env === 'development') {
    versionFilePath = `/mr-316/${theme}/version.json`
  }
  const tag = await fetch(versionFilePath)
    .then(response => response.json())
    .then(json => json.tag)
    .catch((e) => console.error(e))
  return tag
}
