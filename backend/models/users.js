import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const {Schema} = mongoose


const userSchema = new Schema ({
    firstName: {
        type: String,
        trim: true,
        required: true
    },

    lastName: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    hash_password: {
        type: String,
        trim: true,
        required: true,
        min: 6,
        max: 30
    },

    picture: {
        type: String,
       default: "/avatar.png"

    },

    role: {
        type: [String],
        default: ['Student'],
        enum: ['Student', 'Instructor', 'Admin']
    },

    paystack_account_id: '',
    
    paystack_seller: {},

    paystackSession: {},
    
}, {timestamps: true})

userSchema.virtual("password")
.set(function(password) {
this.hash_password = bcrypt.hashSync(password, 12)
})

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}

export default mongoose.model('User', userSchema)