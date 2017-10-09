package com.titarenko.catalog;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertFalse;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository repository;

    @Test
    public void testCreateAndDelete() throws Exception {
        Product product = new Product("ODGER", 65, "chair");
        repository.save(product);
        assertTrue(repository.exists(product.getId()));
        repository.delete(product);
        assertFalse(repository.exists(product.getId()));
    }
}
