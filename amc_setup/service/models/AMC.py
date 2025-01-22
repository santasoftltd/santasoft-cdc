from django.db import models


class AMC(models.Model):
    id = models.AutoField(primary_key=True, db_column='ID')  # Auto increment starting at 1000 (can be set via migration)
    name = models.CharField(max_length=255, unique=True, db_column='AMC')  # Unique string field

    class Meta:
        managed = False
        db_table = 'AMC_Name'  # Define the table name

    def __str__(self):
        return str(self.id) + ' - ' + self.name  # String representation of the model
    
    def create_amc(self, data):
        try:
            self.name = data['name']
            self.save()
            return True, 'success'
        except Exception as error:
            return False, error

    def update_amc(self, **kwargs):
        try:
            """Update product details using keyword arguments."""
            for field, value in kwargs.items():
                if hasattr(self, field):
                    setattr(self, field, value)
            self.save()
            return True, self
        except Exception as error:
            return False, error

    def delete_amc(self):
        try:
            """Delete the product instance."""
            self.delete()
            return True, self.name
        except Exception as error:
            return False, error
    
    @classmethod
    def get_all_amc(cls):
        """Retrieve a product by its ID."""
        return cls.objects.all().values('id', 'name')
    
    @classmethod
    def get_amc_by_id(cls, amc_id):
        """Retrieve a product by its ID."""
        try:
            return cls.objects.filter(id=amc_id).values('id', 'name')[0]
        except IndexError:
            return None
        
    def save(self, *args, **kwargs):
        super(AMC, self).save(*args, **kwargs)
        return self.id