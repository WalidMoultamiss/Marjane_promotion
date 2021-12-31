# Marjane promotion 🚀

## Create user

### Create token
    endpoint: POST: localhost:8080/api/users/createToken
###
    {
    "fullName":"walid",
    "email":"walid@gmail.com",
    "role":"admin_general"
    }

### create user using token
    endpoint: POST: localhost:8080/api/users/login

###
    {
        "password":"1233",
        "token":"eyi876iuyiuyiy7657"
    }

## login

    endpoint: POST: localhost:8080/api/users/login

###
    {
        "email":"walid@gmail.com",
        "password":"1234",
        "role":"admin_marjan"//marjane admin
    }

## create promotion

    endpoint: POST: localhost:8080/api/promotions/

###
    {
    "remise":"5",
    "product_id":"1"
    }

## validate promotion

    endpoint: POST: localhost:8080/api/promotions/status
###
    {
    "promotion_id":"12",
    "status":"accepted",
    "comment":"laykhellik lina a l admin"
    }

## get Logs token required

    endpoint: GET: localhost:8080/api/logs/

## .env variables

    MYSQL_HOST
    MYSQL_PORT
    MYSQL_USER
    MYSQL_PASSWORD
    MYSQL_DATABASE
    JWT_KEY
    NODEMAILER_EMAIL
    NODEMAILER_PASS