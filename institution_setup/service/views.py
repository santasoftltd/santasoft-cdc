from rest_framework.views import Response
from rest_framework import status
from rest_framework.views import APIView


class API(APIView):

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
                pass
                # response = self.add_payment(request=request)
            elif request.data['Function'] == 'ProcessPayment':
                pass
                # response = self.process_payment(request=request)
            else:
                response = Response({
                    'message': 'Invalid function.'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = Response({
                    'message': 'Invalid request. Request Key is missing.'
                }, status=status.HTTP_400_BAD_REQUEST)
        return response
