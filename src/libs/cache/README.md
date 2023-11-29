# Cache System

Encapsulates node-cache to provide app-scoped cache keys and ensure a central base of operations for all caching related activities.

## Global cache instance

The lib gives access to an AppCache variable which is the App's global CacheManager instance for all caching operations.

## Adding events to the cache

Events are set in ./events and controlled using a CacheEventCallbackHandler class which is then picked up by the cache.init.ts file to add all events to the global cache instance
