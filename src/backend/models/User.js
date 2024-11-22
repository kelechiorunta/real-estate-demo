const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: false, default: 'Anonymous User'  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    otp: {
        type: String,
        default: 'otp'
        // required: true,
      },
      expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 300 * 1000), // Set to 5 minutes from now
      },
    resetPasswordToken: { type: String },
    resetPasswordExpires: {type: Date },
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check if entered password matches the hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Ensure unique email index
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
