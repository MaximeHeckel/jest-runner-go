package main

import "testing"

func TestAdd(t *testing.T) {
	got := Add(3, 2)
	want := 5
	if got != want {
		t.Errorf("Got %d expected %d", want, got)
	}
}
