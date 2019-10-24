const https = require('https')

let discordUrl = process.env.discord_url || 'https://discordapp.com/invite/godsunchained'
console.log(process.env)

module.exports = async (req, res) => {
  const memberCount = await getDiscordMemberCount()
  res.status(200).json({
    memberCount
  })
}

function getDiscordMemberCount() {
  let expression = /\| (.*) members/

  return new Promise(function(resolve, reject) {
    https
      .get(discordUrl, res => {
        let data = ''

        res.on('data', chunk => (data += chunk))
        res.on('end', () => resolve(data.match(expression)[1]))
      })
      .on('error', err => reject(err))
  })
}
