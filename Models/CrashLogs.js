const mongoose = require("mongoose");

const crashLogSchema = new mongoose.Schema({
    err: String,
    req: Object,
    insertDate: {
        type: Number,
        default: () => {
            return Math.round(new Date() / 1000);
        }
    },
    creationDate: {
        type: Date,
        default: () => {
            return new Date();
        }
    }
});

const CrashLog = mongoose.model("crashLog", crashLogSchema);

exports.CrashLog = CrashLog;