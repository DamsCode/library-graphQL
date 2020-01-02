const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');
const { addMonths } = require('date-fns');

const signup = async (parent,args,context)=>{

    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user,
    }
};

const login = async (parent,args,context) => {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    }
};

const borrow  = async (parent,args,context) => {
    const userid = getUserId(context);
    const bookwithrent = await context.prisma
        .book({id:args.idBook})
        .rent();

    if (bookwithrent.length !== 0 &&!bookwithrent.isBack){
        throw new Error('This book is already rented');
    }

    const userwithrent = await context.prisma
        .user({id:userid})
        .rent();

    let date = new Date();
    const nowd = new Date();

    const countofrent = userwithrent.forEach(async e =>{
        date.setDate(addMonths(e.rentAt,1));
        if(!e.isBack && date < nowd);
        {
            const book = await context.prisma.rent({id:e.id}).book();
            throw new Error(`You must return the book ${book.title}  before you can rent another one`);
        }
    });


    userwithrent.filter(e =>{
        date.setDate(addMonths(e.rentAt,1));
        if(!e.isBack && date <= nowd);
        {
            return true
        }
    }).length;

    if(countofrent < 5){
        return context.prisma.createRent({
            book:{connect: {id:args.idBook}},
            user:{connect: {id:userid}},
            rentAt: new Date(),
            backAt:null
        });
    }
    throw new Error('You have already rented 5 books this month');
};

module.exports = {
    signup,
    login,
    borrow,
};