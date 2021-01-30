// will need to expand this as needed
const request = async (endpoint, method, body) => {
    if(!endpoint || !method) return

    const headers = new Headers({
        'Content-Type': 'application/json',
      })

    const params = {}
    if(body) params.body = JSON.stringify(body)
    params.headers = headers
    params.method = method


    try {
        const response = await fetch(endpoint, params)
        if (!response.ok) {
            const error = await response.json()
            // TODO: set explicit error response from arch service
            console.error(error || 'There was an connecting to Arweave')
        } else {
            const responseData = await response.json()
            return responseData
        }
    } catch (err) {
        console.log(err)
    }

}

export { request } 