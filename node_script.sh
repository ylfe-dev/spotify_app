sudo docker run -it --user 1000 --rm --name node-scrpt -v ./backend:/usr/src/app -w /usr/src/app node:19 npm install
