CREATE TABLE sanpay_transfer_details (
    transfer_id INT IDENTITY(1000,1) PRIMARY KEY ,			-- Primary key, auto-increment starting at 1000
    transfer_reference VARCHAR(255) UNIQUE NOT NULL,			-- Unique transaction reference
    payment_id INT NOT NULL,					-- Foreign key from sanpay_messages (references message_reference)
    debtor_agent VARCHAR(50) NOT NULL,                          -- Debtor's agent
    debtor_agent_account VARCHAR(50) NOT NULL,							-- Debtor's agent account
    debtor_client VARCHAR(50),									-- Debtor client
    debtor_client_account VARCHAR(50),							-- Debtor client account
    creditor_agent VARCHAR(50) NOT NULL,                        -- Creditor's agent
    creditor_agent_account VARCHAR(50) NOT NULL,							-- Creditor's agent account
    creditor_client VARCHAR(50),								-- Creditor client
    creditor_client_account VARCHAR(50),						-- Creditor client account
    charges_bearer VARCHAR(50) NOT NULL,                        -- Charges bearer
    transfer_currency VARCHAR(10) NOT NULL,                  -- Currency of the transaction
    transfer_amount DECIMAL(15, 2) NOT NULL,                 -- Transaction amount
    CONSTRAINT fk_payment_id FOREIGN KEY (payment_id) REFERENCES sanpay_payments(payment_id)
);