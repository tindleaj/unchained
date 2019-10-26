const MYJSON_URL = process.env.myjson_url || 'https://api.myjson.com'
const axios = require('axios')

async function addSnapshot(newSnapshot, binId) {
  let data = await getPersistentData(binId)

  let indexedSnapshot = {
    ...newSnapshot,
    id: data.snapshots[data.snapshots.length - 1].id + 1,
    created_at: Date.now()
  }

  let payload = {
    ...data,
    updated_at: Date.now(),
    snapshots: [...data.snapshots, indexedSnapshot]
  }

  return axios
    .put(`${MYJSON_URL}/bins/${binId}`, payload)
    .then(res => res.data)
    .catch(error => console.error(error))
}

function getPersistentData(binId) {
  return axios
    .get(`${MYJSON_URL}/bins/${binId}`)
    .then(response => response.data)
    .catch(error => console.error(error))
}

module.exports = { addSnapshot, getPersistentData }
