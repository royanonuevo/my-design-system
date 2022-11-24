// return object
export function getObjectByID (dataArr, valueToLookFor, keyname) {
  return dataArr.find((item) => {
    return item[keyname] === valueToLookFor
  })
}

// return array index
export function getIndexByID (dataArr, valueToLookFor, keyname) {
  return dataArr.findIndex((item) => {
    return item[keyname] === valueToLookFor
  })
}


// check if the object is empty
export function isEmptyObject(e) {  
  var t 
  for (t in e)  
    return !1; 
  return !0  
}


// limit array list
export const limitArrayList = (list, limit=null) => {
  if (limit && list.length) {
    return list.slice(0, limit)
  }

  return list
}

// use if you have list of array and you want slice it by 2 (or number you specified)
export function mapJSON(data, colMax = 2) {
    let i = 0
    let k = 0
    let newData = []
    let items = []
    let length = data.length

    for( i = 0; i <data.length; (i += colMax)) {
        for( k = 0; k < colMax; k++ ) {
            if(data[i + k]!==undefined)
                items.push(data[i + k])
        }

        newData.push(items)
        items = []
    }
    return newData
}








