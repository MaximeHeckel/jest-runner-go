package main

import (
	"fmt"

	"github.com/MaximeHeckel/go-test-runner/example/stringutil"
	"github.com/MaximeHeckel/go-test-runner/example/stringutil2"
)

func main() {
	fmt.Println(stringutil.Reverse("hello"))
	fmt.Println(stringutil2.Reverse("world"))
}
