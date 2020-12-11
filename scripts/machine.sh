#!/bin/bash


ssh-add -k /Users/idahan/Desktop/dahan/교육\ 사업\ /교재/NodeJSExmple/6weeks/keys/node_tutorial_key_0108.pem

docker-machine create --driver generic --generic-ip-address=15.164.214.147 --generic-ssh-user ubuntu node-machine