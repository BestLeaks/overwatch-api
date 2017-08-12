<p align="center">
<img src="https://overwatch-a.akamaihd.net/img/logos/logo-overwatch-full-31140b6c4bc1ef543e1ae1c0d9c6a4d397618bf3dbf29586dbb7c0e82c3e657d6220ab245ccafa5401a10d106d16fd5ec45e5dd69806f2bd894c13014b0cf11f.png" height="400" width="650">
  
</p>

  [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)



## Installation

```
rake webpacker:install && rake webpacker:install:react

yarn install

bundle

rake db:create

rake db:migrate

yarn start

edit .env file with your keys

rails s
```

## About this Application:

[OverTrack](https://overtrack-api.herokuapp.com)

Players that play Overwatch (made by Blizzard Entertainment) can search their Battle.net ID. The app fetches the Overwatch API, saves all the data to the database and displays the player statistics, including rating, level, and hero stats, on the main page which is rendered in React. Players can then analyze their individual performance and compare it with their friends or search for other players.

## Development:

OverTrack was created using primarily [React JS](https://facebook.github.io/react/) (React 15.6.1) on the front-end with API Javascript fetch communication with [Rails](http://rubyonrails.org/) (Rails 5.1.2) on the back-end. Additional styling was implemented using [Materialize](http://materializecss.com/). User authentication and tangential features are implemented using Devise Battle.net OAuth.


