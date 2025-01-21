from rest_framework.views import Response
from rest_framework import status
from rest_framework.views import APIView
from .database_quaries import Quary

class API(APIView):

    # def getFilterQuery(self, filter):
    #     condition = ''
    #     if filter == '':
    #         return condition
    #     else:
    #         filter = filter.split(',')
    #         for i in range(0,len(filter),2):
    #             if filter[i] == 'br_code': condition = condition + '[bcode] = \'' + filter[i+1] + '\' AND '
    #             if filter[i] == 'branch': condition = condition + '[bname] = \'' + filter[i+1] + '\' AND ' 
    #         condition = condition[:-5]
    #         return condition

    # def getSortQuery(self, sort):
    #     condition = ''
    #     if sort == '':
    #         return condition
    #     else:
    #         sort = sort.split(',')
    #         condition = 'ORDER BY '
    #         if sort[0] == 'br_code': condition = condition + '[bcode]'
    #         if sort[0] == 'branch': condition = condition + '[bname]' 
    #         if sort[1] == 'desc':
    #             condition = condition + ' DESC'
       
    #     return condition
    
    # def add_payment(self, request):
    #     try:
    #         data = request.data['Data']
    #         is_valid, errors = sanpay.message_validation(data)
    #         if is_valid:
    #             is_success, error_message = sanpay.create_payment(data)
    #             if is_success:
    #                 response = Response({
    #                     'message': 'Success'
    #                 }, status=status.HTTP_200_OK)
    #             else:
    #                 response = Response({
    #                 'message': error_message
    #             }, status=status.HTTP_400_BAD_REQUEST)
    #         else:
    #             response = Response({
    #                 'message': errors
    #             }, status=status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         response = Response({
    #             'message': 'Sanpay service failed. Please try again or contact IT if the issue continues.'
    #             }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    #     finally:
    #         return response
        
    def process_payment(self, request):
        try:
            parameter = request.data['Parameter']
            if 'Id' in parameter:
                is_success = ''
                error_message = ''
                if is_success:
                    response = Response({
                        'message': error_message
                    }, status=status.HTTP_200_OK)
                else:
                    response = Response({
                    'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                response = Response({
                    'message': 'Invalid request. Parameter Key Id is missing.'
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            response = Response({
                'message': 'Sanpay service failed. Please try again or contact IT if the issue continues.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return response

    # def view_branches(self, request):
    #     try:
    #         parameter = request.data['Parameter']
    #         if all(key in parameter for key in ('Filter', 'Sort', "Offset", "Limit")):
    #             if type(parameter['Offset']) is int and type(parameter['Limit']) is int and type(parameter['Filter']) is str and type(parameter['Sort']) is str:
    #                 quary = Quary(filterQuery=self.getFilterQuery(parameter['Filter']), sortQuery=self.getSortQuery(parameter['Sort']))
    #                 response_data = quary.getBranches()
    #                 response = Response({
    #                     'data': response_data
    #                 }, status=status.HTTP_200_OK)
    #             else:
    #                 response = Response({
    #                     'message': 'Invalid Parameter key type.'
    #                 }, status=status.HTTP_400_BAD_REQUEST)
    #         else:
    #             response = Response({
    #                 'message': 'Invalid request. Parameter Key is missing.'
    #             }, status=status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         response = Response({
    #             'message': 'Branches service failed. Please try again or contact IT if the issue continues.'
    #             }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    #     finally:
    #         return response

    def post(self, request):
        if all(key in request.data for key in ('Timestamp', 'Function', "Parameter", "Data")):
            if request.data['Function'] == 'AddPayment':
                response = self.add_payment(request=request)
            elif request.data['Function'] == 'ProcessPayment':
                response = self.process_payment(request=request)
            else:
                response = Response({
                    'message': 'Invalid function.'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = Response({
                    'message': 'Invalid request. Request Key is missing.'
                }, status=status.HTTP_400_BAD_REQUEST)
        return response
