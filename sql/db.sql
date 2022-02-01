create database books_magazine;

create table author(
    title varchar(200) not null,
    isbn int(20) not null primary key,
    authors varchar(50) not null,
    descriptiom varhcar(2000) not null,
    publishedAt timestamp current_time

);