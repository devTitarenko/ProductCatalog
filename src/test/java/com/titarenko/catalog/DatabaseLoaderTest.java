package com.titarenko.catalog;

import com.titarenko.catalog.repository.EmployeeRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DatabaseLoaderTest {

    @Autowired
    private DatabaseLoader loader;

    @Autowired
    private EmployeeRepository repository;

    @Test
    public void testInsertion() throws Exception {
        List listBefore = (List) repository.findAll();
        loader.run("");
        List listAfter = (List) repository.findAll();
        assertTrue(listBefore.size() < listAfter.size());
    }
}