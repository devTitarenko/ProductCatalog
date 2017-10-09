package com.titarenko.catalog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final EmployeeRepository repository;

	@Autowired
	public DatabaseLoader(EmployeeRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Product("VIMLE", 1275, "corner sofa, 5-seat"));
		this.repository.save(new Product("PANDRUP", 35, "rug, low pile"));
		this.repository.save(new Product("TINGBY", 25, "side table on castors"));
		this.repository.save(new Product("LANDSKRONA", 395, "armchair"));
		this.repository.save(new Product("BILLY", 95, "bookcase with doors"));
		this.repository.save(new Product("FRIHETEN", 399, "three-seat sofa-bed"));
		this.repository.save(new Product("HYLLE", 20, "pillow, firmer"));
		this.repository.save(new Product("NORDLI", 279, "bed frame with storage"));
	}
}