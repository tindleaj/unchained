const https = require('https')

let discordUrl = process.env.discord_url || 'https://discordapp.com/invite/godsunchained'

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
        res.on('end', () => {
          let match = data.match(expression)[1]
          let trimmed = match
            .split(',')
            .join('')
            .trim()

          resolve(Number(trimmed))
        })
      })
      .on('error', err => reject(err))
  })
}

getDiscordMemberCount().then(res => console.log(res))
