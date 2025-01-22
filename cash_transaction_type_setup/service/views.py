from rest_framework.views import Response
from rest_framework import status
from rest_framework.views import APIView
from .models.CashTransactionType import CashTransactionType
from django.core.exceptions import ObjectDoesNotExist


class API(APIView):

    def view_type(self, request):
        try:
            parameter = request.data['Parameter']
            if all(key in parameter for key in ('Filter', 'Sort', "Offset", "Limit", "Id")):
                if type(parameter['Offset']) is int and type(parameter['Limit']) is int and type(parameter['Id']) is int and type(parameter['Filter']) is str and type(parameter['Sort']) is str:
                    # quary = Quary(filterQuery=self.getFilterQuery(parameter['Filter']), sortQuery=self.getSortQuery(parameter['Sort']))
                    if parameter['Id'] == 0:
                        response_data = CashTransactionType.get_all_objects()
                    else:
                        response_data = CashTransactionType.get_object_by_id(id=parameter['Id'])
                    if response_data is None:
                        response = Response({
                        'message': 'Object not found.'
                        }, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        response = Response({
                            'data': response_data
                        }, status=status.HTTP_200_OK)
                else:
                    response = Response({
                        'message': 'Invalid Parameter key type.'
                    }, status=status.HTTP_400_BAD_REQUEST)
            else:
                response = Response({
                    'message': 'Invalid request. Parameter Key is missing.'
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            response = Response({
                'message': 'Cash transaction type setup service failed. Error message: ' + error
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def add_type(self, request):
        try:
            data = request.data['Data']
            object = CashTransactionType()
            is_success, error_message = object.create_object(data=data)
            if is_success:
                response = Response({
                    'message': 'Success'
                }, status=status.HTTP_200_OK)
            else:
                response = Response({
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            response = Response({
                'message': 'Cash transaction type setup service failed. Error message: ' + error
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def update_type(self, request):
        try:
            data = request.data['Data']
            try:
                object = CashTransactionType.objects.get(id=data['id'])
                is_success, error_message = object.update_object(id=data['id'],type=data['type'])
                if is_success:
                    response = Response({
                        'message': 'Success'
                    }, status=status.HTTP_200_OK)
                else:
                    response = Response({
                    'message': error_message
                    }, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                response = Response({
                        'message': 'Object not found.'
                    }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            response = Response({
                'message': 'Cash transaction type setup service failed. Error message: ' + str(error)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def remove_type(self, request):
        try:
            data = request.data['Data']
            try:
                object = CashTransactionType.objects.get(id=data['id'])
                is_success, error_message = object.delete_object()
                if is_success:
                    response = Response({
                        'message': 'Success'
                    }, status=status.HTTP_200_OK)
                else:
                    response = Response({
                    'message': error_message
                    }, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                response = Response({
                        'message': 'Object not found.'
                    }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            response = Response({
                'message': 'Cash transaction type setup service failed. Error message: ' + error
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def post(self, request):
        if all(key in request.data for key in ('Timestamp', 'Function', "Parameter", "Data")):
            if request.data['Function'] == 'ViewType':
                response = self.view_type(request=request)
            elif request.data['Function'] == 'AddType':
                response = self.add_type(request=request)
            elif request.data['Function'] == 'UpdateType':
                response = self.update_type(request=request)
            elif request.data['Function'] == 'RemoveType':
                response = self.remove_type(request=request)
            else:
                response = Response({
                    'message': 'Invalid function.'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = Response({
                    'message': 'Invalid request. Request Key is missing.'
                }, status=status.HTTP_400_BAD_REQUEST)
        return response
