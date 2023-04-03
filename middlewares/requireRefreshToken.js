import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken

        // Verificamos que exista el Token
        if(!refreshTokenCookie) throw new Error('No existe el Token')

        // Comprobamos que coincida el Token
        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)

        req.uid = uid

        next()

    } catch (error) {
        console.log('Error: ', error.message)
        return res.status(500).json({error: error.message})
    }
}