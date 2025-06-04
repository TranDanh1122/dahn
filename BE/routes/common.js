const express = require('express');
const router = express.Router();
const techStacks = [
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Redux Toolkit',
    'GraphQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Firebase',
    'Vite',
    'Prisma',
    'Zustand',
    'Sass'
];
router.get("/techstacks", (req, res) => {
    return res.status(200).json(techStacks);
})
module.exports = router;