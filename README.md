# Files

_`Files` is a file systems browser with stats viewer._

The application consists of two main modules: `Agent` and `Client`. It operates either completely on end–user's machine or in 'web client to local agent' mode.

![img](https://i.imgur.com/sAkC0wy.png)

Initial requirements:

> Allow the user to provide a path to a directory
>
> Find all text files in that directory and its children
>
> If it encounters a compressed archive, open it and process any text files inside
>
> Output a histogram of the word counts for the files

## Running the application

The easiest way to run the application is trough Docker. The app is supplied with `docker-compose` file which defines and configures both applications. If you have Docker and Docker Compose installed on your machine submit the following:

```
# Assuming you're in the project root
$ docker-compose up -d
```

Now you may observe both apps working at:

- Client: [http://localhost:8080](http://localhost:8080)
- Agent: [http://localhost:2018](http://localhost:2018)

(Generally you interested on in the `client`.)

The developer's version of the app is available by submitting the following command:

```
# Assuming you're in the project root
$ cd agent
$ npm install
$ npm run dev
// open different tty at the repository root
$ cd client
$ npm install
$ npm run dev
```

## Operating application

The app's UI is divided by two: the file manager and stats view. Stats view is empty initially, in order to observe word stats you should double-click on any text file (`ascii` or `utf`). Double click on any archive or directory will navigate to its location and list contents in the file manager.

## System requirements

For file type detecting purposes the app uses `libmagic` from within npm `mmmagic` package. User machine is required to have `build-essentials` in order to build `libmagic` from sources.

For Windows users, it is recommended to run the application from the Linux subsystem since `libmagin` is not win32 compatible library.
