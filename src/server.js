const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const request = require('request');
const player = require('play-sound')(opts = {});
const Rx = require('rxjs/Rx');

require('dotenv').config()

const soundsDir = process.env.SOUNDS_DIR;
const port = process.env.PORT;
const postSecret = process.env.POST_SECRET;

const app = express();
app.use(bodyParser.json());

const sound$ = new Rx.Subject();
sound$
.observeOn(Rx.Scheduler.async)
.subscribe(sound =>
  player.play(sound, err => {
    if(err) console.log(err);
  })
);

const handleSound = (response, soundPath) => {
  fs.open(soundPath, 'r', (err, fd) => {
    if(err){
      if (err.code === 'ENOENT') {
        response.status(404).send();
      }else{
        console.log(err);
        response.status(500).send();
      }
    }else{
      fs.close(fd);
      sound$.next(soundPath);
      response.status(200).send();
    }
  })
}


const isWellFormed = (reqBody) => {
  // TODO
  return true
}

app.post(`/${postSecret}/sounds`, (req, res) => {
  if (!isWellFormed(req.body)) {
    console.log('crazy validation')
    res.status(400).send()
    return
  }
  
  const {sound, url} = req.body
  const soundPath = `${soundsDir}/${sound}`
  fs.open(soundPath, 'wx', (err, fd) => {
    if(err){
      if (err.code === 'EEXIST') {
        res.status(409).send()
        return
      }else{
        console.log(err)
        response.status(500).send()
      }
    }else{
      request(url)
      .on('error', err => res.status(400).send())
      .on('response', resp => {
        res.status(204).send()
      })  
      .pipe(fs.createWriteStream('', {fd: fd}))
    }
  })
})

app.get('/sounds', (req, res) => {
  fs.readdir(soundsDir, (err, files) =>{
    if (err){
      console.log(err)
      res.status(500).send()
    }else{
      res.status(200).json(files)
    }
  })
})

app.get('/sounds/:soundName', (req, res) => {
  handleSound(res, `${soundsDir}/${req.params.soundName}`)
})

if (!fs.existsSync(soundsDir)) fs.mkdirSync(soundsDir)

app.listen(port, () => {
    console.log(`Sales Buzzer listening on port ${port}!`)
});
