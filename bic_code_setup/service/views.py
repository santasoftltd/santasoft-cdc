from rest_framework.views import Response
from rest_framework import status
from rest_framework.views import APIView
from .models.BicCode import BicCode
from django.core.exceptions import ObjectDoesNotExist


class API(APIView):

    def view_bic_code(self, request):
        try:
            parameter = request.data['Parameter']
            if all(key in parameter for key in ('Filter', 'Sort', "Offset", "Limit", "Id")):
                if type(parameter['Offset']) is int and type(parameter['Limit']) is int and type(parameter['Id']) is int and type(parameter['Filter']) is str and type(parameter['Sort']) is str:
                    # quary = Quary(filterQuery=self.getFilterQuery(parameter['Filter']), sortQuery=self.getSortQuery(parameter['Sort']))
                    if parameter['Id'] == 0:
                        response_data = BicCode.get_all_objects()
                    else:
                        response_data = BicCode.get_object_by_id(id=parameter['Id'])
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
                'message': 'Bic code setup service failed. Error message: ' + error
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def add_bic_code(self, request):
        try:
            data = request.data['Data']
            bic_code = BicCode()
            is_success, error_message = bic_code.create_object(data=data)
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
                'message': 'Bic code setup service failed. Error message: ' + error
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def update_bic_code(self, request):
        try:
            data = request.data['Data']
            try:
                bic_code = BicCode.objects.get(id=data['id'])
                is_success, error_message = bic_code.update_object(id=data['id'],name=data['name'])
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
                'message': 'Bic code setup service failed. Error message: ' + error
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def remove_bic_code(self, request):
        try:
            data = request.data['Data']
            try:
                bic_code = BicCode.objects.get(id=data['id'])
                is_success, error_message = bic_code.delete_object()
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
                'message': 'Bic code setup service failed. Error message: ' + error
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def post(self, request):
        if all(key in request.data for key in ('Timestamp', 'Function', "Parameter", "Data")):
            if request.data['Function'] == 'ViewBicCode':
                response = self.view_bic_code(request=request)
            elif request.data['Function'] == 'AddBicCode':
                response = self.add_bic_code(request=request)
            elif request.data['Function'] == 'UpdateBicCode':
                response = self.update_bic_code(request=request)
            elif request.data['Function'] == 'RemoveBicCode':
                response = self.remove_bic_code(request=request)
            else:
                response = Response({
                    'message': 'Invalid function.'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = Response({
                    'message': 'Invalid request. Request Key is missing.'
                }, status=status.HTTP_400_BAD_REQUEST)
        return response
