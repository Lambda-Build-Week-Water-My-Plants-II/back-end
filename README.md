# Backend
#### Production branch deployed at https://limitless-earth-34461.herokuapp.com/
##### Seeded information can be accessed by logging in with the following credentials
```

```

# Endpoints

#### Login/Register Routes

| Method | Endpoint                |  Description                                  |
| ------ | ----------------------- |  -------------------------------------------- |
| POST   | `/api/auth/login`       |  Logs in and returns token                    |
| POST   | `/api/auth/register`    |  Creates a new user                           |


#### User Routes

| Method | Endpoint                 |  Description                                                                         |
| ------ | ------------------------ |  ----------------------------------------------------------------------------------- |
| GET    | `/api/user`              |  Returns current user logged in               |
| PUT    | `/api/user/:id`          |  Edits user with the matching id              |
| DELETE | `/api/user/:id`          |  Deletes user with the matching id            |

#### Plant Routes

| Method | Endpoint                     |  Description                                                                       |
| ------ | -----------------------      |  --------------------------------------------------------------------------------- |
| GET    | `/api/plants`              |  Returns plants belonging to current user |
| GET    | `/api/plants/:id`          |  Returns info for specific plant          |
| POST   | `/api/plants`              |  Creates a new plant                      |
| PUT    | `/api/plants/:id`          |  Edits plant by id                        |
| DELETE | `/api/plants/:id`          |  Deletes the plant by id                  |

# Data Schema

#### USERS
```js
{
    username: STRING     // required
    password: STRING     // required
    phone_number: STRING // required example: (999)-999-9999 or 999-999-9999
}
```
#### Plants
```js
{
    nickname: STRING        // required
    species: STRING         // required
    h2oFrequency: STRING    // required
    image: STRING           // optional
}
```
![alt text](https://github.com/BW-Better-Professor-App1/Backend/blob/master/betterprofessor_dbdesign.png "Better Professor Database Design")