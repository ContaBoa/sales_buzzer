# API to play alert sounds for sale events

### Setup

```
yarn install
```

### Run

```
npm start
```

### Endpoints

- `/sounds`

### Example

Upload sound:
```
curl -X POST http://localhost:8080/sounds \
  -H "Content-Type: application/json" \
  -d '{"sound": "lead", "url": "http://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav"}'
```

Play sound:
```
curl http://localhost:8080/sounds/lead
```

List sounds:
```
curl http://localhost:8080/sounds
```
