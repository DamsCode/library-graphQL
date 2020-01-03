const book = (parent,args,context)=>{
    return context.prisma.comment({ id: parent.id }).book();
};
const user = ()=>{
    return context.prisma.comment({ id: parent.id }).user();
};

const votes = ()=>{
    return context.prisma.comment({ id: parent.id }).votes();
};

module.exports = {
    book,
    user,
    votes,
};