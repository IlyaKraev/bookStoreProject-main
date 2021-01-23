package com.groupproject.entities;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="order_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetails implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_details_id")
    private Long orderDetailsId;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name="order_id",nullable=false)
    private Order order;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name="book_id",referencedColumnName="book_id",nullable=false)
    private Book book;

//    @Column(name="price_after_discount")
//    private double priceAfterDiscount;

    @Column(name="original_price")
    private double originalPrice;

    @Column(name="discount_rate")
    private double discountRate;

    @Column(name="total_price")
    private double totalPrice;

    public OrderDetails(Order order, Book book, double originalPrice, double discountRate, double totalPrice) {
        this.order = order;
        this.book = book;
        this.originalPrice = originalPrice;
        this.discountRate = discountRate;
        this.totalPrice = totalPrice;
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderDetailsId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderDetails that = (OrderDetails) o;

        return orderDetailsId.equals(that.orderDetailsId);
    }
}
