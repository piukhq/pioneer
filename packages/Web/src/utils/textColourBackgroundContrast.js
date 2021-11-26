const determineTextColourBackgroundContrast = (hexValue) => {
  const hexToRgb = (hex) => {
    let c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('')
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]]
      }
      c = '0x' + c.join('')
      return [(c >> 16) & 255, (c >> 8) & 255, c & 255]
    }
    return null
  }

  const rgbArr = hexToRgb(hexValue)

  if (rgbArr) {
    const brightness = Math.round(
      ((parseInt(rgbArr[0]) * 299) + (parseInt(rgbArr[1]) * 587) + (parseInt(rgbArr[2]) * 114)) / 1000,
    )

    // 190 is the default threshold value for determining if the text should be white or black.
    // The higher this number is, the more likely the text will appear white
    const textColour = (brightness > 190) ? 'black' : 'white'

    return textColour
  }
  return 'white'
}

export { determineTextColourBackgroundContrast }
