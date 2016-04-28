 //Library array for search
    var books = [     
    {name: 'William Shakespeare', title: 'Hamlet', pages:208},
    {name: 'Ray Bradbury', title: 'Martian Chronicals', pages:222},
    {name: 'George RR Martin', title: 'A Game of Thrones', pages:694},
    {name: 'Herman Hesse', title: 'Steppenwolf', pages:237},
    {name: 'Stephen King', title: 'The Shining', pages:447},
    {name: 'Ernest Hemingway' , title: 'The Old Man and The Sea', pages:127}
];

exports.searchArray = function(userinput){

	var searchResults = books.find(function( obj ) {
	    return obj.title == userinput;
	});

	return searchResults;

};


//ADD A BOOK
exports.addBook = function(newBook){
	books.push(newBook);
}


//REMOVE A BOOK
exports.removeBook  = function(deleteBook){

	// 
	for(var i = books.length - 1; i >= 0; i--) {
	    if(books[i].title === deleteBook) {
	       books.splice(i, 1);
	    }
	}

}

//UPDATE A BOOK FROM THE BOOKS OBJECT
exports.updateInfo = function(oldBook, newInfo){
	//variable for found book
	var bookHit = books.indexOf(oldBook);
	//Position in Array
	if(bookHit !== -1) {
		books[bookHit] = newInfo;
	}
	if(books[bookHit] == newInfo){
		return 1;
	}
}