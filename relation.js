//                  How to work with related objects
// 1- Using References (Normalization) -> CONSISTENCY
// 2- Using Embedded Documents (Denormalization)
// 3- Hybrid approach
/*

relational databases : sql
nosql databases : mongo



*/
// Trade off between query performance vs consistency
// 3ana tari2ten la net3amal ma3 el relation between collection or documents

// 1- Using References (Normalization) -> CONSISTENCY

// separate collection for storing our authors
let author = {
  name: "Mosh",
};

//HOWEVER EVERY TIME you wanna query a course u need to do an extra query
// to load the related author

//sparate collection named course
let course = {
  // so here we are using a reference
  author: "id",
  //   authors: ["id1", "id2"],
};

// 2- Using Embedded Documents (Denormalization)

//embed an author document inside of our course document

let coursef = {
  // fast : query performance
  // embeding document inside of another document
  author: {
    name: "Mosh",
  },
};

/*



*/
// 3-Hybrid approach

let authorf = {
  name: "Mosh",
  // 50 other properties
};

let courseL = {
  author: {
    id: "ref",
    name: "Mosh",
  },
};
