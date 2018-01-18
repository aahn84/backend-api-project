const filePath = './books.json';
const fs = require('fs');
const ids = require('short-id');

let books = [
  {
    id: ids.generate(),
    name: "The Grapes of Wrath",
    borrowed: "no",
    description: "The Pulitzer Prize-winning epic of the Great Depression, a book that galvanized—and sometimes outraged—millions of readers.",
    authors: [
      {
      id: ids.generate(),
      first_name: "John",
      last_name: "Steinbeck"
      }
    ]
  },
  {
    id: ids.generate(),
    name: "Of Mice and Men",
    borrowed: "yes",
    description: "An unlikely pair, George and Lennie, two migrant workers in California during the Great Depression, grasp for their American Dream.",
    authors: [
      {
      id: ids.generate(),
      first_name: "John",
      last_name: "Steinbeck"
      }
    ]
  },
  {
    id: ids.generate(),
    name: "The Catcher in the Rye",
    borrowed: "yes",
    description: "The hero-narrator of THE CATCHER IN THE RYE is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days.",
    authors: [
      {
      id: ids.generate(),
      first_name: "J.D.",
      last_name: "Salinger"
      }
    ]
  },
]

fs.writeFileSync(filePath, JSON.stringify(books));
console.log(JSON.parse(fs.readFileSync(filePath)));
