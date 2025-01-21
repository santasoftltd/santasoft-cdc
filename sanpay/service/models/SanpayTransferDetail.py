from django.db import models
from django.conf import settings


class SanpayTransferDetail(models.Model):
    transfer_id = models.AutoField(primary_key=True)  # Auto increment starting at 1000 (can be set via migration)
    transfer_reference = models.CharField(max_length=255, unique=True)  # Unique string field
    payment = models.ForeignKey('SanpayPayment', on_delete=models.CASCADE, to_field='payment_id')  # Foreign key to SanpayMessage table
    debtor_agent = models.CharField(max_length=50)  # Debtor's agent as string
    debtor_agent_account = models.CharField(max_length=50)  # Debtor's agent account as string
    debtor_client = models.CharField(max_length=50)  # Debtor's client as string
    debtor_client_account = models.CharField(max_length=50)  # Debtor's client account as string
    creditor_agent = models.CharField(max_length=50)  # Creditor's agent as string
    creditor_agent_account = models.CharField(max_length=50)  # Creditor's agent account as string
    creditor_client = models.CharField(max_length=50)  # Creditor's client as string
    creditor_client_account = models.CharField(max_length=50)  # Creditor's client account as string
    charges_bearer = models.CharField(max_length=50)  # Charges bearer as string
    transfer_currency = models.CharField(max_length=10)  # Currency of the transaction as string
    transfer_amount = models.DecimalField(max_digits=15, decimal_places=2)  # Transaction amount with 2 decimal places

    class Meta:
        managed = False
        db_table = 'sanpay_transfer_details'  # Define the table name
    
    def __str__(self):
        return str(self.transfer_id) + ' - ' +  self.transfer_reference # String representation of the model
    
    def setter(self, data, payment_instance, transaction_reference, creditor_agent):
        self.transfer_reference = transaction_reference
        self.payment = payment_instance
        self.debtor_agent = settings.DEBTOR_DIRECT_AGENT
        self.debtor_agent_account = settings.DEBTOR_DIRECT_AGENT_ACCOUNT
        self.debtor_client = data['debtor_client'].title() if payment_instance.payment_method != 'RTGS-FICT' else None
        self.debtor_client_account = data['debtor_client_account'] if payment_instance.payment_method != 'RTGS-FICT' else None
        self.creditor_agent = creditor_agent.upper()
        self.creditor_agent_account = data['creditor_agent_account']
        self.creditor_client = data['creditor_client'].title() if payment_instance.payment_method != 'RTGS-FICT' else None
        self.creditor_client_account = data['creditor_client_account'] if payment_instance.payment_method != 'RTGS-FICT' else None
        self.charges_bearer = settings.PAYMENT_TRANSFER_CHARGES_BEARER
        self.transfer_currency = settings.PAYMENT_TRANSFER_CURRENCY
        self.transfer_amount = data['transfer_amount']

    def save(self, *args, **kwargs):
        super(SanpayTransferDetail, self).save(*args, **kwargs)
        return self.transfer_id
