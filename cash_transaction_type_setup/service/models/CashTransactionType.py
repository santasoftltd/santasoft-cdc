from django.db import models


class CashTransactionType(models.Model):
    id = models.AutoField(primary_key=True, db_column='Ano')  # Auto increment starting at 1000 (can be set via migration)
    type = models.CharField(max_length=50, unique=True, db_column='Type')  # Unique string field

    class Meta:
        managed = False
        db_table = 'InOutFlows'  # Define the table name

    def __str__(self):
        return str(self.id) + ' - ' + self.type  # String representation of the model
    
    def create_object(self, data):
        try:
            self.type = data['type']
            self.save()
            return True, self
        except Exception as error:
            return False, error

    def update_object(self, **kwargs):
        try:
            for field, value in kwargs.items():
                if hasattr(self, field):
                    setattr(self, field, value)
            self.save()
            return True, self
        except Exception as error:
            return False, error

    def delete_object(self):
        try:
            self.delete()
            return True, self
        except Exception as error:
            return False, error
    
    @classmethod
    def get_all_objects(cls):
        return cls.objects.all().values('id', 'type')
    
    @classmethod
    def get_object_by_id(cls, id):
        try:
            return cls.objects.filter(id=id).values('id', 'type')[0]
        except IndexError:
            return None
        
    def save(self, *args, **kwargs):
        super(CashTransactionType, self).save(*args, **kwargs)
        return self.id
