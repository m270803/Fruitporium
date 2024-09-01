const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uCredentials: {
      uEmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        sparse: true,         // Ensures only documents with non-null email values are indexed
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
      },
    },
    uProfile: {
      uName: {
        type: String,
        trim: true
      },
      uPhone: {
        type: Number,
        validate: {
          validator: function (v) {
            return /\d{10}/.test(v);  // Example: Validates that the phone number is exactly 10 digits
          },
          message: props => `${props.value} is not a valid phone number!`
        }
      },
    },
    uAddress: {
      uZipCode: {
        type: Number,
        min: [10000, 'Zip code must be at least 5 digits'],
        max: [99999, 'Zip code must be at most 5 digits']
      },
      uHouseNumber: {
        type: String,
        trim: true
      },
      uArea: {
        type: String,
        trim: true
      },
      uCity: {
        type: String,
        trim: true
      },
    },
  },
  { collection: "Users", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
