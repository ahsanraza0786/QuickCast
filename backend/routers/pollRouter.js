const express = require("express");
const router = express.Router();
const Poll = require("../models/polls");

// Create a poll
router.post("/create", async (req, res) => {
  try {
    const { question, roomCode, options } = req.body;
    
    // Validate required fields
    if (!question || !roomCode || !options || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({ message: "Invalid poll data" });
    }
    
    // Map the options to include vote count and voters array
    const pollOptions = options.map(opt => ({
      text: opt,
      votes: 0,
      voters: []
    }));
    
    // Create new poll document with roomCode included
    const newPoll = new Poll({
      question,
      roomCode,
      options: pollOptions
    });
    
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    console.error("Error creating poll:", err);
    res.status(500).json({ message: "Failed to create poll" });
  }
});

// // Fetch all polls
// router.get("/getall", async (req, res) => {
//   try {
//     res.json(polls);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get("/getall/:roomCode", async (req, res) => {
  try {
    const { roomCode } = req.params;
    // Find and return only polls for the given room code
    const polls = await Poll.find({ roomCode });
    res.json(polls);
  } catch (err) {
    console.error('Error fetching polls:', err);
    res.status(500).json({ message: "Failed to load polls" });
  }
});

// Vote on a poll
router.post("/vote/:pollId/:optionIndex", async (req, res) => {
  try {
    const { pollId, optionIndex } = req.params;
    const idx = parseInt(optionIndex, 10);
    if (isNaN(idx)) {
      return res.status(400).json({ message: "Invalid option index" });
    }

    const voterId = req.ip; // Using IP as voter ID for this example
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    
    if (idx < 0 || idx >= poll.options.length) {
      return res.status(400).json({ message: "Option not found" });
    }

    const option = poll.options[idx];
    
    // Ensure that option.voters is an arrays
    if (!Array.isArray(option.voters)) {
      option.voters = [];
    }

    const hasVoted = option.voters.includes(voterId);

    if (hasVoted) {
      // Remove vote, ensuring votes don't go negative
      option.votes = Math.max(0, option.votes - 1);
      option.voters = option.voters.filter(voter => voter !== voterId);
    } else {
      // Add vote
      option.votes += 1;
      option.voters.push(voterId);
    }

    await poll.save();
    res.json({ poll, hasVoted: !hasVoted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;