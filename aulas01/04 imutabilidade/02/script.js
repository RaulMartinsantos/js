const htmlCourse = {
  course: "HTML",
  students: [{ name: "Raul", email: "raul@email.com" }],
  city: {
    student1: "São paulo",
  },
};

/*const jsCourse = {
  ...htmlCourse,
  course: "Javascript",
};*/

// jsCourse.students.push({ name: "João", email: "joão@email.com" });

const jsCourse = {
  ...htmlCourse,
  course: "Javascript",
  students: [...htmlCourse.students],
  city: { ...htmlCourse.city },
};

jsCourse.students.push({ name: "João", email: "joão@email.com" });
jsCourse.city.student2 = "Londrina";

console.log(htmlCourse, jsCourse);
