import { User } from "../models/User.js";
import { generateToken, generateRefreshToken } from "../util/tokenManager.js";

export const register = async (req, res)=>{
    try {
        const {email, pass} = req.body

        let user = await User.findOne({ email })
        if (user) throw new Error('Este email ya se encuentra registrado.')

        user = new User({email, pass})
        let response = await user.save()

        // Generar token
        const { token, expiresIn } = generateToken(response._id);
        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error)
        return res.status(403).json({error: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, pass} = req.body

        let user = await User.findOne({ email })
        if (!user) throw new Error('No se encontro el usuario solicitado')

        const result = await user.comparePassword(pass)
        if(!result) return res.status(400).json({error: 'Contraseña incorrecta'})
        
        // Generar Token
        const {token, expiresIn} = generateToken(user._id)
        generateRefreshToken(user._id, res)

        return res.json({token, expiresIn})

    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message})
    }
}

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean() // lean, Devuelve lo basico de un objeto
        return res.json({ID: user._id, USER: user.email})
    } catch (error) {
        return res.status(500).json({error: 'error de servidor'})
    }
}

export const refreshToken = (req, res) => {
    
    try {
        const { token, expiresIn} = generateToken(req.uid)

        return res.json({token, expiresIn})

    } catch (error) {
        console.log('Error: ', error.message)
        return res.status(500).json({error: error.message})
    }
}

export const logOut = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({OK: true})
}