#!/bin/bash
ipv4=$(ifconfig | grep "inet " | awk '{print $2}' | grep -E "^192\.168\.[0-9]+\.[0-9]+")
if [ -z "$ipv4" ]; then
    echo "Visit your new website http://127.0.0.1:8000/hauptverzeichnis/home/home.html"
else
    echo "Visit your new website http://$ipv4:8000/hauptverzeichnis/home/home.html"
fi
node server.js
