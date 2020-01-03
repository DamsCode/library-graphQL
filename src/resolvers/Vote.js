const comment = (parent,args,context)=>{
    return context.prisma.vote({ id: parent.id }).comment();
};

const user = (parent,args,context)=>{
    return context.prisma.vote({ id: parent.id }).user();
};

module.exports = {
    comment,
    user,
};