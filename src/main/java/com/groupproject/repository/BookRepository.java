package com.groupproject.repository;

import com.groupproject.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    //find the books by language
    List<Book> findByLanguages_LanguageType(String languageType);

    //find the books by categories
    List<Book> findByCategories_Type(String categoryType);

//    //find the books by authors
//    List<Book> findByAuthors_LastName_FirstName(String lastName, String firstName);
}
