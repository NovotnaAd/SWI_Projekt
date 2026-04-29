package com.eshop.service;

import com.eshop.dto.ProductDTO;
import com.eshop.entity.Category;
import com.eshop.entity.Product;
import com.eshop.entity.Supplier;
import com.eshop.repository.CategoryRepository;
import com.eshop.repository.ProductRepository;
import com.eshop.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    /**
     * Získání všech produktů
     */
    public List<ProductDTO> getAll() {
        return productRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Získání produktu podle ID
     */
    public Optional<ProductDTO> getById(Long id) {
        return productRepository.findById(id)
                .map(this::entityToDTO);
    }

    /**
     * Získání produktu podle slugu (tady byla ta chyba)
     */
    public Optional<ProductDTO> getBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .map(this::entityToDTO);
    }

    /**
     * Produkty podle slugu kategorie
     */
    public List<ProductDTO> getProductsByCategorySlug(String slug) {
        return categoryRepository.findBySlug(slug)
                .map(category -> productRepository.findByCategoryId(category.getId())
                        .stream()
                        .map(this::entityToDTO)
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }

    public List<ProductDTO> getByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getBySupplierId(Long supplierId) {
        return productRepository.findBySupplierId(supplierId)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getByGender(String gender) {
        return productRepository.findByGender(gender)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByCenaBetween(minPrice, maxPrice)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchByNazev(String searchTerm) {
        return productRepository.searchByNazev(searchTerm)
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Stránkované vyhledávání a filtry
     */
    public Page<ProductDTO> getByGenderPaginated(String gender, Pageable pageable) {
        return productRepository.findByGender(gender, pageable)
                .map(this::entityToDTO);
    }

    public Page<ProductDTO> getByCategoryIdPaginated(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryId(categoryId, pageable)
                .map(this::entityToDTO);
    }

    public Page<ProductDTO> searchByNazevPaginated(String searchTerm, Pageable pageable) {
        return productRepository.searchByNazevPaginated(searchTerm, pageable)
                .map(this::entityToDTO);
    }

    /**
     * Vytvoření a aktualizace
     */
    public Optional<ProductDTO> create(ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.getKategorieId()).orElse(null);
        Supplier supplier = null;
        if (productDTO.getSupplierId() != null) {
            supplier = supplierRepository.findById(productDTO.getSupplierId()).orElse(null);
        }

        Product product = new Product();
        updateProductFields(product, productDTO, category, supplier);
        Product saved = productRepository.save(product);
        return Optional.of(entityToDTO(saved));
    }

    public Optional<ProductDTO> update(Long id, ProductDTO productDTO) {
        return productRepository.findById(id)
                .map(product -> {
                    Category category = categoryRepository.findById(productDTO.getKategorieId()).orElse(null);
                    Supplier supplier = null;
                    if (productDTO.getSupplierId() != null) {
                        supplier = supplierRepository.findById(productDTO.getSupplierId()).orElse(null);
                    }
                    updateProductFields(product, productDTO, category, supplier);
                    return entityToDTO(productRepository.save(product));
                });
    }

    public boolean delete(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Pomocné metody pro převod (Místo konstrukčního pekla)
     */
    private ProductDTO entityToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setNazev(product.getNazev());
        dto.setSlug(product.getSlug());
        dto.setCena(product.getCena());
        dto.setPopis(product.getPopis());
        dto.setTag(product.getTag());
        dto.setGender(product.getGender());
        dto.setImageUrl(product.getImageUrl());
        
        if (product.getCategory() != null) {
            dto.setKategorieId(product.getCategory().getId());
            dto.setKategorieNazev(product.getCategory().getNazev());
        }
        if (product.getSupplier() != null) {
            dto.setSupplierId(product.getSupplier().getId());
            dto.setSupplierName(product.getSupplier().getName());
        }
        return dto;
    }

    private void updateProductFields(Product
