# cams_fe

## Project setup( local environment)
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##  Project setup(Docker environment)
If you don't want to install the nodejs enviroment, you can use "docker.sh" script.
If your operating system is windows：
👉 https://blog.csdn.net/qq_33598125/article/details/88844872

The script assumes you have docker installed on the machine.
When you exited Terminal, the Dokcer Container will be deleted automaticly.

Linux & MacOS
```
./docker.sh install
./docker.sh serve
./docker.sh build
./docker.sh lint
```
if you want to run "npm audit fix" command, just run:
```
./docker.sh fix
```
enjoy it 😊