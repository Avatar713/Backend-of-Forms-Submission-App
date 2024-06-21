import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());

app.get('/ping', (req, res) => {
    res.json(true);
});

app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    // Validate input data
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const submission = { name, email, phone, github_link, stopwatch_time };

    let submissions = [];
    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        submissions = JSON.parse(data);
    }
    submissions.push(submission);
    fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));

    res.json({ success: true });
});

app.get('/read', (req, res) => {
    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        const submissions = JSON.parse(data);
        res.json(submissions);
    } else {
        res.json([]);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.delete('/delete', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        let submissions = JSON.parse(data);
        submissions = submissions.filter((submission: any) => submission.email !== email);
        fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'No submissions found.' });
    }
});

app.put('/edit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        let submissions = JSON.parse(data);
        const index = submissions.findIndex((submission: any) => submission.email === email);
        if (index !== -1) {
            submissions[index] = { name, email, phone, github_link, stopwatch_time };
            fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
            res.json({ success: true });
        } else {
            res.status(400).json({ error: 'Submission not found.' });
        }
    } else {
        res.status(400).json({ error: 'No submissions found.' });
    }
});

app.get('/search', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        const submissions = JSON.parse(data);
        const submission = submissions.find((submission: any) => submission.email === email);
        if (submission) {
            res.json(submission);
        } else {
            res.status(400).json({ error: 'Submission not found.' });
        }
    } else {
        res.status(400).json({ error: 'No submissions found.' });
    }
});

