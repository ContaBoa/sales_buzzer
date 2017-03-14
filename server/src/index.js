const express = require('express')
const player = require('play-sound')(opts = {})
const fs = require('fs')
const request = require('request')

const app = express()

const handleSoundResponse = (response, soundPath) => {
  player.play(soundPath, (err) => {
    if(err){
      console.log(err)
      response.status(500).send()
    }else{
      response.status(200).send()
    }
  })
}

const checkSounds = () => {
  const downloadIfAbsent = (soundPath, url) => {
    fs.access(soundPath, (err) => {
        if(err){
          if(err.code === 'ENOENT'){
            request(url).pipe(fs.createWriteStream(soundPath))
          }else{
            console.log(err)
          }
        }
    })
  }
  downloadIfAbsent('sounds/sale.wav', 'http://themushroomkingdom.net/sounds/wav/smb/smb_vine.wav')
  downloadIfAbsent('sounds/lead.wav', 'http://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav')
  downloadIfAbsent('sounds/upsell.wav', 'http://themushroomkingdom.net/sounds/wav/smb/smb_powerup.wav')
  downloadIfAbsent('sounds/downgrade.wav', 'http://themushroomkingdom.net/sounds/wav/smb/smb_pipe.wav')
}


app.post('/sale', (req, res) => handleSoundResponse(res, 'sounds/sale.wav'))
app.post('/lead', (req, res) => handleSoundResponse(res, 'sounds/lead.wav'))
app.post('/upsell', (req, res) => handleSoundResponse(res, 'sounds/upsell.wav'))
app.post('/downgrade', (req, res) => handleSoundResponse(res, 'sounds/downgrade.wav'))

app.use(express.static('client/build'))
app.use(express.static('client/styles'))

app.listen(3000, () => {
    checkSounds()
    console.log('Sales Buzzer listening on port 3000!')
});
