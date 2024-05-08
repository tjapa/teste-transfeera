import 'module-alias/register'
import app from './config/app'

const PORT = 3000

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
