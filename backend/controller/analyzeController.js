import Analysis from '../models/analysisModel.js';
import searchWeb from '../services/searchServices.js';

const analysis = async (req, res) => {
  try {

    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    const claim = input.trim();
    const sources=await searchWeb(claim);

    console.log("Claim received:", claim);

    const newAnalysis = new Analysis({
      claim: claim,
      source: sources,
      verdict: "Pending"
    });

    await newAnalysis.save();

    res.json({
      claim: claim,
      msg: "Claim saved successfully",
      analysis: newAnalysis
    });

  } catch (error) {

    console.error("Error analyzing claim", error);

    res.status(500).json({
      error: "Internal server error"
    });

  }
};

export default analysis;