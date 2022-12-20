/*  




                  Async Validators




*/

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

/*


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CatSchema = new Schema(..);


*/

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    //
    // lowercase: true,
    // uppercase: true,
    //for removing paddings
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    //here
    validate: {
      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Do some Async work
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
      message: "A Course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    //its called when we read the value of a property
    get: (v) => Math.round(v),
    //its called when we set the value of a property
    set: (v) => Math.round(v),
  },
});
//to create a class like Course we need to compile the schema to model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "web",
    author: "Maximillian shwarzmuller",
    tags: ["frontend"],
    isPublished: true,
    price: 15.8,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    //ex.errors {category:"...",tags:"..."}
    for (const field in ex.errors) {
      /*
        ex.errors[field].

                 message
                 name
                 properties
                 ....
        */
      console.log(ex.errors[field].message);
    }
    // console.log(error.message);
  }
}

createCourse();
