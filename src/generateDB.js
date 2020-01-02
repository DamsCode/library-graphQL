const { prisma } = require('./generated/prisma-client');
const axios = require('axios');

async function main() {

    // axios.baseURL = 'https://openlibrary.org/';

    const rep = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:9780573800771&jscmd=data&format=json');
    console.log(rep.data);
    let book = null;

    // for (var isbn in data) {
    //     // skip loop if the property is from prototype
    //     if (!data.hasOwnProperty(isbn)) continue;
    //     book = data[isbn];
    // }
    //
    // const newBook = await prisma.createBook({
    //     isbn: book.identifiers.isbn_13[0],
    //     title: book.title,
    //     editor: book.publishers[0].name,
    //     authors:{set : book.authors.map(e => e.name)} ,
    //     language : "English",
    //     format: "digital",
    //     cover: book.cover.large,
    //     comments:null,
    //     rent: null,
    // });
    // const newComment = await prisma.createComment({
    //     comment: "Super livre !!",
    //     bookeval: 3
    //     book: Book!
    //     user: User!
    //     usefull: Int
    //     notusefull:Int
    // });
     console.log(`Created new book: ${newBook.title} (ID: ${newBook.id})`);
    //
    // // Read all links from the database and print them to the console
    // const allUsers = await prisma.books();
    // console.log(allUsers);
}

main().catch(e => console.error(e));
