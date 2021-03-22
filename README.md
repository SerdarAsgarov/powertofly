# POWERTOFLY API Task

Implementation of [PowerToFly task](https://gist.github.com/scabbiaza/82e9069cfa71c4d7aa9d9539a794a1db).

## Architecture

### Overview


### Stack
- API: Flask + Nginx
  - Redis (RediSearch)
  - PostgreSQL
- UI: ReactJS + Nginx

### Scaling
Scaling is possible through creating replicas and sharding for both
_RediSearch_ and _Postgres_ 

## Deployment and installation

### Local

```commandline
make docker-up-dev
```

it takes two arguments:

- DEBUG (_bool_, default: true) - Run in debug mode (output goes to console) 
- REBUILD (_bool_, default: false) - Rebuild docker before starting

examples:

```commandline
DEBUG=false REBUILD=true make docker-up-dev
```

### Prod

```commandline
make docker-up-prod
```

For database setup refer to [Database setup](#Database) down below

### Cache

There are three types of sources of data:
- Local storage
- Database
- Redis

#### Local storage

The used source is shown on the bottom of the page. By default, 
the very first request caches the search results locally and next time
a user opens the page the results are taken from the local storage. 
Ideally, creating a new record updates the cache version in the headers,
and the local cache gets cleared. Since we don't have any sorting, and 
the cache results of the first page will always remain the same I didn't implement the cache versioning and only
described it.

#### Redis

If no cache was found locally API will try and look for the records in Redis.
The very first API request triggers redis caching and indexing. Not the best
approach, but it will work fine for this app.

#### Database

Database is only used when any other cache fails.

### Database setup

The codebase provides migrations and seeding for faster delivery,
to initialize migrations use

```commandline
flask db init
flask db migrate
```

for seeding 1MM users use

```commandline
flask seed run 
```

## API

User API is based on Flask

### Methods
- **/** - Basic API Information
- GET **/users** - Return all users
- POST **/users** - Create new user.
  Parameters:
  - _firstName_ - string
  - _lastName_ - string
  - _email_ - string
  - _age_ - int
  - _is_employee_ - bool

### DB Structure


## React testing environment
This wasn't a part of the assignment, but I felt like a UI will be much 
more convenient for testing then, say, postman requests.
