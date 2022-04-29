import app from "./app"
import './database'

app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`) 
})
