package com.eshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private Long id;
    private String name;
    private String slug;
    private String gender;
    private String imageUrl;

}