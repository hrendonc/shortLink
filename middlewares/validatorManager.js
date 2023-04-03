import { validationResult, body } from "express-validator"

export const valResult = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const bodyRegisterValidator =
    [
        body('email', 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('pass', 'Password minimo de 6 caracteres')
            .trim()
            .isLength({ min: 6 })
            .custom((value, { req }) => {
                if (value !== req.body.rePass)  throw new Error('No coinciden los passwords')
                return value
            }),
            valResult
    ]

export const bodyLoginValidator =
    [
        body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
        body('pass', 'El password debe tener minimo 6 caracteres').trim().isLength({ min: 6 }),
        valResult
    ]
    