package com.DATN.WebBanDienThoai.repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Orders;

import jakarta.persistence.criteria.Order;

@Repository
public interface OrderRepository extends JpaRepository<Orders, UUID>{
	
	Page<Orders> findAllByOrderByOrderDateDesc(Pageable paging);
	
	@Query(value = "SELECT * FROM orders WHERE customer_id = :accountId ORDER BY order_date DESC",nativeQuery= true)
	List<Orders> findAllByAccountId(@Param("accountId") UUID accountId);
	
	@Query(value = "SELECT count(*) FROM orders  WHERE status = 3",nativeQuery=true)
	Long getTotalOrders();
	
	@Query(value = "SELECT sum(o_d.quantity*o_d.price) FROM orders o INNER JOIN order_detail o_d ON o.id = o_d.order_id WHERE o.status = 3",nativeQuery = true)
	Long getTotalErning();
	
	@Query(value = "SELECT count(*) FROM orders  WHERE status = 3 And order_filter(:start,:end,order_date)",nativeQuery=true)
	Long getTotalOrders(@Param("start") Date start,@Param("end") Date end);

	@Query(value = "SELECT sum(o_d.quantity*o_d.price) "
			+ "FROM orders o INNER JOIN order_detail o_d "
			+ "ON o.id = o_d.order_id "
			+ "WHERE o.status = 3 And order_filter(:start,:end,order_date)",nativeQuery = true)
	Long getTotalErning(@Param("start") Date start,@Param("end") Date end );
	
	@Query(value = "SELECT sum(o_d.quantity) "
			+ "FROM orders o INNER JOIN order_detail o_d "
			+ "ON o.id = o_d.order_id "
			+ "WHERE o.status = 3 And order_filter(:start,:end,order_date)",nativeQuery = true)
	Long getTotalSaleProducts(@Param("start") Date start,@Param("end") Date end);
	
	@Query(value = "SELECT * FROM orders o  WHERE o.status = 3 And order_filter(:start,:end,order_date) order by order_date desc",nativeQuery=true)
	Page<Orders> getOdersStatistic(@Param("start") Date start,@Param("end") Date end,Pageable paging); 
	@
	Query(value = "SELECT * FROM orders o  WHERE order_filter(:start,:end,order_date) order by order_date desc",nativeQuery=true)
	Page<Orders> getOdersByDurationTime(@Param("start") Date start,@Param("end") Date end,Pageable paging); 
	
}
