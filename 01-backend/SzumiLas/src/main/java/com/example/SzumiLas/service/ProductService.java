package com.example.SzumiLas.service;

import com.example.SzumiLas.dao.ProductCategoryRepository;
import com.example.SzumiLas.dao.ProductRepository;
import com.example.SzumiLas.dto.ProductDTO;
import com.example.SzumiLas.entity.Image;
import com.example.SzumiLas.entity.Product;
import com.example.SzumiLas.entity.ProductCategory;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    @Value("${fileserver.url}")
    private String FOLDER_PATH;

    private ProductRepository repository;
    private ProductCategoryRepository categoryRepository;

    private ImageService imageService;
    @Autowired
    ProductService(ProductRepository repository, ProductCategoryRepository categoryRepository, ImageService imageService) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.imageService = imageService;
    }
    @Transactional
    public Product placeProduct(ProductDTO productDTO, List<MultipartFile> files) {

        Product product = new Product();

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setUnitPrice((productDTO.getUnitPrice()));
        product.setImageUrl((productDTO.getImageUrl()));

        String categoryName = productDTO.getCategory();
        ProductCategory category = this.categoryRepository.findByCategoryName(categoryName);

        product.setCategory(category);

        if (files != null) {

            var images = files.stream().map(file -> {
                try {
                    this.imageService.createFile(file);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                var image = Image.builder()
                        .product(product)
                        .url("assets/" + file.getOriginalFilename())
                        .build();
                return image;
            }).toList();

            product.setImages(images);
        }
        this.repository.save(product);

        return product;
    }

    @Transactional
    public void deleteProduct(Long id) {
        this.repository.findById(id).ifPresent(product->{
            for(Image image : product.getImages()) {
                this.imageService.deleteImageFile(image);
            }
            this.repository.deleteById(id);
        });
    }
}
