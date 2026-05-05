import httpx

# Global client pool to reuse connections
client_pool = httpx.AsyncClient(
    limits=httpx.Limits(max_keepalive_connections=20, max_connections=100),
    timeout=5.0
)