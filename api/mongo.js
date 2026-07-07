console.log("starting script")

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://thewiris:${password}@cluster0.jhijkav.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

async function main() {
  try {
    await mongoose.connect(url, { family: 4 });
    console.log('Connected!');

    const note = new Note({
      content: 'HTML is easy',
      important: true,
    });

    await note.save();
    console.log('Saved!');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

main();