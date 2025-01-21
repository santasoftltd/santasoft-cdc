  export const formatter = (value) => {
    if(value === null || value === undefined){
      return value
    }
    else{
      return value.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }
  }

  export const dateFormatter = (value) => {
    if(value === null || value === undefined){
      return value
    }
    else{
      var splittedDate = value.split('-')
      return splittedDate[2].slice(0, 2) + "-" + splittedDate[1] + "-" + splittedDate[0]
    }
  }

  export const timestampFormatter = (value) => {
    if(value === null || value === undefined){
      return value
    }
    else{
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