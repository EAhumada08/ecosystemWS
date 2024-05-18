create database ecosystem;
use ecosystem;

create table users(
 id int auto_increment primary key,
 firstname varchar (25) not null,
 lastname varchar (25) not null,
 email varchar(50) not null,
 pass varchar(50) not null,
 tel varchar(10) not null,
 calle varchar (50) not null,
 extN varchar (3) not null,
 intN varchar (3),
 col varchar(30) not null,
 cp varchar (5) not null,
 city varchar (30) not null,
 state varchar (30) not null,
 rol varchar (20) not null
 );
 
 create table recolector (
 user_id int not null references users(id),
 clave_trabajador int not null,
 responsable varchar (100) not null,
  primary key (user_id) 
 );

CREATE TABLE desecho (
	numSerie int not null primary key,
    name varchar (50) not null,
    marca varchar (50) ,
    model varchar(50) ,
    color varchar(50),
    peso float not null,
    acqDate date,
    estado varchar (10) not null
);

CREATE TABLE cliente_desecho(
	registro_cliente int auto_increment primary key,
    cliente_id int not null,
    desecho_id int not null,
    reg_date date not null,
    kms float not null,
    costo float not null,
    estado varchar (20) not null,
    prog_date date,
    foreign key (cliente_id) references users(id),
    foreign key (desecho_id) references desecho(numSerie)
);