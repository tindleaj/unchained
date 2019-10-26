const axios = require('axios')
const modelMap = require('./_models.json')
const { addSnapshot, getPersistentData } = require('./_myjson.js')

const DISCORD_URL =
  process.env.discord_url || 'https://discordapp.com/api/v6/invites/godsunchained?with_counts=true'
const DISCORD_MODEL_ID = modelMap.discord_stats
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 1000 * 60 * 30

module.exports = async (req, res) => {
  const data = await buildResponse()
  res.status(200).json(data)
}

// TODO: DRY
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
  let data = await getPersistentData(DISCORD_MODEL_ID)
  let timeSinceLastUpdated = Date.now() - data.updated_at

  if (timeSinceLastUpdated > UPDATE_INTERVAL) {
    console.log('Updating stale data...')
    let currendDiscordData = await getGuildInfo()

    return addSnapshot(
      {
        members_total: currendDiscordData.approximate_member_count,
        members_online: currendDiscordData.approximate_presence_count
      },
      DISCORD_MODEL_ID
    )
  } else {
    console.log('Data is current.')
    return data
  }
}

function getGuildInfo() {
  return axios
    .get(DISCORD_URL)
    .then(response => response.data)
    .catch(error => console.error(error))
}

// Tests lol
// getGuildInfo().then(res => console.log(res))
// buildResponse().then(res => console.log(res))
// getPersistentData().then(res => console.log(res))
// addSnapshot({ members_total: 15459, members_online: 1832 }).then(res => console.log(res.snapshots))
// getAndUpdatePersistentData().then(res => console.log(res))
