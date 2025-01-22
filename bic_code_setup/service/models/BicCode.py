from django.db import models


class BicCode(models.Model):
    id = models.AutoField(primary_key=True, db_column='ano')  # Auto increment starting at 1000 (can be set via migration)
    name = models.CharField(max_length=255, unique=True, db_column='Name')  # Unique string field
    short_name = models.CharField(max_length=255, unique=True, db_column='shortname')  # Unique string field
    bic_code = models.CharField(max_length=255, unique=True, db_column='bic')  # Unique string field

    class Meta:
        managed = False
        db_table = 'stp_client2'  # Define the table name

    def __str__(self):
        return str(self.id) + ' - ' + self.name  # String representation of the model
    
    def create_object(self, data):
        try:
            self.name = data['name']
            self.short_name = data['short_name']
            self.bic_code = data['bic_code']
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
            return True, self.name
        except Exception as error:
            return False, error
    
    @classmethod
    def get_all_objects(cls):
        return cls.objects.all().values('id', 'name', 'short_name', 'bic_code')
    
    @classmethod
    def get_object_by_id(cls, id):
        try:
            return cls.objects.filter(id=id).values('id', 'name', 'short_name', 'bic_code')[0]
        except IndexError:
            return None
        
    def save(self, *args, **kwargs):
        super(BicCode, self).save(*args, **kwargs)
        return self.id
