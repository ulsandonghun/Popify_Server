const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {
        type: String,
        required: '아이디를 입력하세요.',
        unique: true,
        match: [/^[A-Za-z]{1}[A-Za-z0-9]{3,14}$/, '영문으로 시작해서 영문/숫자를 포함하여 4 ~ 15자로 입력하세요.']
    },
    password: {
        type: String,
        required: '비밀번호를 입력하세요.',
    },
    is_deleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("User", UserSchema);