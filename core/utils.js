export const printLog = (isLogActive, text) => {
  if (isLogActive) {
    console.log(text)
  }
}

export const generateRandomNumber = (max, min, unit) => {
  // Math.round((Math.random()*(max-min)+min)/10)*10
  return Math.round((Math.random()*(max-min)+min)/unit)*10
}