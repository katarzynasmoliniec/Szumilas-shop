package com.example.SzumiLas.service;

import com.example.SzumiLas.dao.ImageRepository;
import com.example.SzumiLas.dao.ProductRepository;
import com.example.SzumiLas.dto.ImageDTO;
import com.example.SzumiLas.entity.Image;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Value("${fileserver.url}")
    private String FOLDER_PATH;
    @Autowired
    private ImageRepository imageRepository;

    @Value("${spring.data.rest.base-path}")
    private String basePath;

    @Value("${origin.url}")
    private String originUrl;

    @Autowired
    private ServerProperties serverProperties;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public String uploadImageToFileSystem(MultipartFile file, Long productId){

        return productRepository.findById(productId).map(product -> {
            try {
                var filePath = createFile(file);
                imageRepository.save(Image.builder()
                        .product(product)
                        .url("assets/"+file.getOriginalFilename()).build());
                return "file uploaded successfully : " + filePath;
            } catch (IOException e) {
                return "something went wrong";
            }
        }).orElse("something went wrong");

    }

    public String createFile(MultipartFile file) throws IOException {
        String filePath= FOLDER_PATH +"assets/"+ file.getOriginalFilename();
        Path path = Paths.get(filePath).toAbsolutePath();
        file.transferTo(path.toFile());
        return filePath;
    }

    @Transactional
    public String uploadMultipleImagesToFileSystem(List<MultipartFile> files, Long productId) throws IOException {
        StringBuilder messageBuilder = new StringBuilder();
        for (MultipartFile file: files
        ) {
            messageBuilder.append(this.uploadImageToFileSystem(file, productId));
        }
        return messageBuilder.toString();
    }

    public byte[] downloadImageFromFileSystem(Long id) throws IOException {
        Optional<Image> fileData = imageRepository.findById(id);

        var filePath = fileData.map(image -> FOLDER_PATH + image.getUrl()).orElse("");

        try {
            return Files.readAllBytes(new File(filePath).toPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<ImageDTO> getImages (Long productId) {

        List<ImageDTO> imageList = new ArrayList<>();

        this.imageRepository.findByProductId(productId).forEach(image -> {
            var id = image.getId();
            var url = originUrl + basePath + "/images/" + id;
            ImageDTO imageDTO = new ImageDTO(id, url);
            imageList.add(imageDTO);
        });
        return imageList;
    }

    @Transactional
    public void deleteImage (Long id) {
        Optional<Image> fileData = imageRepository.findById(id);

        deleteImageFile(fileData.get());

        this.imageRepository.deleteById(id);
    }

    public void deleteImageFile(Image image) {
        var filePath = FOLDER_PATH + image.getUrl();

        try {
            Files.deleteIfExists(Paths.get(filePath));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
