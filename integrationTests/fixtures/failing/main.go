package main

import "fmt"

// Add adds 2 digits
func Add(a, b int) int {
	return a + b + 1
}

func main() {
	fmt.Println(Add(1, 2))
}
