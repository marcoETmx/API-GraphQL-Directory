"Valida llos tipos de nivel"
enum Level{
    principiante
    intermedio
    avanzado
}

union GlobalSearch = Course | Student | Monitor

type Course {
    _id: ID!
    title: String
    teacher: String
    description: String
    topic: String
    people: [Student]
    level: Level
}

interface Person{
     _id: ID!
    name: String!
    email: String!
}

type Student implements Person{
    _id: ID!
    name: String!
    email: String!
    avatar: String
}

type Monitor implements Person{
    _id: ID!
    name: String!
    email: String!
    phone: String
}


type Query {
    "Devuelve todos los cursos"
    getCourses: [Course]
     "Devuelve un curso"
    getCourse(id: ID!): Course
    "Devuelve todos los estudiates"
    getPeople: [Person]
     "Devuelve un estudiante"
    getPerson(id: ID!): Person
    "Ejecuta una busqueda blogal"
    searchItems(keyword: String!) : [GlobalSearch]
}

input CourseInput{
    title: String!
    teacher: String!
    description: String!
    topic: String
    level: Level
}

input CourseEditInput{
      title: String
    teacher: String
    description: String
    topic: String
}

input PersonInput{
    name: String!
    email: String!
    avatar: String
    phone: String
}

input PersonEditInput{
    name: String
    email: String
     avatar: String
    phone: String
}

type Mutation {
    "Crea un curso"
    createCourse(input: CourseInput!): Course
    "Edita un curso"
    editCourse(_id: ID!, input: CourseEditInput!): Course
    "Crea un persona"
    createPerson(input: PersonInput!): Person
    "Edita un persona"
    editPerson(_id: ID!, input: PersonEditInput!): Person
    "Agrega una persona a un curso"
    addPeople(courseId: ID!, personId: ID!): Course
}