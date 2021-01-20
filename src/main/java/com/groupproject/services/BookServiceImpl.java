package com.groupproject.services;

import com.groupproject.entities.Author;
import com.groupproject.entities.Book;
import com.groupproject.entities.Category;
import com.groupproject.entities.Language;
import com.groupproject.entities.Pricing;
import com.groupproject.entities.Publisher;
import com.groupproject.repository.AuthorRepository;
import com.groupproject.repository.BookRepository;
import com.groupproject.repository.CategoryRepository;
import com.groupproject.repository.LanguageRepository;
import com.groupproject.repository.OrderDetailsRepository;
import com.groupproject.repository.PricingRepository;
import com.groupproject.repository.PublisherRepository;
import com.groupproject.requests.BookRequest;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class BookServiceImpl implements IBookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private PricingRepository pricingRepository;

    @Autowired
    private PublisherRepository publisherRepository;

    // list of books
    @Override
    public List<Book> getAll() {

        log.info("Ready to find all the books");
        return bookRepository.findAll();
    }

    // get book by id
    @Override
    public Book getBookById(Long id) {

        log.info("Ready to find a Book by id");
        return bookRepository.findById(id).orElse(null);
    }

    // create a new book ??
    @Override
    public void createNewBook(BookRequest request) {

        log.info("Ready to create a new Book");

        log.info("Ready to find the price");
        Long pricingId = request.getPricingId();
        Pricing pricing = pricingRepository.findById(pricingId).orElse(null);
        log.info("The Price is {}", pricing);

        log.info("Ready to find the publiser");
        Long publisherId = request.getPublisherId();
        Publisher publisher = publisherRepository.findById(publisherId).orElse(null);
        log.info("The publiser is {}", publisher);

        //find the Authors and add them to a list
        log.info("Ready to find the authors");
        List<Long> authorsIds = request.getAuthorIds();
        Set<Author> authorsSet = new HashSet<>();
        for (Long current : authorsIds) {
            Author author = authorRepository.findById(current).orElse(null);
            log.info("The author is {}", author);
            authorsSet.add(author);
        }
        //find the Categories and them to a list
        log.info("Ready to find the categories");
        List<Long> categoriesIds = request.getCategoryIds();
        Set<Category> categorySet = new HashSet<>();
        for (Long current : categoriesIds) {
            Category category = categoryRepository.findById(current).orElse(null);
            log.info("The category is {}", category);
            categorySet.add(category);
        }
        //find the Languages and add them to a list
        log.info("Ready to find the languages");
        List<Long> languagesIds = request.getLanguageIds();
        Set<Language> languageSet = new HashSet<>();
        for (Long current : languagesIds) {
            Language language = languageRepository.findById(current).orElse(null);
            log.info("The language is {}", language);
            languageSet.add(language);
        }
//        //find the OrderDetails and them to a list
//        List<Long> orderDetailsIds=request.getOrderDetailsIds();
//        Set<OrderDetails> orderDetailsSet=new HashSet<>();
//        for (Long current:orderDetailsIds){
//            OrderDetails orderDetails=orderDetailsRepository.findById(current).orElse(null);
//            log.info("The Order Details is {}",orderDetails);
//            orderDetailsSet.add(orderDetails);
//        }

        log.info("Ready to save the new Book");
        Book book = new Book(request.getTitle(), request.getPages(),
                request.getPublicationDate(), request.getDescription(), request.getRating(),
                request.getIsbn13(), pricing, authorsSet, publisher, categorySet, languageSet);
        bookRepository.save(book);
        log.info("The book has been saved successfully");
    }

    //update
    @Override
    public Book updateBook(Long id, BookRequest request) {

        log.info("Ready to create a new Book");

        Long pricingId = request.getPricingId();
        Pricing pricing = pricingRepository.findById(pricingId).orElse(null);

        Long publisherId = request.getPublisherId();
        Publisher publisher = publisherRepository.findById(publisherId).orElse(null);

        //find the Authors and add them to a list
        List<Long> authorsIds = request.getAuthorIds();
        Set<Author> authorsSet = new HashSet<>();
        for (Long current : authorsIds) {
            Author author = authorRepository.findById(current).orElse(null);
            log.info("The author is {}", author);
            authorsSet.add(author);
        }
        //find the Categories and them to a list
        List<Long> categoriesIds = request.getCategoryIds();
        Set<Category> categorySet = new HashSet<>();
        for (Long current : categoriesIds) {
            Category category = categoryRepository.findById(current).orElse(null);
            log.info("The category is {}", category);
            categorySet.add(category);
        }
        //find the Languages and them to a list
        List<Long> languagesIds = request.getLanguageIds();
        Set<Language> languageSet = new HashSet<>();
        for (Long current : languagesIds) {
            Language language = languageRepository.findById(current).orElse(null);
            log.info("The language is {}", language);
            languageSet.add(language);
        }

        Book existingBook = bookRepository.findById(id).orElse(null);
        existingBook.setTitle(request.getTitle());
        existingBook.setPages(request.getPages());
        existingBook.setPublicationDate(request.getPublicationDate());
        existingBook.setDescription(request.getDescription());
        existingBook.setRating(request.getRating());
        existingBook.setIsbn13(request.getIsbn13());
        existingBook.setPricing(pricing);
        existingBook.setAuthors(authorsSet);
        existingBook.setPublisher(publisher);
        existingBook.setCategories(categorySet);
        existingBook.setLanguages(languageSet);
        Book updatedBook = bookRepository.save(existingBook);
        log.info("The updated book is {}", updatedBook);
        log.info("The updated Book has been inserted to the DB");

        return updatedBook;
    }

//    // update an existing book by id ??
//    @Override
//    public BookRequest updateBook(Long id, BookRequest request) {
//        log.info("Ready to update an existing book");
//        if (bookRepository.findById(id).isPresent()){
//            Book existingBook=bookRepository.findById(id).get();
//            existingBook.setTitle(request.getTitle());
//            existingBook.setDescription(request.getDescription());
//            existingBook.setRating(request.getRating());
//            existingBook.setIsbn13(request.getIsbn13());
//            existingBook.setPricing(request.getPricing());
//            existingBook.setAuthors(request.getAuthors());
//            existingBook.setPublisher(request.getPublisher());
//            existingBook.setCategories(request.getCategories());
//            existingBook.setLanguages(request.getLanguages());
//            existingBook.setOrderDetails(request.getOrderDetails());
//            Book updatedBook=bookRepository.save(existingBook);
//            log.info("The updated book is {}",updatedBook);
//            log.info("The updated Book has been inserted to the DB");
//            return new BookRequest(updatedBook.getTitle(), updatedBook.getPages(),
//                    updatedBook.getPublicationDate(), updatedBook.getDescription(),
//                    updatedBook.getRating(), updatedBook.getIsbn13(), updatedBook.getPublisher(),
//                    updatedBook.getPricing(), updatedBook.getAuthors(), updatedBook.getCategories(),
//                    updatedBook.getLanguages(), updatedBook.getOrderDetails());
//        }
//        log.info("The account has not been inserted to the DB");
//        return null;
//    }

    @Override
    public boolean deleteBookById(Long id) {

        log.info("Ready to delete a book");
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            log.info("book deleted successfully");
            return true;
        }
        log.info("book has not deleted successfully");
        return false;
    }
}
