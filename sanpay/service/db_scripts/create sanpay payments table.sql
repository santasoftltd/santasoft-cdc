CREATE TABLE sanpay_payments (
    payment_id INT IDENTITY(1000,1) PRIMARY KEY,				-- Primary key, auto-increment starts at 1000
    payment_reference VARCHAR(255) UNIQUE NOT NULL,				-- Unique message reference
    payment_creation_timestamp DATETIME NOT NULL,				-- Timestamp of message creation
    payment_priority VARCHAR(10) NOT NULL,                     -- Settlement priority
    no_of_transfers INT NOT NULL,                               -- Number of transactions
    payment_settlement_date DATE NOT NULL,                   -- Settlement date for transactions
    total_payment_amount DECIMAL(15, 2) NOT NULL,              -- Total amount settled
    debtor_direct_agent VARCHAR(50) NOT NULL,                     -- Debtor's direct agent
    creditor_direct_agent VARCHAR(50) NOT NULL,                   -- Creditor's direct agent
    payment_method VARCHAR(50) NOT NULL,                       -- Settlement method
    debit_credit VARCHAR(50) NOT NULL,                            -- Flow of the message (inward/outward, etc.)
    payment_status VARCHAR(50) NOT NULL,                          -- Status of the message (e.g., processed, pending)
    remarks TEXT											 	-- Additional remarks
);