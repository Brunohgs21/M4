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

ALTER TABLE
	addresses 
ALTER COLUMN
	complement
DROP NOT NULL;

CREATE TABLE IF NOT EXISTS work_orders(
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(100) NOT NULL,
	"price" DECIMAL(10,2) NOT NULL,
	"status" VARCHAR(22) NOT NULL,
	"isWarranty" BOOLEAN NOT NULL,
	"startDate" DATE NOT NULL,
	"endDate" DATE
);

ALTER TABLE
	work_orders 
ADD COLUMN
	"mechanicalId" INTEGER NOT NULL;

ALTER TABLE
	work_orders
ADD FOREIGN KEY ("mechanicalId") REFERENCES mechanics("id");


SELECT 
	wo.*,
	me."name",
	me."registrationNumber"
FROM 
	work_orders wo
JOIN mechanics me ON wo."mechanicalId" = me."id";


UPDATE 
	work_orders 
SET
	"endDate" = '2023-02-10',
	"status" = 'finished'
WHERE 
	id = 1
RETURNING *;
