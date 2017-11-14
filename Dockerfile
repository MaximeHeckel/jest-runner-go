ARG NODE_VERSION=8
FROM node:${NODE_VERSION}-alpine

RUN apk --no-cache add go git mercurial subversion ca-certificates musl-dev && \
	mkdir -p /goroot /go/src /go/bin && \
	chmod -R 777 /go

ENV GOPATH=/go \
    GOBIN=/go/bin \
    PATH=${PATH}:/goroot/bin:/go/bin

WORKDIR /go/src/github.com/MaximeHeckel/go-test-runner/

COPY package.json .
COPY yarn.lock .

RUN yarn --ignore-scripts

COPY . .

RUN yarn build

CMD ["yarn", "test"]