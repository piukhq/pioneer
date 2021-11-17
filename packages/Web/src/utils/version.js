
export const getServerVersion = async () => {
  const { env, theme } = Config
  let versionFilePath = `/${env}/${theme}/version.json`
  if (env === 'development') { // Temp placeholder for MR Testing, delete for final version
    versionFilePath = `/mr-316/${theme}/version.json`
  }
  const tag = await fetch(versionFilePath)
    .then(response => response.json())
    .then(json => json.tag)
    .catch((e) => console.error(e))
  return tag
}
