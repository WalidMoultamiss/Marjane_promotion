# Marjane_promotion

## Create user

    endpoint: POST: localhost:8080/api/users/
    
    {
    "fullName":"walid",
    "email":"walid@gmail.com",
    "password":"1234",
    "role":"admin_general"
    }

## login

    endpoint: POST: localhost:8080/api/users/login

    {
        "email":"walid@gmail.com",
        "password":"1234"
    }

## create promotion

    endpoint: POST: localhost:8080/api/promotions/

    {
    "remise":"5",
    "cathegory_id":"1"
    }

## validate promotion

    endpoint: POST: localhost:8080/api/promotions/status

    {
    "promotion_id":"12",
    "status":"accepted",
    "comment":"laykhellik lina a l admin"
    }
    
