package com.groupproject.repository;

import com.groupproject.entities.Author;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    List<Author> findByCountry(String country);
}
