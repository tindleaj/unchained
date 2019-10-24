const https = require('https')

let discordUrl =
  process.env.discord_url || 'https://discordapp.com/api/v6/invites/godsunchained?with_counts=true'

module.exports = async (req, res) => {
  const data = await getDiscordInviteData()
  const json = JSON.parse(data)

  res.status(200).json({
    total_members: discordData.approximate_member_count,
    online_members: discordData.approximate_presence_count
  })
}

function getDiscordInviteData() {
  return new Promise(function(resolve, reject) {
    https
      .get(discordUrl, res => {
        let data = ''

        res.on('data', chunk => (data += chunk))
        res.on('end', () => {
          resolve(data)
        })
      })
      .on('error', err => reject(err))
  })
}

// getDiscordInviteData().then(res => console.log(JSON.parse(res)))
