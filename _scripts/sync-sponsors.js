// sync latest data from sponsor.vuejs.org
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const yaml = require('js-yaml')

const configPath = path.resolve(__dirname, '../themes/vue/_config.yml')

;(async () => {
  const { data } = await axios(`https://sponsors.vuejs.org/data.json`)

  const cnSponsors = data.platinum_china

  // DCloud special switch logic
  const s = cnSponsors.find((s) => s.name === 'HBuilder')
  if (s) {
    s.ad_img = 'dcloud1.png'
    s.alt_img = 'dcloud2.png'
    s.height = 70
    s.url = `https://www.dcloud.io/?hmsr=vuejsorg&hmpl=&hmcu=&hmkw=&hmci=`
  }

  const yml = yaml.dump(data)
  const config = fs.readFileSync(configPath, 'utf-8')
  const updated = config.replace(
    /(# START SPONSORS)[^]*(# END SPONSORS)/,
    `$1\n${yml}$2`
  )
  fs.writeFileSync(configPath, updated)
})()
