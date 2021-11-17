
export const getServerVersion = async () => {
  const { env, theme } = Config
  if (env === 'development') { // Development does not use tags
    return 'development'
  }
  const versionFilePath = `/${env}/${theme}/version.json`

  const tag = await fetch(versionFilePath)
    .then(response => response.json())
    .then(json => json.sha) // Temp testing with SHA to return a value in MR testing
    .catch((e) => console.error(e))
  return tag
}
