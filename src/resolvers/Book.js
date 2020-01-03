const comments = (parent,args,context)=>{
    return context.prisma.book({ id: parent.id }).comments();
};

const rents = (parent,args,context)=>{
    return context.prisma.book({ id: parent.id }).rents();
};

module.exports = {
    comments,
    rents,
};