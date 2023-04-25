

export const suspensePromise = promise => {
  let status = 'pending'
  let response

  const suspender = promise.then(
    (res) => {
      status = 'success'
      response = res
    },
    (err) => {
      status = 'error'
      response = err
    },
  )

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender
      case 'error':
        throw response
      default:
        return response
    }
  }

  return { read }
}
  
export const wait = (ms, data) =>{
  return suspensePromise(new Promise((resolve) => 
    setTimeout(()=>resolve(data), ms)
  ));
}


