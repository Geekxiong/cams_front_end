#!/bin/bash

#############################################################################
# Use "./docker.sh server" to build the site at localhost:8080.		    #
# 									    #
# The script assumes you have docker installed on the machine.		    #
#	    								    #
# @author: baiyu						            #
#						   	 		    #
# @date: 2020.3.13							    #
#############################################################################

_runner() {

  docker run --rm -it -v "$PWD":/must/BXW_front_end -p 8080:8080 \
    node \
    bash -c "cd /must/BXW_front_end && $@"

}

case "$1" in
  install)
    _runner "npm install"
    ;;
  serve)
    _runner "npm run serve";
    ;;
  build)
    _runner "npm run build";
    ;;
  lint)
    _runner "npm run lint";
    ;;
  fix)
    _runner "npm audit fix";
    ;;
  *)
    echo "Unknown Argument $1 passed to the script";
    ;;
esac;

