# Go & Node
This is an experimental repo, I am playing around with a dockeraized NodeJs server. With a Go client, to learn more about marshalling and unmarshalling in Go

## How to run

 ```
 docker build -t goandnode .
 docker run --name goandnodecontainer -p 4000:4000 -d goandnode
 ```
