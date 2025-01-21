from django.db import models
from datetime import datetime


class BidTransaction(models.Model):
    id = models.AutoField(primary_key=True, db_column='ANO')
    transaction_no = models.IntegerField(unique=True, null=False, db_column='Trans_No')
    account_no = models.IntegerField(db_column='Account_No')
    client_code = models.CharField(max_length=255, db_column='Client_Name')
    client_name = models.CharField(max_length=255, db_column='Full_Name')
    amc = models.CharField(max_length=255, db_column='Asset_Management_Co')
    transanction_type = models.CharField(max_length=255, db_column='Transanction_Type')
    instrument = models.CharField(max_length=255, db_column='Instrument')
    security_tenor = models.CharField(max_length=255, db_column='Security_Tenor')
    issue_date = models.DateField(db_column='Issue_Date')
    maturity_date = models.DateField(db_column='Maturity_Date')
    settlement_date = models.DateField(db_column='Settlement_Date')
    face_value = models.FloatField(db_column='FaceValue')
    settlement_amount = models.FloatField(db_column='Settlement_Amount')
    issue_yield = models.FloatField(db_column='Yld')
    issue_price = models.FloatField(db_column='Price')
    input_by = models.CharField(max_length=50, db_column='InputBY')
    input_date = models.CharField(max_length=50, db_column='InsDT')
    edit_by = models.CharField(max_length=50, db_column='EditBY')
    edit_date = models.CharField(max_length=50, db_column='EtDT')
    delete_by = models.CharField(max_length=50, db_column='DeleteBY')
    delete_date = models.CharField(max_length=50, db_column='DelDT')
    user_system = models.CharField(max_length=50, db_column='sys_user')
    user_machine = models.CharField(max_length=50, db_column='sys_machine')
    checked = models.IntegerField(db_column='Checked')
    is_deleted = models.CharField(max_length=1, db_collation='RDelete')
    status = models.CharField(max_length=50, db_column='Status')
    bid_category = models.CharField(max_length=1, db_column='BidTyp')

    class Meta:
        managed = False
        db_table = '[PDAuctionTbl]'  # Define the table name

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
        super(BidTransaction, self).save(*args, **kwargs)
        return self.id
