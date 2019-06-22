function Noform({ id, name, key, onSuccess, onError }) {
  const element = document.getElementById(id)
  if (element === null) {
    throw new Error('Could not find element ID of the Form.')
  }
  if (typeof name !== 'string' || name.length <= 0) {
    throw new Error('name must be a string a have length')
  } 
  if (typeof key !== 'string' || key.length <= 0) {
    throw new Error('Key is mandatory')
  }
  
  element.addEventListener('submit', event => {
    event.preventDefault()
    event.stopImmediatePropagation()
    
    const result = {}
    for (const element of event.target.elements) {
      const { name: elName } = element
      if (elName === null || elName === undefined || elName === '') {
        continue
      }
      result[elName] = element.value
    }
    
    // result object has all the props needed

    fetch(`https://api.noform.dev/submitions/${name}`, {
      method: "POST",
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result)
    }).then(onSuccess).catch(onError)

  })

}