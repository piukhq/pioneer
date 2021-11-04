
export const getServerVersionNumber = async () => {
  const { theme } = Config
  const versionFilePath = `/mr-316/${theme}/version.json`
  console.log(versionFilePath)
  const tag = await fetch(versionFilePath)
    .then(response => response.json())
    .then(json => json?.sha)
    .catch((e) => console.error(e))
  return tag
}
