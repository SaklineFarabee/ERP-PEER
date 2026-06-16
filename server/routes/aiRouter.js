import express from 'express'
import { askAI, getBusinessInsight } from './ai.js'

const router = express.Router()

// Ask AI a question
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body
    if (!question) {
      return res.status(400).json({ error: 'Question is required' })
    }

    const answer = await askAI(question)
    res.json({ answer })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get business insight
router.post('/insight', async (req, res) => {
  try {
    const insight = await getBusinessInsight()
    res.json({ insight })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
