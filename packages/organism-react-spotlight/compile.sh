#!/bin/sh
find ./assets -name "*.js" | xargs rm -rf

develop(){
    echo "Develop Mode";
    npm run build
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
