/*This is to grant all privileges to the user*/
-- To select the database
USE mysql;

-- Create the user
CREATE USER 'DB_USER'@'%' IDENTIFIED BY 'DB_PASSWORD';

-- Grant privileges on fileai_test database
GRANT ALL PRIVILEGES ON fileai_test.* TO 'DB_USER'@'%';

-- Grant privileges on fileai_db database
GRANT ALL PRIVILEGES ON fileai_db.* TO 'DB_USER'@'%';

-- Apply the changes
FLUSH PRIVILEGES;