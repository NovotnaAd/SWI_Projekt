package com.eshop.repository;

import com.eshop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Basic finders used by services
    Product findBySlug(String slug);

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findBySupplierId(Long supplierId);

    List<Product> findByGender(String gender);

    Page<Product> findByGender(String gender, Pageable pageable);

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    Page<Product> findBySupplierId(Long supplierId, Pageable pageable);

    boolean existsBySlug(String slug);

    List<Product> findByCenaBetween(Double min, Double max);

    @Query("SELECT p FROM Product p WHERE LOWER(p.nazev) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchByNazev(String query);

    @Query("SELECT p FROM Product p WHERE LOWER(p.nazev) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Product> searchByNazevPaginated(String query, Pageable pageable);

    // JpaRepository already exposes: List<Product> findAll(Sort sort);
}
