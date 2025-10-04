from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
from datetime import datetime, timedelta
import asyncio


class IPBlockMiddleware(BaseHTTPMiddleware):
    """
    Block IPs that exceed failure thresholds
    """

    def __init__(self, app, max_failures=10, block_duration=3600):
        super().__init__(app)
        self.blocked_ips = {}
        self.failure_counts = defaultdict(int)
        self.max_failures = max_failures
        self.block_duration = block_duration

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host

        # Check if IP is blocked
        if client_ip in self.blocked_ips:
            if datetime.now() < self.blocked_ips[client_ip]:
                return JSONResponse(
                    status_code=403,
                    content={
                        "detail": "Your IP has been temporarily blocked due to suspicious activity."}
                )
            else:
                del self.blocked_ips[client_ip]
                self.failure_counts[client_ip] = 0

        response = await call_next(request)

        # Track failures
        if response.status_code >= 400:
            self.failure_counts[client_ip] += 1
            if self.failure_counts[client_ip] >= self.max_failures:
                self.blocked_ips[client_ip] = datetime.now(
                ) + timedelta(seconds=self.block_duration)

        return response
