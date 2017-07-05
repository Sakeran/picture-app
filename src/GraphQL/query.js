// Queries the server's GraphQL endpoint with a given query.
// Returns the data field if no errors were encountered.

export default (query) => {
  return new Promise((resolve, reject) => {
    fetch('/api', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(query)
    })
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        return reject(res.errors.map(err => err.message));
      }
      resolve(res.data);
    });
  });
}
