FROM java:8
MAINTAINER Titarenko 
COPY product-catalog-app.jar /home/product-catalog-app.jar
CMD ["java","-jar","/home/product-catalog-app.jar"]
