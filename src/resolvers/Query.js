

const tabUsers = [{
        id: "66",
        name: "dams",
        email: "d.maacors",
        comments:[],
        borrowBooks:[],
    },
    {
        id: "66s",
        name: "damss",
        email: "d.maacorss",
        comments:[],
        borrowBooks:[],
    }];

const tabBooks = [{
    id: "999",
    title: "lola",
    subtitle: null,
    authors: ["jean-claude"],
    format: "poche",
    cover: "ecezczeczececzeczecczec",
    nbcopy: 5,
    comments:[],
    borrowBy:[{
        id: "66",
        name: "dams",
        email: "d.maacors",
        comments:[],
        borrowBooks:[],
    }],
    rentdate:new Date(),
}];

const users= ()=> tabUsers;
const user= (parent,args)=> {
     const user = tabUsers.find(({id})=> id=== args.id);
     if (user)
         return user;
     throw new Error("no found");
};
const books= ()=> tabBooks;

module.exports = {
    users,
    user,
    books
};