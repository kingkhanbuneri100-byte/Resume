const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const dataDir = path.join(__dirname, '..', 'data')
const cvPath = path.join(dataDir, 'cv.json')
const contactsPath = path.join(dataDir, 'contacts.json')

// ensure data dir exists
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
if(!fs.existsSync(contactsPath)) fs.writeFileSync(contactsPath, JSON.stringify([], null, 2))

app.get('/api/cv', (req, res) => {
  try{
    const raw = fs.readFileSync(cvPath, 'utf8')
    const obj = JSON.parse(raw)
    res.json(obj)
  }catch(err){
    res.status(500).json({ error: 'CV not found on server' })
  }
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  if(!name || !email || !message) return res.status(400).json({ error: 'name, email, message required' })

  try{
    const rawContacts = fs.readFileSync(contactsPath, 'utf8')
    const contacts = JSON.parse(rawContacts)
    const entry = { id: Date.now(), name, email, message, createdAt: new Date().toISOString() }
    contacts.unshift(entry)
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2))
    res.json({ ok: true })
  }catch(err){
    res.status(500).json({ error: 'failed to save contact' })
  }
})

// serve client build when exists
const clientDist = path.join(__dirname, '..', 'client', 'dist')
if(fs.existsSync(clientDist)){
  app.use(express.static(clientDist))
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
