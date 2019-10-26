const axios = require('axios')
const { addSnapshot, getPersistentData } = require('./_myjson.js')
const modelMap = require('./_models.json')

const GU_URL = process.env.gu_url || 'https://api.godsunchained.com/v0'
const GU_MODEL_ID = modelMap.gu_player_stats
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 1000 * 60 * 30

module.exports = async (req, res) => {
  const data = await buildResponse()

  res.status(200).json(data)
}

async function buildResponse() {
  let guPlayerData = await getTotalPlayers()
  let data = await getAndUpdatePersistentData()

  return {
    players_total: guPlayerData.total,
    snapshots: data.snapshots
  }
}

async function getAndUpdatePersistentData() {
  let data = await getPersistentData(GU_MODEL_ID)
  let timeSinceLastUpdated = Date.now() - data.updated_at

  if (timeSinceLastUpdated > UPDATE_INTERVAL) {
    console.log('Updating stale data...')
    let guPlayerData = await getTotalPlayers()

    return addSnapshot(
      {
        players_total: guPlayerData.total
      },
      GU_MODEL_ID
    )
  } else {
    console.log('Data is current.')
    return data
  }
}

function getTotalPlayers() {
  return axios
    .get(`${GU_URL}/properties`)
    .then(response => response.data)
    .catch(error => console.error(error))
}

// Tests lol
// buildResponse().then(res => console.log(res))
// getAndUpdatePersistentData().then(res => console.log(res))
