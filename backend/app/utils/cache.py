"""
Simple in-memory TTL cache for Gemini API responses.
Prevents redundant API calls for the same disease queries.
"""

import time
from typing import Any, Optional


class TTLCache:
    """In-memory cache with time-to-live expiration and max size eviction."""

    def __init__(self, max_size: int = 100, ttl_seconds: int = 3600):
        self._cache: dict[str, dict[str, Any]] = {}
        self._max_size = max_size
        self._ttl = ttl_seconds

    def get(self, key: str) -> Optional[Any]:
        """Return cached value if it exists and hasn't expired."""
        if key in self._cache:
            entry = self._cache[key]
            if time.time() - entry["timestamp"] < self._ttl:
                return entry["value"]
            else:
                del self._cache[key]
        return None

    def set(self, key: str, value: Any) -> None:
        """Store a value; evicts oldest entry if at capacity."""
        if len(self._cache) >= self._max_size:
            oldest = min(self._cache, key=lambda k: self._cache[k]["timestamp"])
            del self._cache[oldest]
        self._cache[key] = {"value": value, "timestamp": time.time()}

    def clear(self) -> None:
        self._cache.clear()

    @property
    def size(self) -> int:
        return len(self._cache)


# ── Global cache singletons ──
gemini_cache = TTLCache(max_size=100, ttl_seconds=3600)
