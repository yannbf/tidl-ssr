import nextConnect from 'next-connect'
import middleware from '../../middleware/database'
import Task from '../../models/task'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

handler.post(async (req, res) => {
  try {
    const data = req.body
    const task = new Task(data)
    const result = await task.save()
    res.status(200).json({ ...result._doc })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

handler.patch(async (req, res) => {
  try {
    const data = req.body
    const query = { _id: data._id }
    const options = { new: true }

    const result = await Task.findOneAndUpdate(query, data, options)
    res.status(200).json({ ...result._doc })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

handler.delete(async (req, res) => {
  try {
    const data = req.body

    const result = await Task.findByIdAndRemove(data._id)
    if (result === null) {
      res
        .status(404)
        .json({ message: `the record with id ${data._id} was not found in the database.` })
    } else {
      res.status(200).json({ message: 'ok' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
