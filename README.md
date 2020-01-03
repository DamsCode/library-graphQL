# The mission was create an api with graphQL:

* Encode the Books:
    * title
    * subtitle (if existed)
    * author(s)
    * editor
    * format
    * language
    * the cover

* manager the users : 
    * create account (with email as identifier)
    * log in/out (we have heard of JWT, that looks interesting) -loan management :
    * a user can borrow up to 5 books, for a month
    * if a book is not returned after the deadline, it will not be able to borrow a new book until it has returned the book

* comments management :
    * the users like to give critics, we would like their reviews to be available with the books
    * each comment will be defined by :
        * a title (optional)
        * a comment
        * a book evaluation(1 to 5)
    * each user can indicate whether, yes or not, the comment seems useful or relevant
    
# list of technologies used

* Server Graph-QL (graphql-yoga)
* Prisma V1
* Mysql
* axios
* jsonwebtoken
    
    