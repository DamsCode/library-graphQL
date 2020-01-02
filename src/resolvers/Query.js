
const users = (parent,args,context)=> {
    const users = context.prisma.users();
    return users;
};
const user = (parent,args,context)=> {
     const user = context.prisma.user({id:args.id});
     if (user)
         return user;
     throw new Error("no found");
};

const books= (parent,args,context)=> {
    const books = context.prisma.books();
    return books;
};

module.exports = {
    users,
    user,
    books
};