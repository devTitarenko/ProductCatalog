package com.titarenko.catalog;

import com.titarenko.catalog.model.Product;
import org.junit.Test;

import static org.junit.Assert.*;

public class ProductTest {

    @Test
    public void testProduct(){
        Product sameProduct0 = new Product("FEODOR",120, "swivel chair with armrests");
        Product sameProduct1 = new Product("FEODOR",120, "swivel chair with armrests");
        Product otherProduct = new Product("KIVIK",285, "chaise longue");

        assertEquals(sameProduct0, sameProduct1);
        assertNotEquals(sameProduct0, otherProduct);
        assertNotNull(sameProduct0);
    }
}
