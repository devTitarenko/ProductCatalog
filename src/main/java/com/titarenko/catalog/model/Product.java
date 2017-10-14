package com.titarenko.catalog.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Objects;

@Data
@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String productName;
    @NotNull
    private Integer price;
    private String description;

    public Product() {
    }

    public Product(String productName, Integer price, String description) {
        this.productName = productName;
        this.price = price;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product that = (Product) o;

        return Objects.equals(this.id, that.id)
                && Objects.equals(this.productName, that.productName)
                && Objects.equals(this.price, that.price)
                && Objects.equals(this.description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, productName, price, description);
    }
}