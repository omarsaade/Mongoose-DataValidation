const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: authorSchema,
      required: true,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// or Update Direclty
/*
async function updateAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "Omar Saade",
      },
    }
  );
}
*/
// listCourses(); //single nseted

// or Querying First
async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = "Mosh Hamedani";
  course.save();
}

updateAuthor("63a579ea59e4e230ec37af83");

// createCourse("Node Course", new Author({ name: "Mosh" }));
//hon bisir fi shi esmo Subdocuments aw esma embedded documents

/*
async function updateAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}
*/

//author.name bel unset btshil el nested property

// how to work with an array of subdocuments
// Array of Subdocuments
