import mongoose from 'mongoose'

try {
    await mongoose.connect(process.env.DB_URI)
    console.log('DB online...')
} catch (error) {
    console.log('Error de al conectar la Base de Datos -', error)
}
