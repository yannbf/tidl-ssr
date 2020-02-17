import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TaskSchema = new Schema({
  name: String,
  date: { type: Date, default: Date.now },
  icon: String,
  frequency: String,
})

export default mongoose.models.Task || mongoose.model('Task', TaskSchema)
