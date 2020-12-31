package com.groupproject.requests;

import com.groupproject.entities.Account;
import com.groupproject.entities.OrderDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    private LocalDateTime orderDate;
    private Account account;
    private double totalCoins;
    private Set<OrderDetails> orderDetails;

}
