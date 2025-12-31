import { MongoBookRepository } from '../services/repositories/mongo/mongo-book.repository.js';
import { CreateBookUseCase } from '../services/usecases/books/create-book.usecase.js';
import { GetBooksUseCase } from '../services/usecases/books/get-books.usecase.js';
import { GetBookByIdUseCase } from '../services/usecases/books/get-book-by-id.usecase.js';
import { EditBookUseCase } from '../services/usecases/books/edit-book.usecase.js';
import { DeleteBookUseCase } from '../services/usecases/books/delete-book.usecase.js';
import { ToggleFavoriteUseCase } from '../services/usecases/books/toggle-favorite.usecase.js';
import { BookController } from '../controllers/book.controllers.js';

const bookRepo = new MongoBookRepository();

const createBook = new CreateBookUseCase(bookRepo);
const getBooks = new GetBooksUseCase(bookRepo);
const getBookById = new GetBookByIdUseCase(bookRepo);
const editBook = new EditBookUseCase(bookRepo);
const deleteBook = new DeleteBookUseCase(bookRepo);
const toggleFavorite = new ToggleFavoriteUseCase(bookRepo);

export const bookController = BookController({
	createBook,
	getBooks,
	getBookById,
	editBook,
	deleteBook,
	toggleFavorite,
});
