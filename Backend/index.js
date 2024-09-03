const app = require('./app')
const config = require('./utils/config')



app.listen(config.PORT, () => {
  console.log(`Example app listening on port http://localhost:${config.PORT}`)
})