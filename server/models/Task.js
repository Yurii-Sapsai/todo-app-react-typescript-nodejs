import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

    task: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        require: true,
        default: false
    },

}, {
    timestamps: true,
})

export default mongoose.model('Task', TaskSchema);