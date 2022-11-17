import app from './app.js'

const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server started. URL: http://localhost on port: ${PORT}`)
})
