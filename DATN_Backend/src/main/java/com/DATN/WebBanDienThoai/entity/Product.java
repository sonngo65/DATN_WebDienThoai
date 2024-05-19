package com.DATN.WebBanDienThoai.entity;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import com.DATN.WebBanDienThoai.payload.StatisticSale;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NamedNativeQuery(name = "Product.getStatisticSalesAll", query = "SELECT SUM(quantity) as sales,null as date from orders Inner Join order_detail On orders.id = order_detail.order_id", resultSetMapping = "Mapping.StatisticSales")
@NamedNativeQuery(name = "Product.getStatisticErningAll", query = "SELECT SUM(order_detail.quantity * option_detail.price) as erning,null as date from orders Inner Join order_detail On orders.id = order_detail.order_id Inner join option_detail on  option_detail.id = order_detail.option_detial_id where orders.status = 3", resultSetMapping = "Mapping.StatisticErning")

@NamedNativeQuery(name = "Product.getStatisticSales", query = "SELECT count(*) as sales,date_trunc( :groupTime , order_date ) as date\r\n"
		+ "from orders Inner Join order_detail On orders.id = order_detail.order_id \r\n"
		+ "where date_trunc( :durationTime , order_date) >= date_trunc( :durationTime , now() - ( :preTime )\\:\\:interval)  AND orders.status = 3 \r\n"
		+ "group by date order by date DESC ", resultSetMapping = "Mapping.StatisticSales")
@SqlResultSetMapping(name = "Mapping.StatisticSales", classes = @ConstructorResult(targetClass = StatisticSale.class, columns = {
		@ColumnResult(name = "sales", type = Long.class), @ColumnResult(name = "date", type = Date.class) }))

@NamedNativeQuery(name = "Product.getStatisticErning", query = "SELECT SUM(order_detail.quantity * order_detail.price) as erning,date_trunc( :groupTime , order_date ) as date\r\n"
		+ "from orders Inner Join order_detail On orders.id = order_detail.order_id Inner join option_detail On order_detail.option_detial_id = option_detail.id \r\n"
		+ "where date_trunc( :durationTime , order_date) >= date_trunc( :durationTime , now() - ( :preTime )\\:\\:interval) AND orders.status = 3 \r\n"
		+ "group by date order by date DESC ", resultSetMapping = "Mapping.StatisticErning")
@SqlResultSetMapping(name = "Mapping.StatisticErning", classes = @ConstructorResult(targetClass = StatisticErning.class, columns = {
		@ColumnResult(name = "erning", type = Double.class), @ColumnResult(name = "date", type = Date.class) }))

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private String name;
	@Column(columnDefinition = "text")
	private String content;
	@Column(columnDefinition = "text")
	private String summary;
	private boolean isBestSell;
	private boolean isFalseSale;
	private double price;
	private double originalPrice;
	private Double flashSalePrice;
	private String stickerImage;
	private String endow;
	private String image;
	private Date time;
	private Integer status;
	private String specification;
	@OneToMany(mappedBy = "product")
	private Set<Comment> comments;
	@ManyToMany(mappedBy = "products",cascade = CascadeType.ALL)
	private Set<Category> categories;

	@ManyToOne
	@JoinColumn(name = "vendor_id")
	private Vendor vendor;

	@OneToMany(mappedBy = "product")
	private Set<Option> options;

	@OrderBy
	@OneToMany(mappedBy = "product")
	private Set<OptionDetail> optionDetails;
	
	@ManyToOne
	@JoinColumn(name = "flash_sale_id")
	private FlashSale flashSale;

}
