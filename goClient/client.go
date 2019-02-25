package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type LoggedUsers struct {
	Users     []string  `json: "users"`
	LastLogin Timestamp `json: "lastLogin"`
}

type Timestamp struct {
	Reqtime string `json: "reqtime"`
	ReqDate string `json: "reqDate"`
}

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "4000"
	}

	resp, err := http.Get(fmt.Sprintf("http://localhost:%v/systeminfo", port))
	if err != nil {
		fmt.Println(err)
		return
	}

	var loggedUsers LoggedUsers
	json.NewDecoder(resp.Body).Decode(&loggedUsers)

	fmt.Println("Users are: { ")
	for _, user := range loggedUsers.Users {
		fmt.Printf("  %v\n", user)
	}
	fmt.Println("}")
	fmt.Printf("Time stamp info: {\n\tRequest time: %v \n\tRequest date: %v\n}\n", loggedUsers.LastLogin.Reqtime, loggedUsers.LastLogin.ReqDate)
}
