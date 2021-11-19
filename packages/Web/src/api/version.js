
export const getServerVersion = async () => {
  const { env, theme } = Config
  if (env === 'development') { // Development does not use tags so returns generic 'development' version
    return 'development'
  }
  const versionFilePath = `/${env}/${theme}/version.json`

  const tag = await fetch(versionFilePath)
    .then(response => response.json())
    .then(json => json.tag)
    .catch((e) => console.error(e))
  return tag
}
