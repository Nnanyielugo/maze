const chunksOfSize = (array, size) => {
  if(!Array.isArray(array)){
    throw new Error(`Expected array, but got ${typeof array}`)
  }

  if(!size && size >= array.length){
    return array;
  }

  const newArray = [];

  while(array.length){
    const sliced = array.slice(0, size);

    newArray.push(sliced);
    array = array.splice(size);

    if(array.length && array.length < size) {
      newArray.push(array)
    }
  }

  return newArray;
}

const flattenDeep = (array) => {
  return array.reduce((a, b) => 
    a.concat(Array.isArray(b) ? flattenDeep(b) : b), []
  )
}

const helperFunctions = { chunksOfSize, flattenDeep }
export default helperFunctions