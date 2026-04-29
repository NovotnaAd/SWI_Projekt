package com.eshop.config;

import com.eshop.entity.Category;
import com.eshop.entity.Product;
import com.eshop.entity.Supplier;
import com.eshop.repository.CategoryRepository;
import com.eshop.repository.ProductRepository;
import com.eshop.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            
            // 1. Vytvoření kategorie
            Category bags = new Category();
            bags.setNazev("Luxusní kabelky");
            bags.setSlug("luxusni-kabelky");
            bags.setGender("women");
            bags.setImageUrl("https://placehold.co/600x400?text=Kabelky"); 
            categoryRepository.save(bags);

            // 2. Vytvoření dodavatele (aby nebyl supplier_id NULL)
            Supplier supplier = new Supplier();
            supplier.setName("Versace Official");
            supplier.setContactEmail("info@versace.it");
            supplierRepository.save(supplier);

            // 3. Vytvoření produktu
            Product bag = new Product();
            bag.setNazev("Versace Leather Bag");
            bag.setSlug("versace-leather-bag");
            bag.setCena(45000.0);
            bag.setPopis("Limitovaná edice kožené kabelky z italské dílny.");
            bag.setCategory(bags);
            bag.setSupplier(supplier); // Přiřazení dodavatele
            bag.setImageUrl("https://placehold.co/600x400?text=Versace+Bag");
            bag.setGender("women");
            bag.setTag("Luxury");
            
            productRepository.save(bag);
            
            System.out.println("--------------------------------------------------");
            System.out.println(">> ÚSPĚCH: Kategorie, Dodavatel i Produkt nahráni!");
            System.out.println("--------------------------------------------------");
        }
    }
}
