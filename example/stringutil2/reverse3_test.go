package stringutil2

import "testing"

func TestReverse3(t *testing.T) {
	for _, c := range []struct {
		in, want string
	}{
		{"Hello, world", "dlro ,olleH"},
		{"Jest", "tseJ"},
		{"", ""},
	} {
		got := Reverse3(c.in)
		if got != c.want {
			t.Errorf("Got %s expected %s", c.want, got)
		}
	}
}
