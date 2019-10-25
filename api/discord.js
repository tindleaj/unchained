const axios = require('axios')
const modelMap = require('./_models.json')

const DISCORD_URL =
  process.env.discord_url || 'https://discordapp.com/api/v6/invites/godsunchained?with_counts=true'
const MYJSON_URL = process.env.myjson_url || 'https://api.myjson.com'
const DISCORD_MODEL_ID = modelMap.discord_stats
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 1000 * 60 * 30

module.exports = async (req, res) => {
  const data = await buildResponse()
  res.status(200).json(data)
}

async function buildResponse() {
  const guildInfo = await getGuildInfo()
  const data = await getAndUpdatePersistentData()

  return {
    members_total: guildInfo.approximate_member_count,
    members_online: guildInfo.approximate_presence_count,
    snapshots: data.snapshots
  }
}

async function getAndUpdatePersistentData() {
  let data = await getPersistentData()
  let timeSinceLastUpdated = Date.now() - data.updated_at

  if (timeSinceLastUpdated > UPDATE_INTERVAL) {
    console.log('Updating stale data...')
    let currendDiscordData = await getGuildInfo()

    return addSnapshot({
      members_total: currendDiscordData.approximate_member_count,
      members_online: currendDiscordData.approximate_presence_count
    })
  } else {
    console.log('Data is current.')
    return data
  }
}

async function addSnapshot(newSnapshot) {
  let data = await getPersistentData()

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
    .put(`${MYJSON_URL}/bins/${DISCORD_MODEL_ID}`, payload)
    .then(res => res.data)
    .catch(error => console.error(error))
}

function getPersistentData() {
  return axios
    .get(`${MYJSON_URL}/bins/${DISCORD_MODEL_ID}`)
    .then(response => response.data)
    .catch(error => console.error(error))
}

function getGuildInfo() {
  return axios
    .get(DISCORD_URL)
    .then(response => response.data)
    .catch(error => console.error(error))
}

// getGuildInfo().then(res => console.log(res))
// buildResponse().then(res => console.log(res))
// getPersistentData().then(res => console.log(res))
// addSnapshot({ members_total: 15459, members_online: 1832 }).then(res => console.log(res.snapshots))
// getAndUpdatePersistentData().then(res => console.log(res))
