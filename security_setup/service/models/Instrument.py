from django.db import models


class Instrument(models.Model):
    id = models.AutoField(primary_key=True, db_column='ANO')  # Auto increment starting at 1000 (can be set via migration)
    instrument = models.CharField(max_length=20, unique=True, db_column='INST')  # Unique string field
    tenor = models.CharField(max_length=255, unique=True, db_column='MTB')  # Unique string field
    type = models.CharField(max_length=255, unique=True, db_column='TYP')  # Unique string field

    class Meta:
        managed = False
        db_table = 'INST'  # Define the table name

    def __str__(self):
        return str(self.id) + ' - ' + self.instrument  # String representation of the model
    
    def create_object(self, data):
        try:
            self.instrument = data['instrument']
            self.tenor = data['tenor']
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
        return cls.objects.all().values('id', 'instrument', 'tenor', 'type')
    
    @classmethod
    def get_object_by_id(cls, id):
        try:
            return cls.objects.filter(id=id).values('id', 'instrument', 'tenor', 'type')[0]
        except IndexError:
            return None
        
    def save(self, *args, **kwargs):
        super(Instrument, self).save(*args, **kwargs)
        return self.id
