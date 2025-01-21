from django.db import models
from datetime import datetime


class CashTransaction(models.Model):
    id = models.AutoField(primary_key=True, db_column='ANO')
    transaction_no = models.IntegerField(unique=True, null=False, db_column='Trans_No')
    account_no = models.IntegerField(null=False, db_column='Account_No')
    client_code = models.CharField(max_length=255, db_column='Client_Name')
    client_name = models.CharField(max_length=255, db_column='Full_Name')
    amc = models.CharField(max_length=255, db_column='Asset_Management_Co')
    security_code = models.CharField(max_length=255, db_column='Security_Code')
    transanction_type = models.CharField(max_length=255, db_column='Transanction_Type')
    settlement_date = models.DateField(db_column='Settlement_Date')
    counterparty_bank = models.CharField(max_length=255, db_column='Counter_Party_Bank')
    outflow_amount = models.FloatField(db_column='Outflow')
    inflow_amount = models.FloatField(db_column='Inflow')
    con = models.CharField(max_length=1, db_column='Con')
    sbp_charges = models.FloatField(db_column='SBP_Charges')
    checked = models.IntegerField(db_column='Checked')
    balance = models.IntegerField(db_column='Balance')
    input_by = models.CharField(max_length=50, db_column='InputBY')
    input_date = models.CharField(max_length=100, db_column='InsDT')
    edit_by = models.CharField(max_length=50, db_column='EditBY')
    edit_date = models.CharField(max_length=100, db_column='EtDT')
    remarks = models.CharField(max_length=250, db_column='Remarks')
    fms_no = models.CharField(max_length=25, db_column='FMSNO')
    pay_and_collect_id = models.IntegerField(db_column='PAY_AND_COLLECT_ID')
    tr_type = models.CharField(max_length=1, db_column='TR_Type')
    is_sanpay = models.CharField(max_length=1, db_column='is_sanpay')

    class Meta:
        managed = False
        db_table = '[Issue Ledger Out]'  # Define the table name

    def __str__(self):
        return str(self.id) + ' - ' + self.transaction_no  # String representation of the model
    
    def setter(self, data, debit_credit, payment_status):
        self.payment_reference = data['payment_reference']
        self.payment_creation_timestamp = datetime.now()
        # self.payment_priority = settings.PAYMENT_PRIORITY
        self.no_of_transfers = len(data['transfers'])
        self.payment_settlement_date = data['payment_settlement_date']
        self.total_payment_amount = sum([i['transfer_amount'] for i in data['transfers']])
        # self.debtor_direct_agent = settings.DEBTOR_DIRECT_AGENT
        self.creditor_direct_agent = data['creditor_direct_agent'].upper()
        self.payment_method = data['payment_method'].upper()
        self.debit_credit = debit_credit
        self.payment_status = payment_status

    def save(self, *args, **kwargs):
        super(CashTransaction, self).save(*args, **kwargs)
        return self.id
