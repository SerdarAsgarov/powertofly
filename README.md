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

## Deployment

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

### Database

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
- POST **/users** - Create new user
- DELETE **/users/<user_id>** - Delete a user

### DB Structure


## React testing environment

