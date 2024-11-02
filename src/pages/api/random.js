import problems from '../../data/problems.json';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const problemsList = problems.problems;
    if (problemsList.length === 0) {
      return res.status(404).json({ message: 'No problems found' });
    }

    const random = Math.floor(Math.random() * problemsList.length);
    const problem = problemsList[random];
    
    if (!problem) {
      return res.status(404).json({ message: 'No problem found' });
    }

    const leetcodeUrl = `https://leetcode.com/problems/${problem.title}/description/`;
    const solutionUrl = `https://github.com/neetcode-gh/leetcode/tree/main/python/${problem.filename}`;

    res.status(200).json({
      problem: {
        problemNumber: problem.problemNumber,
        title: problem.title,
        filename: problem.filename
      },
      leetcodeUrl,
      solutionUrl
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}