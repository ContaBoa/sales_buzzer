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
  downloadIfAbsent('sounds/sale', 'https://www.myinstants.com/media/sounds/audiojoiner120623175716.mp3')
  downloadIfAbsent('sounds/lead', 'http://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav')
  downloadIfAbsent('sounds/upsell', 'http://themushroomkingdom.net/sounds/wav/smb/smb_powerup.wav')
  downloadIfAbsent('sounds/downgrade', 'http://themushroomkingdom.net/sounds/wav/smb/smb_pipe.wav')
  downloadIfAbsent('sounds/churn', 'https://www.myinstants.com/media/sounds/super-mario-bros-ost-_-8-youre-dead.mp3')
  downloadIfAbsent('sounds/youwin', 'https://www.myinstants.com/media/sounds/street-fighter-ii-you-win-perfect.mp3')
}


app.post('/sale', (req, res) => handleSoundResponse(res, 'sounds/sale'))
app.post('/lead', (req, res) => handleSoundResponse(res, 'sounds/lead'))
app.post('/upsell', (req, res) => handleSoundResponse(res, 'sounds/upsell'))
app.post('/downgrade', (req, res) => handleSoundResponse(res, 'sounds/downgrade'))
app.post('/churn', (req, res) => handleSoundResponse(res, 'sounds/churn'))
app.post('/youwin', (req, res) => handleSoundResponse(res, 'sounds/youwin'))

app.use(express.static('client/build'))
app.use(express.static('client/styles'))

app.listen(3000, () => {
    checkSounds()
    console.log('Sales Buzzer listening on port 3000!')
});
