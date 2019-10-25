const https = require('https')
const axios = require('axios')
const modelMap = require('./_models.json')

let discordUrl =
  process.env.discord_url || 'https://discordapp.com/api/v6/invites/godsunchained?with_counts=true'
let myjsonUrl = process.env.myjson_url || 'https://api.myjson.com/'

module.exports = async (req, res) => {
  const data = await buildResponse()
  res.status(200).json(data)
}

async function buildResponse() {
  const data = await getGuildInfo()

  return {
    total_members: data.approximate_member_count,
    online_members: data.approximate_presence_count
  }
}

function addSnapshot(snapshot) {
  axios.post()
}

function getSnapshots() {
  let discordModelId = modelMap.discord_stats

  return axios
    .get(`${myjsonUrl}/bins/${discordModelId}`)
    .then(response => response.data)
    .catch(error => console.error(error))
}

function getGuildInfo() {
  return axios
    .get(discordUrl)
    .then(response => response.data)
    .catch(error => console.error(error))
}

// getGuildInfo().then(res => console.log(res))
// buildResponse().then(res => console.log(res))
