const app = require('./src/')
const {app: {port}} = require('./src/configs/app.config')

const PORT = port || 5000
app.listen(PORT, () => {
  console.log(`SERVER::running at ${PORT}`)
})
