import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
},
{
    timestamps: true // to get created at and updated at by default
});


userSchema.pre('save', async function(next){ // userSchema is user
    if(!this.isModified('password')){ // this keyword refers to the user we are trying to save in the User model or document
        next(); // if password is not modified, we don't want to do anything and move on
    }

    const salt = await bcrypt.genSalt(10); // generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // hash the password with the salt. this.password refers to the password in the User model or document
});


// compare plain text password with the hashed password in the database
userSchema.methods.matchPassword = async function(enteredPassword) { // matchPasswords is a custom method associated with userSchema.
    return await bcrypt.compare(enteredPassword, this.password); // it returns true or false based on the entered password and the hashed password in the database
}

const User = mongoose.model('User', userSchema);

export default User;