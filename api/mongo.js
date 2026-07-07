console.log("starting script")

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://thewiris:${password}@ac-r1sz9no-shard-00-00.jhijkav.mongodb.net:27017,ac-r1sz9no-shard-00-01.jhijkav.mongodb.net:27017,ac-r1sz9no-shard-00-02.jhijkav.mongodb.net:27017/?ssl=true&replicaSet=atlas-uxsdvq-shard-0&authSource=admin&appName=Cluster0`

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