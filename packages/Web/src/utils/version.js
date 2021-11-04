
export const getServerVersionNumber = async () => {
  const { env, theme } = Config
  let versionFilePath = `/${env}/${theme}/version.json`
  if (env === 'development') { // in real version, this function will return 'development for this conditional'
    versionFilePath = `/mr-316/${theme}/version.json`
  }
  const tag = await fetch(versionFilePath)
    .then(response => response.json())
    .then(json => json.tag)
    .catch((e) => console.error(e))
  if (env === 'development') { // placeholder for MR testing
    return 'development'
  }
  return tag
}
