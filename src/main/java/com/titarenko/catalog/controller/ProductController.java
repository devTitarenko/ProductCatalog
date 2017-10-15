package com.titarenko.catalog.controller;

import com.titarenko.catalog.model.Product;
import com.titarenko.catalog.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/product")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping(path = "/add")
    public @ResponseBody String addNewProduct(@RequestParam String productName,
                                              @RequestParam Integer price) {
        Product product = new Product(productName, price, null);
        service.save(product);
        return "Product's id is: " + product.getId();
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Product> getAllProducts() {
        return service.findAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public @ResponseBody String deleteProduct(@PathVariable("id") Long id) {
        service.delete(id);
        return "Deleted";
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Response updateProduct(@RequestBody Product product) {
        service.save(product);
        return new Response(product.getId());
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Response createProduct(@RequestBody Product product) {
        service.save(product);
        return new Response(product.getId());
    }
}