const express = require('express')
const bodyParser = require('body-parser')

const TechYogiService = require('./services/techYogi-service')
const YogasetService = require('./services/yogaset-service')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/techYogi/all', async (req, res) => {
  const yogi = await TechYogiService.findAll()
  res.render('techYogi', { yogi })
})

app.get('/techYogi/:id', async (req, res) => {
  const user = await TechYogiService.find(req.params.id)
  res.send(user)
})

app.post('/techYogi', async (req, res) => {
  const user = await TechYogiService.add(req.body)
  res.send(user)
})

app.delete('/techYogi/:id', async (req, res) => {
  const user = await TechYogiService.del(req.params.id)
  res.send(user)
})


app.get('/yogaset/all', async (req, res) => {
    const yogakriya = await YogasetService.findAll()
    res.render('yogaset', { yogakriya })
  })
  
  app.get('/yogaset/:id', async (req, res) => {
    const user = await YogasetService.find(req.params.id)
    res.send(user)
  })
  
  app.post('/yogaset', async (req, res) => {
    const user = await YogasetService.add(req.body)
    res.send(user)
  })
  
  app.delete('/yogaset/:id', async (req, res) => {
    const user = await YogasetService.del(req.params.id)
    res.send(user)
  })
  


app.listen(3000, () => {
  console.log('Server listening')
})
