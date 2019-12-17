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

const users= ()=> tabUsers;
const user= (parent,args)=> {
     const user = tabUsers.find(({id})=> id=== args.id);
     if (user)
         return user;
     throw new Error("no found");
};


module.exports = {
    info,
    users,
    user
};