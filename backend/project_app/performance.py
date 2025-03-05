from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from project_app.models import APIPerformanceLog
from rest_framework import status

class APIPerformanceView(APIView):
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        performance_logs = APIPerformanceLog.objects.all().order_by('-timestamp')[:10] 
        data = [
            {'url': log.url, 'duration': log.duration, 'timestamp': log.timestamp}
            for log in performance_logs
        ]
        return Response(data, status=status.HTTP_200_OK)
