package com.eshop.repository;

import com.eshop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByCenaBetween(Double min, Double max);

    @Query("SELECT p FROM Product p WHERE LOWER(p.nazev) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchByNazev(String query);

    @Query("SELECT p FROM Product p WHERE LOWER(p.nazev) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Product> searchByNazevPaginated(String query, Pageable pageable);
}
