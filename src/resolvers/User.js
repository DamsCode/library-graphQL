const comments = (parent,args,context)=>{
    return context.prisma.user({ id: parent.id }).comments();
};

const rent = (parent,args,context)=>{
    return context.prisma.user({ id: parent.id }).rent();
};

module.exports = {
    comments,
    rent,
};