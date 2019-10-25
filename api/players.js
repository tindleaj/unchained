const axios = require('axios')

const GU_URL = process.env.gu_url || 'https://api.godsunchained.com/v0'

module.exports = async (req, res) => {
  const data = await buildResponse()

  res.status(200).json(data)
}

async function buildResponse() {
  const res = await axios.get(`${GU_URL}/properties`)

  return {
    players_total: res.data.total
  }
}

// buildResponse().then(res => console.log(res))
