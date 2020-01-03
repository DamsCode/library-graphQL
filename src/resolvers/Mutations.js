const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');
const addMonths  = require('date-fns/addMonths');
const parseISO  = require('date-fns/parseISO');

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

    const nowd = new Date();

    await userwithrent.forEach(async e => {
        let date = new Date(addMonths(parseISO(e.rentAt),1));
        if(!e.isBack && date < nowd)
        {
            const book = await context.prisma.rent({id:e.id}).book();
            throw new Error(`You must return the book ${book.title}  before you can rent another one`);
        }
    });


    const countofrent = userwithrent.filter(rent => !rent.isBack).length;

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

const addcomment = async (parent,args,context)=>{
    const userid = getUserId(context);

    const commentExists = await context.prisma.$exists.comment({
        user: { id: userid },
        book: { id: args.idBook },
    });

    if (commentExists){
        throw new Error('You have already comment this book');
    }

    if (isNaN(args.bookeval)){
        throw new Error('Bookeval must be a NUMBER');
    }

    return context.prisma.createComment({
        book:{connect: {id:args.idBook}},
        user:{connect: {id:userid}},
        bookeval:args.bookeval,
        title:args.title,
        comment:args.comment
    });
};

const addvote = async (parent,args,context)=>{
    const userid = getUserId(context);

    const voteExists = await context.prisma.$exists.vote({
        user: { id: userid },
        comment: { id: args.idComment },
    });

    if (voteExists){
        throw new Error('You have already vote for this book');
    }

    return context.prisma.createVote({
        comment:{connect: {id:args.idComment}},
        user:{connect: {id:userid}},
        usefull:args.usefull
    });
};

module.exports = {
    signup,
    login,
    borrow,
    addcomment,
    addvote,
};