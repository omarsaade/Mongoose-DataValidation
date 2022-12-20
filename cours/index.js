const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  //awal sater huwe syntax khass bi mongoose bas
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    //   match:/pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  //   price:Number,
  price: {
    type: Number,
    required: function () {
      //here we cant use arrow function cz arrow
      //  function dont have their
      //own this
      // this: course object
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "-",
    author: "Maximillian shwarzmuller",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 15,
  });

  try {
    // await course.validate((err) => {
    //   if (err) {
    //     //
    //   }
    // });
    const result = await course.save();
    console.log(result);
    // we can also manually triger the validation
  } catch (error) {
    console.log(error.message);
  }
}

createCourse();

// async function getCourses() {
//   const courses = await Course.find({ author: "Mosh", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })

//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }

// getCourses();
