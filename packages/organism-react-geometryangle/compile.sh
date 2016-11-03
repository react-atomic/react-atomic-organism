#!/bin/sh
find ./assets -name "*.js" | xargs rm -rf

phpc=`DUMP=cli php -r "include('config/config.php');"`

production(){
    echo "Production Mode";
    NODE_ENV=production PHP_CONFIG=$phpc webpack -p 
}

develop(){
    echo "Develop Mode";
    npm run build
    PHP_CONFIG=$phpc webpack
}

case "$1" in
  p)
    production
    ;;
  *)
    develop
    exit
esac

exit $?
