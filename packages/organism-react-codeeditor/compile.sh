#!/bin/sh


develop(){
    echo "Develop Mode";
    npm run build
}

case "$1" in
  *)
    develop
    exit
esac

exit $?
