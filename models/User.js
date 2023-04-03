import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {unique: true}
    },
    pass: {
        type: String,
        required: true
    }
})

userSchema.pre("save", async function(next){
    const user = this

    if(!user.isModified('pass')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        user.pass = await bcrypt.hash(user.pass, salt)
        next()
    } catch (error) {
        console.log(error)
        throw new Error('Error al codificar el password')
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.pass);
};

export const User = mongoose.model("User", userSchema);