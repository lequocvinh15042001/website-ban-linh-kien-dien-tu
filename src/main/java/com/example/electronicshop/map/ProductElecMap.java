package com.example.electronicshop.map;

import com.example.electronicshop.communication.request.ProductElecRequest;
import com.example.electronicshop.communication.response.ProductElecListResponse;
import com.example.electronicshop.communication.response.ProductElecResponse;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.models.enity.Category;
import com.example.electronicshop.models.enity.ProductElec;
import com.example.electronicshop.models.enity.ProductElecImage;
import com.example.electronicshop.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductElecMap {
    private final CategoryRepository categoryRepository;

    public ProductElec toProduct(ProductElecRequest req) {
        Optional<Category> category = categoryRepository.findCategoryByIdAndState(req.getCategory(), Constant.ENABLE);
//        if (category.isEmpty())
//            throw new NotFoundException("Can not found category or brand");
//        return new ProductElec(req.getName(), req.getDescription(), req.getPrice(),
//                category.get(), req.getQuantity(), Constant.ENABLE);

        return new ProductElec(req.getName(), req.getDescription(), req.getPrice(),
                category.get(), req.getQuantity(),Constant.ENABLE, LocalDateTime.now(),LocalDateTime.now());
    }
    public ProductElecListResponse toProductListRes(ProductElec req) {
        List<ProductElecImage> images = req.getImages();
        HashSet<Object> seen=new HashSet<>();
        images.removeIf(e->!seen.add(e.getImageId()));

        return new ProductElecListResponse(req.getId(),req.getName(),req.getDescription(),req.getRate(),req.getCategory(),
                req.getQuantity(),req.getSold(),req.getPrice(),req.getImages(),req.getCreatedDate(),req.getUpdateDate(), req.getState());
    }
    public ProductElecResponse toProductRes(ProductElec req) {
//        String discountString = req.getPrice().multiply(BigDecimal.valueOf((double) (100- req.getDiscount())/100))
//                .stripTrailingZeros().toPlainString();
//        BigDecimal discountPrice = new BigDecimal(discountString);
//        LocalDateTime current = LocalDateTime.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
//        String formatted = current.format(formatter);
        return new ProductElecResponse(req.getId(), req.getName(), req.getDescription(), req.getPrice(),
                req.getCategory().getName(), req.getCategory().getId(), req.getQuantity(), req.getSold(),
                req.getRate(), req.getImages(), req.getCreatedDate(),req.getUpdateDate(), req.getState());
    }
}
