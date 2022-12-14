// Referencing Documents

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  //authors
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

// Defining course model
const Course = mongoose.model(
  //courses
  "Course",
  new mongoose.Schema({
    name: String,
    // added another property author and there will reference
    // an author document in our database
    //  So in this author property will store an objectId that references
    // an Author document
    author: {
      // type huwe object id
      type: mongoose.Schema.Types.ObjectId,
      // name of the target collection
      ref: "Author",
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

/*
in real word application we wanna load this author document so we can
 display its name..so for that we use the "populate" method

 he el meth bt5alli ybayen bi shaklo..unatel ybayen ka id bas
 la2 yefreda...

*/
async function listCourses() {
  const courses = await Course.find()
    // jeble el name w shill el id li bedall tbayen w darure nfaltera
    // populate with esem el el property "author "
    //badna  name w bidun id (include exclude)
    // in real word application we wanna load this author document so we can
    //  display its name..so for that we use the "populate" method
    .populate("author", "name -_id")
    // .populate("category", "name")
    .select("name author");
  // const courses = await Course.find().select("name");
  console.log(courses);
  // console.log(courses[1]._doc.author);
}

// createAuthor("Mosh", "My bio", "My Website");

// createCourse("Node Course", "63a4a3c09220403918c4cc19");

listCourses();

/*
To overcome the above problem, populate() method is used to replace the user
 ObjectId field with the whole document consisting of all the user data.
*/
