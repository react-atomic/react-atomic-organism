#!/bin/sh
# find ./assets -name "*.js" | xargs rm -rf


production(){
    echo "Production Mode";
}

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
