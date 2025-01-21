from rest_framework.views import Response
from rest_framework import status
from rest_framework.views import APIView


class input_api(APIView):

    def post(self, request):
        print(request.headers)
        print(request.data['document'])
        return Response({
                    'message': 'Success'
                }, status=status.HTTP_200_OK)

class token_api(APIView):

    def post(self, request):
        print(request.headers)
        print(request.data)
        return Response({
                    'message': 'Success',
                    'access_token': 'mepcpdfoewewr32r092r3fewnvbdewf32-r3-r8329jewnwcewofqru329ru2fdcdojfuefoiadjpfe6qr8r32r9rfekfkewfpoew'
                }, status=status.HTTP_200_OK)
