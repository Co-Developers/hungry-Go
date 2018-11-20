package com.food.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.food.models.Order;

public interface OrderDataService extends JpaRepository<Order, Integer> {

}