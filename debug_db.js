const mongoose = require('mongoose');
const Test = require('./server/models/Test');
const Question = require('./server/models/Question');

async function debug() {
    await mongoose.connect('mongodb://localhost:27017/mocker_db');
    const tests = await Test.find();
    console.log('--- TESTS ---');
    tests.forEach(t => console.log(`${t._id} | ${t.title} | ${t.uniqueLink}`));
    
    const questions = await Question.find();
    console.log('\n--- QUESTIONS ---');
    questions.forEach(q => console.log(`${q.testId} | ${q.questionText}`));
    
    process.exit();
}

debug();
