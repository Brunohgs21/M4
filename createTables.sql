CREATE TABLE IF NOT EXISTS addresses(
	"id" SERIAL PRIMARY KEY,
	"street" VARCHAR(25) NOT NULL,
	"number" VARCHAR(8) NOT NULL,
	"postalCode" VARCHAR(10) NOT NULL,
	"complement" VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS mechanics (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(62) NOT NULL,
	"registrationNumber" VARCHAR(4) NOT NULL UNIQUE,
	"addressId" INTEGER UNIQUE,
	FOREIGN KEY ("addressId") REFERENCES addresses("id")
);