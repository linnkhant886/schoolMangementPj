import { PrismaClient } from "../src/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const start = new Date("2025-08-02T09:00:00");
  const end = new Date("2025-08-02T10:00:00");

  const grades = await Promise.all(
    [1, 2, 3, 4, 5, 6].map((level) => prisma.grade.create({ data: { level } }))
  );

  const teachers = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.teacher.create({
        data: {
          id: `T${i + 1}`,
          username: faker.internet.userName(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
          birthday: faker.date.birthdate({ min: 30, max: 60, mode: "age" }),
        },
      })
    )
  );

  const classes = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.class.create({
        data: {
          name: `Class-${i + 1}`,
          capacity: 30,
          supervisorId: teachers[i % teachers.length].id,
          gradeId: grades[i % grades.length].id,
        },
      })
    )
  );

  const parents = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.parent.create({
        data: {
          id: `P${i + 1}`,
          username: faker.internet.userName(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
        },
      })
    )
  );

  const students = [];
  for (let i = 0; i < 30; i++) {
    const parent = parents[i % parents.length];
    const classObj = classes[i % classes.length];

    const student = await prisma.student.create({
      data: {
        id: `S${i + 1}`,
        username: faker.internet.userName(),
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        bloodType: faker.helpers.arrayElement(["A", "B", "AB", "O"]),
        sex: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        birthday: faker.date.birthdate({ min: 10, max: 15, mode: "age" }),
        parentId: parent.id,
        classId: classObj.id,
        gradeId: classObj.gradeId,
      },
    });

    students.push(student);
  }

  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  const subjects = await Promise.all(
    subjectData.map((subject) => prisma.subject.create({ data: subject }))
  );

  const lessons = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.lesson.create({
        data: {
          name: `${subjects[i % subjects.length].name} Lesson`,
          day: faker.helpers.arrayElement([
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
          ]),
          startTime: start,
          endTime: end,
          subjectId: subjects[i % subjects.length].id,
          classId: classes[i % classes.length].id,
          teacherId: teachers[i % teachers.length].id,
        },
      })
    )
  );

  const exams = await Promise.all(
    lessons.map((lesson, i) =>
      prisma.exam.create({
        data: {
          title: `Exam ${i + 1}`,
          startTime: start,
          endTime: end,
          lessonId: lesson.id,
        },
      })
    )
  );

  const assignments = await Promise.all(
    lessons.map((lesson, i) =>
      prisma.assignment.create({
        data: {
          title: `Assignment ${i + 1}`,
          startDate: start,
          dueDate: end,
          lessonId: lesson.id,
        },
      })
    )
  );

  // const results = []
  for (const student of students.slice(0, 20)) {
    const studentIndex = parseInt(student.id.substring(1)) - 1;
    await prisma.result.create({
      data: {
        score: faker.number.int({ min: 50, max: 100 }),
        examId: exams[studentIndex % exams.length]?.id ?? null,
        studentId: student.id,
      },
    });
    await prisma.result.create({
      data: {
        score: faker.number.int({ min: 60, max: 100 }),
        assignmentId:
          assignments[studentIndex % assignments.length]?.id ?? null,
        studentId: student.id,
      },
    });
  }

  await Promise.all(
    students.slice(0, 20).map((student, i) =>
      prisma.attendance.create({
        data: {
          date: start,
          present: faker.datatype.boolean(),
          studentId: student.id,
          lessonId: lessons[i % lessons.length].id,
        },
      })
    )
  );

  await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.event.create({
        data: {
          title: `Event ${i + 1}`,
          description: faker.lorem.sentence(),
          startTime: start,
          endTime: end,
          classId: classes[i % classes.length].id,
        },
      })
    )
  );

  await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.announcement.create({
        data: {
          title: `Announcement ${i + 1}`,
          description: faker.lorem.sentence(),
          date: start,
          classId: classes[i % classes.length].id,
        },
      })
    )
  );

  await prisma.admin.create({
    data: {
      id: "A001",
      username: "admin",
    },
  });
  await prisma.admin.create({
    data: {
      id: "A002",
      username: "admin2",
    },
  });

  console.log("✅ All models seeded with fake data!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
