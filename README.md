_**Product Catalog**_
-------------------------
_________________________

Spring Boot RESTful Web Service with React.js on the frontend.


Screenshot
-------------------------
![](https://raw.githubusercontent.com/devTitarenko/ProductCatalog/master/Screenshot.png)

For launching
-------------------------
Just Run `com.titarenko.catalog.StartProductCatalog.main` method.

Or do `java -jar product-catalog-app.jar` in terminal.

For clean install launch `mvn install` and maven **frontend-maven-plugin** will generate new _bundle.js_.

Go to `localhost:8080`.


Features
-------------------------
- CRUD operations
- Sort by name or price
- Detail info for product
- Message in case the catalog is empty


Technologies
-------------------------
- Java 8
- Spring Boot
- Spring Data + H2
- React.js + CSS
- Maven
- JUnit


Database
-------------------------
Go to `localhost:8080/h2-console/login.do`.
In the JDBC url use `jdbc:h2:mem:testdb`.
Keep the password blank.
Click on Connect.


Run with Docker
-------------------------
- Pull from **hub.docker**:

`docker run --name CatalogProgram -p 8080:8080 devtitarenko/product_catalog-image`

- Or create locally:

`docker build -t catalog-image .`

`docker run --name CatalogProgram -p 8080:8080 catalog-image`