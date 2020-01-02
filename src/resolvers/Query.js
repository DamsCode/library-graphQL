const FeedBooks = async (parent,args,context) => {
    const where = args.filter ? {
        OR: [
            { title_contains: args.filter },
            { editor_contains: args.filter },
            { isbn_contains: args.filter },
            { format_contains: args.filter },
            { language_contains: args.filter },
        ],
    } : {};
    const books = await context.prisma.books({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
    });
    const count = await context.prisma
        .booksConnection({
            where,
        })
        .aggregate()
        .count();
    return {
        books,
        count,
    }
};

module.exports = {
    FeedBooks,
};