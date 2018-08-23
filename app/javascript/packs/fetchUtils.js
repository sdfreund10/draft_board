export function postData (url, body) {
  return(
    fetch(url, {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  )
}

export function getData (url) {
  return(
    fetch(url, {
      method: "GET",
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json'
      }
    })
  )
}

export function deleteData (url) {
  return(
    fetch(url, {
      method: "DELETE",
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json'
      }
    })
  )
}
