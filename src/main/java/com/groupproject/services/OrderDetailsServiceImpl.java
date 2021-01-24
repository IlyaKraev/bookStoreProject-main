package com.groupproject.services;

import com.groupproject.entities.*;
import com.groupproject.repository.*;
import com.groupproject.requests.OrderDetailsRequest;

import java.util.Date;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static java.util.Objects.isNull;


@Slf4j
@Service
public class OrderDetailsServiceImpl implements IOrderDetailsService {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PricingRepository pricingRepository;
    @Autowired
    private OrderServiceImpl orderServiceImpl;
    @Autowired
    private AccountServiceImpl accountServiceImpl;

    @Override
    public List<OrderDetails> getAll() {

        log.info("Ready to get all orderDetails from the given id");
        return orderDetailsRepository.findAll();
    }

    @Override
    public OrderDetails getOrderDetailsById(Long id) {

        log.info("Ready to get an orderDetails from the given id");
        return orderDetailsRepository.findById(id).orElse(null);
    }

    public List<OrderDetails> getOrderDetailsByOrderId(Long orderId){
        log.info("Ready to get all the Order Details with the orderId {}",orderId);
        return orderDetailsRepository.findByOrder_OrderId(orderId);
    }

    @Override
    public boolean createOrderDetails(OrderDetailsRequest request) {

        Long orderId= request.getOrderId();
        Long bookId= request.getBookId();
        Order order=orderRepository.findById(orderId).orElse(null);
        Book book=bookRepository.findById(bookId).orElse(null);

        //i want to do originalPrice = startingPrice from pricing
        double originalPrice = book.getPricing().getStartingPrice();
//        Date dateNow=new Date();
//        double discountRate = 0;
//        if (book.getPricing().getEndingDate()!=null
//                && book.getPricing().getStartingDate()!=null
//                &&dateNow.after(book.getPricing().getStartingDate())
//                &&dateNow.before(book.getPricing().getEndingDate())) {
//            //i want to do discountRate = discount from pricing
//             discountRate = book.getPricing().getDiscount();
//        }
        //i want to do discountRate = discount from pricing
        double discountRate = book.getPricing().getDiscount();
        //i want to do totalPrice = originalPrice - (originalPrice * discountRate)
        double totalPrice = originalPrice - ( originalPrice * discountRate);

        log.info("Ready to insert a new OrderDetails");
        OrderDetails orderDetails = new OrderDetails(order, book, originalPrice, discountRate, totalPrice);
        // check if the account coins are enough to buy the book
        log.info("Checking if account coins are enough to buy the book");
        if(totalPrice>order.getAccount().getCoins()){
            double orderCoins=order.getTotalCoins();
            log.info("Resetting original coins to account");
            accountServiceImpl.updateAccount(order.getAccount().getAccountId(),order.getAccount().getCoins()+orderCoins);
            log.info("Deleting all orderDetails");
            orderDetailsRepository.deleteInBatch(getOrderDetailsByOrderId(orderId));
            log.info("Deleting the order. It was invalid");
            orderRepository.delete(order);
            return false;
        }
        OrderDetails newOrderDetails = orderDetailsRepository.save(orderDetails);
        log.info("The new orderDetails is {}", newOrderDetails);
        log.info("The orderDetails have been inserted to the DB");
        log.info("Updating order total coins");
        // TODO:adding coins to the account-done. is it ok though?
        order = orderServiceImpl.updateOrder(orderId,totalPrice+order.getTotalCoins());
        orderRepository.save(order);
        return true;
    }

//    @Override    //update method in case we need it
//    public OrderDetails updateOrderDetails(Long id, OrderDetailsRequest request) {
//
//        log.info("Ready to update an existing orderdetails");
//        if (orderDetailsRepository.findById(id).isPresent()) {
//            Long orderId= request.getOrderId();
//            Long bookId= request.getBookId();
//            Order order=orderRepository.findById(orderId).orElse(null);
//            Book book=bookRepository.findById(bookId).orElse(null);
//
//            //i want to do originalPrice = startingPrice from pricing
//            double originalPrice = book.getPricing().getStartingPrice();
//
//
//            OrderDetails existingOrderDetails = orderDetailsRepository.findById(id).get();
//            existingOrderDetails.setOrder(order);
//            existingOrderDetails.setBook(book);
//
//            existingOrderDetails.setDiscountRate(request.getDiscountRate());
//
//            existingOrderDetails.setTotalPrice(request.getTotalPrice());
//
//            if (isNull(request.getTotalPrice())){
//                //i want to do totalPrice = originalPrice - (originalPrice * discountRate)
//                double totalPrice = originalPrice - ( originalPrice * request.getDiscountRate());
//                existingOrderDetails.setTotalPrice(totalPrice);
//                OrderDetails updatedOrderDetails = orderDetailsRepository.save(existingOrderDetails);
//
//                log.info("The updated OrderDetails is {}", updatedOrderDetails);
//                log.info("The updated OrderDetails has been inserted to the DB");
//                return updatedOrderDetails;
//            }
//
//
//
//            OrderDetails updatedOrderDetails = orderDetailsRepository.save(existingOrderDetails);
//
//            log.info("The updated OrderDetails is {}", updatedOrderDetails);
//            log.info("The updated OrderDetails has been inserted to the DB");
//            return updatedOrderDetails;
//        }
//        log.info("The order details have not been inserted to the DB");
//        return null;
//    }

    @Override
    public boolean deleteById(Long id) {
        log.info("Ready to delete an orderDetails");
        if (orderDetailsRepository.existsById(id)) {
            Long orderId= orderDetailsRepository.findById(id).orElse(null).getOrder().getOrderId();
            Order order=orderRepository.findById(orderId).orElse(null);
            double totalCoins=orderDetailsRepository.findById(id).orElse(null).getTotalPrice();
            orderDetailsRepository.deleteById(id);
            log.info("orderDetails deleted successfully");
            log.info("Updating order total coins");
            order = orderServiceImpl.updateOrder(orderId,order.getTotalCoins()-totalCoins);
            orderRepository.save(order);
            return true;
        }
        log.info("orderDetails has not deleted successfully");
        return false;
    }
}
