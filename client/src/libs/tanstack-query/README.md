# Tanstack Query lib

## Current Version used

Setting up this template with the latest v5 version as of time of writing

## Template conventions

### File structure

-   Resource specific API calls have their own file /src/api/resource.api.ts
-   Resource specific mutations should be as much as possible in their own custom hook useResource.ts

### Query Keys

Each new element in a url should be a key passed to the queryKey array. Query params should be set in an object.
A couple of examples:

| url                                      | queryKey                                        |
| ---------------------------------------- | ----------------------------------------------- |
| /posts                                   | ["posts"]                                       |
| /posts/{id}                              | ["posts", id]                                   |
| /posts?foo=bar                           | ["posts", {foo: bar}]                           |
| /posts?page=1&limit=10                   | ["posts", {page: 1, limit: 10}]                 |
| /posts/{id}/comments                     | ["posts", id, "comments"]                       |
| /posts/{id}/comments?authorId={authorId} | ["posts", id, "comments", {authorId: authorId}] |

## Specifications

### Running useQuery after a previous useQuery is done loading

useQuery has an "enabled" option that allows to trigged the useQuery only whenever the condition passed evaluates to true

### Invalidating queries caveats

When invalidating a query with the following ["posts"], this will <b>Invalidate all queries that had a query key that starts with this key</b>.

To avoid this, we can pass in a second options argument to the invalidateQueries method and specify things such as `{exact: true}` to avoid this behaviour.

### Manually updating the cache

Manually adding to the cache for a query prevents the necessity to re-fetch the data after a resource creation for example.

```js
queryClient.setQueryData(["posts", newPost._id], newPostData);
```

We can also set a function to work with the old data -- SHOULD BE IMMUTABLE --

```js
queryClient.setQueryData(["posts", nexPost._id], (oldData) => {
    // Do stuff
    return newPostData; // Or whatever else
});
```

### Pagination

We can pass in pagination / limit and other queries as defined by the conventions above.

```js
const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page, limit }],
    keePreviousData: true,
    queryFn: () => getPosts({ page, limit }),
});
```

#### keePreviousData

Enables to still see previous data while the next page is loading

### Infinite Scrolling

Assuming the API sends back as part of the response data what the next "Page" should be as a "nextPage" key in the response object. The queryFn can now take a pageParam, which will be set to whatever getNextPageParam is set to.

```js
const { status, error, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
        queryKey: ["posts", "infinite"],
        getNextPageParam: (prev) => prev.nextPage,
        // Can set default value of pageParam
        queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
    });
```

-   fetchNextPage is a method to continue the infinite loading.
-   isFetchingNextPage is a loader state
-   hasNextPage is dependant on the value of getNextPageParam

--> The data has now a data.pages property to render the data

### Use Queries Hook

The useQueries hook allows to pass an array of queries to run.
The example here isn't great, this is more used to render a list of ID's somewhere.

```js
const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
});

useQueries({
    queries: (postsQuery?.data ?? []).map((post) => {
        return {
            queryKey: ["posts", post._id],
            queryFn: () => {
                getPost(post._id);
            },
        };
    }),
});
```

### Pre fetching

We can prefetch queries by using the queryClient.prefetchQuery() method. It configures globally like the others.
