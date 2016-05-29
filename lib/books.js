 //Library array for search
    var books = [     
    {id: 0, name: 'William Shakespeare', title: 'hamlet', pages:208, digital:false},
    {id: 1, name: 'Ray Bradbury', title: 'the martian chronicals', pages:222,  digital:true},
    {id: 2, name: 'George R.R. Martin', title: 'a game of thrones', pages:694, digital:false},
    {id: 3, name: 'Herman Hesse', title: 'steppenwolf', pages:237, digital:true},
    {id: 4, name: 'Stephen King', title: 'the shining', pages:447, digital:true},
    {id: 5, name: 'Ernest Hemingway' , title: 'the old man and the sea', pages:127, digital:false}
];

//Variables
var booksLength = books.length;
//var displayMsg = '';


//EVERY BOOK IN LIBRARY
exports.getLibrary = function(bookTitle){
	return books;
};

//Find Specific Book
exports.getBook = function(title){
	return books.find(function(x){
		return x.title === title;
	});
};

//SEARCH OBJECT BY BOOK TITLE
// var searchBooks = function(userInput){
// 		var userSearch = function(obj){
// 			var title = obj.title.toLowerCase();
// 			return title === userInput();
// 		};
// 		return books.find(userSearch);
//  };

// exports.findBook = function(userInput){
//     var x = books.indexOf(searchBooks(userInput));
//     return books[x];
// };


//ADD A BOOK
exports.addBook = function(newBook){
	 var bookMatch = false;
	 books.forEach(function(x,y){
        if (x.title == newBook.title) {
            books[y] = newBook;
            bookMatch = true;
        }
    });
    if (!bookMatch) {
        newBook.id = booksLength;
        books.push(newBook);
    }
};



//REMOVE A BOOK
exports.removeBook = function(title){
	//log book title on console to note its removal
	console.log(title);
	//ForEach function to remove any Book that fits the params
	books.forEach(function(x,y){
		if (x.title == title){
			books.splice(y, 1);
		}
	});

}

// //UPDATE A BOOK FROM THE BOOKS OBJECT
// exports.updateInfo = function(oldBook, newInfo){
// 	//variable for found book
// 	var bookHit = books.indexOf(oldBook);
// 	//Position in Array
// 	if(bookHit !== -1) {
// 		books[bookHit] = newInfo;
// 	}
// 	if(books[bookHit] == newInfo){
// 		return 1;
// 	}

// };
