from rest_framework.views import Response
from rest_framework import status
from rest_framework.views import APIView
from .models.AMC import AMC
from django.shortcuts import get_object_or_404


class API(APIView):

    def view_amc(self, request):
        try:
            parameter = request.data['Parameter']
            if all(key in parameter for key in ('Filter', 'Sort', "Offset", "Limit", "Id")):
                if type(parameter['Offset']) is int and type(parameter['Limit']) is int and type(parameter['Id']) is int and type(parameter['Filter']) is str and type(parameter['Sort']) is str:
                    # quary = Quary(filterQuery=self.getFilterQuery(parameter['Filter']), sortQuery=self.getSortQuery(parameter['Sort']))
                    if parameter['Id'] == 0:
                        response_data = AMC.get_all_amc()
                    else:
                        response_data = AMC.get_amc_by_id(amc_id=parameter['Id'])
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
        except Exception as e:
            response = Response({
                'message': 'AMC setup failed. Please try again or contact IT if the issue continues.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def add_amc(self, request):
        try:
            data = request.data['Data']
            amc = AMC()
            is_success, error_message = amc.create_amc(data=data)
            if is_success:
                response = Response({
                    'message': 'Success'
                }, status=status.HTTP_200_OK)
            else:
                response = Response({
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            response = Response({
                'message': 'AMC setup service failed. Please try again or contact IT if the issue continues.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def update_amc(self, request):
        try:
            data = request.data['Data']
            try:
                amc = get_object_or_404(AMC, id=data['id'])
                is_success, error_message = amc.update_amc(id=data['id'],name=data['name'])
                if is_success:
                    response = Response({
                        'message': 'Success'
                    }, status=status.HTTP_200_OK)
                else:
                    response = Response({
                    'message': error_message
                    }, status=status.HTTP_400_BAD_REQUEST)
            except:
                response = Response({
                        'message': 'Object not found.'
                    }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            response = Response({
                'message': 'AMC setup service failed. Please try again or contact IT if the issue continues.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def remove_amc(self, request):
        try:
            data = request.data['Data']
            try:
                amc = get_object_or_404(AMC, id=data['id'])
                is_success, error_message = amc.delete_amc()
                if is_success:
                    response = Response({
                        'message': 'Success'
                    }, status=status.HTTP_200_OK)
                else:
                    response = Response({
                    'message': error_message
                    }, status=status.HTTP_400_BAD_REQUEST)
            except:
                response = Response({
                        'message': 'Object not found.'
                    }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            response = Response({
                'message': 'AMC setup service failed. Please try again or contact IT if the issue continues.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    def post(self, request):
        if all(key in request.data for key in ('Timestamp', 'Function', "Parameter", "Data")):
            if request.data['Function'] == 'ViewAmc':
                response = self.view_amc(request=request)
            elif request.data['Function'] == 'AddAmc':
                response = self.add_amc(request=request)
            elif request.data['Function'] == 'UpdateAmc':
                response = self.update_amc(request=request)
            elif request.data['Function'] == 'RemoveAmc':
                response = self.remove_amc(request=request)
            else:
                response = Response({
                    'message': 'Invalid function.'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = Response({
                    'message': 'Invalid request. Request Key is missing.'
                }, status=status.HTTP_400_BAD_REQUEST)
        return response
