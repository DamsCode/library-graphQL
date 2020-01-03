const book = (parent,args,context)=>{
    return context.prisma.rent({ id: parent.id }).book();
};
const user = ()=>{
    return context.prisma.rent({ id: parent.id }).user();
};

module.exports = {
    book,
    user,
};