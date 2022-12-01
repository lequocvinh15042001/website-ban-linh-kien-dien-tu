package com.example.electronicshop.communication.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Data
public class ImageRequest {
    String imageId;
    List<MultipartFile> files;
}
