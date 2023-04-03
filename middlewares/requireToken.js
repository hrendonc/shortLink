import jwt from 'jsonwebtoken'

export const requireToken = (req, res, next) => {
    try {
        const token = req.headers.authorization
        
        // Verificamos que exista el Token
        if(!token)
            throw new Error('No existe el Token en el Header, usar Bearer')

        // Comprobamos que coincida el Token
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.uid = payload.uid // Agregamos informacion al request
        
        next()
        
    } catch (error) {
        console.log('Error: ', error.message)
        return res.status(500).json({error: error.message})
    }
}