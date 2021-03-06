# POWERTOFLY API Task

Implementation of [PowerToFly task](https://gist.github.com/scabbiaza/82e9069cfa71c4d7aa9d9539a794a1db).

## Architecture

### Overview

![image info](./ui/public/architecture.png)

ReactUI communicates through Flask API and both served by nginx. 

- UI: [ptf.asgarov.ru](http://ptf.asgarov.ru/) 
- API: [user.api.ptf.asgarov.ru](http://user.api.ptf.asgarov.ru/users?page=1)

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
The very first API request triggers redis caching and indexing. 
Also caching is possible with flask custom command

```commandline
FLASK_APP=powertoflyapi.api .venv/bin/flask cacheusers
```

or simply
```commandline
make cache-users
```

#### Database

Database is only used when any other cache fails.

### Database setup

There is a simple command to initialize the database with all the migrations
and seeding (note that you need to create the database first):
```commandline
make init
```

in general, it brakes down to following:

The codebase provides migrations and seeding for faster delivery,
to initialize migrations use

```commandline
flask db init
flask db migrate
flask db upgrade
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

| Field            | Type        | Null | Key | Default | Extra          |
|------------------|-------------|------|-----|---------|----------------|
| id               | int(20)     | NO   | PRI | NULL    | auto_increment |
| first_name       | varchar(20) | NO   |     | NULL    |                |
| last_name        | varchar(20) | NO   |     | NULL    |                |
| email            | varchar(50) | NO   |     | NULL    |                |
| age              | int(3)      | NO   |     | NULL    |                |
| is_employee      | smallint(1) | NO   |     | NULL    |                |


## React testing environment
This wasn't a part of the assignment, but I felt like a UI will be much 
more convenient for testing then, say, postman requests.
