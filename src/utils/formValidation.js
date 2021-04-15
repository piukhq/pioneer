
const isValidEmail = (email) => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return email.match(re)
}

const isValidName = (fullName) => {
  const re = /^[a-z ,.'-]+$/i
  return fullName.match(re)
}

export { isValidEmail, isValidName }
