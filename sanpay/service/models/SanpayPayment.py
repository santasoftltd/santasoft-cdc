from django.db import models
from datetime import datetime
from django.conf import settings


class SanpayPayment(models.Model):
    payment_id = models.AutoField(primary_key=True)  # Auto increment starting at 1000 (can be set via migration)
    payment_reference = models.CharField(max_length=255, unique=True)  # Unique string field
    payment_creation_timestamp = models.DateTimeField()  # DateTime field for creation timestamp
    payment_priority = models.CharField(max_length=50)  # Settlement priority as string
    no_of_transfers = models.IntegerField()  # Number of transactions as integer
    payment_settlement_date = models.DateField()  # Settlement date of transactions
    total_payment_amount = models.DecimalField(max_digits=15, decimal_places=2)  # Total settlement amount with 2 decimal places
    debtor_direct_agent = models.CharField(max_length=50)  # Debtor's direct agent as string
    creditor_direct_agent = models.CharField(max_length=50)  # Creditor's direct agent as string
    payment_method = models.CharField(max_length=50)  # Settlement method as string
    debit_credit = models.CharField(max_length=50)  # Message flow as string
    payment_status = models.CharField(max_length=50)  # Message status as string
    remarks = models.TextField(blank=True, null=True)  # Remarks field, optional (can be blank or null)

    class Meta:
        managed = False
        db_table = 'sanpay_payments'  # Define the table name

    def __str__(self):
        return str(self.payment_id) + ' - ' + self.payment_reference  # String representation of the model
    
    def setter(self, data, debit_credit, payment_status):
        self.payment_reference = data['payment_reference']
        self.payment_creation_timestamp = datetime.now()
        self.payment_priority = settings.PAYMENT_PRIORITY
        self.no_of_transfers = len(data['transfers'])
        self.payment_settlement_date = data['payment_settlement_date']
        self.total_payment_amount = sum([i['transfer_amount'] for i in data['transfers']])
        self.debtor_direct_agent = settings.DEBTOR_DIRECT_AGENT
        self.creditor_direct_agent = data['creditor_direct_agent'].upper()
        self.payment_method = data['payment_method'].upper()
        self.debit_credit = debit_credit
        self.payment_status = payment_status

    def save(self, *args, **kwargs):
        super(SanpayPayment, self).save(*args, **kwargs)
        return self.payment_id
