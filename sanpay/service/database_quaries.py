from django.db import connection


class Quary():

    def __init__(self, filterQuery, sortQuery):
        self.filterQuery = filterQuery
        self.sortQuery = sortQuery if sortQuery != '' else 'ORDER BY [bname]'
        if self.filterQuery != '': self.filterQuery = 'WHERE ' + self.filterQuery

    def dictfetchall(self, cursor):
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]
    
    def getBranch(self, id):
        with connection.cursor() as cursor:
            cursor.execute('''
                SELECT    
                    [ano] as id,
                    [bcode] as br_code,
                    [bname] as branch
                FROM [branch]
                WHERE [ano] = ''' + str(id) + '''
            ''')
            data = self.dictfetchall(cursor)
        return data
    
    def getBranches(self):
        with connection.cursor() as cursor:
            cursor.execute('''
                SELECT    
                    [ano] as id,
                    [bcode] as br_code,
                    [bname] as branch
                FROM [branch]
               '''+self.filterQuery+'''
                '''+self.sortQuery+'''
            ''')
            data = self.dictfetchall(cursor)
        return data