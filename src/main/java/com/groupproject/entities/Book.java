package com.groupproject.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="books")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="book_id")
    private Long bookId;

    @Column(name = "title")
    private String title;

    @Column(name="pages")
    private String pages;

    @Column(name="publication_date")
    private Date publicationDate;

    @Column(name="description",length=10000)
    private String description;

    @Column(name="rating")
    private double rating;

    @Column(name="isbn13")
    private String isbn13;

    //book_pricing_id(fk)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="pricing_id",referencedColumnName = "pricing_id")
    private Pricing pricing;

    //author_id(fk)
    //@JsonIgnore
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name="book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id"))
    private Set<Author> authors;

    //publisher_id(fk) ??
    @ManyToOne
    @JoinColumn(name="publisher_id",nullable=false)
    private Publisher publisher;

    //categories_id(fk)
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name="book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories;

    //languages_id(fk)
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name="book_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id"))
    private Set<Language> languages;


    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private Set<OrderDetails> orderDetails;

    public Book(String title, String pages, Date publicationDate, String description,
                double rating, String isbn13, Pricing pricing, Set<Author> authors,
                Publisher publisher, Set<Category> categories, Set<Language> languages) {
        this.title = title;
        this.pages = pages;
        this.publicationDate = publicationDate;
        this.description = description;
        this.rating = rating;
        this.isbn13 = isbn13;
        this.pricing = pricing;
        this.authors = authors;
        this.publisher = publisher;
        this.categories = categories;
        this.languages = languages;
    }

    public Book(String title, String pages, Date publicationDate, String description,
                double rating, String isbn13, Pricing pricing, Publisher publisher) {
        this.title = title;
        this.pages = pages;
        this.publicationDate = publicationDate;
        this.description = description;
        this.rating = rating;
        this.isbn13 = isbn13;
        this.pricing = pricing;
        this.publisher = publisher;
    }

    @Override
    public int hashCode() {

        return Objects.hashCode(bookId);
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        Book other = (Book) obj;
        return Objects.equals(bookId, other.bookId);
    }
}
