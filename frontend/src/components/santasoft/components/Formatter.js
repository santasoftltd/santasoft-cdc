export const formatter = (value) => {
  if (value === null || value === undefined) {
    return value
  }
  else {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
}

export const numberWithCommas = (x) => {
  x = x.toString()
  while (x.includes(",")) {
    x = x.replace(",", "")
  }
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const dateFormatter = (value) => {
  if (value === null || value === undefined || value === '') {
    return value
  }
  else {
    var splittedDate = value.split('-')
    return splittedDate[2].slice(0, 2) + "-" + splittedDate[1] + "-" + splittedDate[0]
  }
}

export const timestampFormatter = (value) => {
  if (value === null || value === undefined) {
    return value
  }
  else {
    var splittedTimeStampDate = value.split(' ')
    var splittedTime = splittedTimeStampDate[1].split('.')
    var splittedDate = splittedTimeStampDate[0].split('-')
    return splittedDate[2].slice(0, 2) + "-" + splittedDate[1] + "-" + splittedDate[0] + ' ' + splittedTime[0]
  }
}

export const dbDateFormat = (value) => {
  var splittedDate = value.split('-')
  return splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0] + ' 00.00.00.00'
}

export const getDate = () => {
  var date = new Date();
  return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

export const getFormattedDate = (date) => {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date(date);
  return ('0' + date.getDate()).slice(-2) + '-' + months[date.getMonth()] + '-' + date.getFullYear();
}