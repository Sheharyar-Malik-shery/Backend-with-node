import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trirm: true,
      index: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trirm: true,
    },

    fullname: {
      type: String,
      require: true,
      trirm: true,
      index: true,
    },

    avatar: {
      type: String, //cloudinary link,
      require: true,
    },

    coveriamge: {
      type,
      String,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshtoken: {
      type: String,
    },

    watchhistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.ispasswordcorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genrateAccesstoken = function () {
  return jwt.sign(
    {
      _id: this._Id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.EXPIRY_ACCESS_TOKEN
    }
  );
};

userSchema.methods.genrateRefreshtoken = function(){
    return jwt.sign(
        {
          _id: this._Id,
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.EXPIRY_REFRESH_TOKEN 
        }
      ); 
}


export const User = mongoose.model("User", userSchema);
