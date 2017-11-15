FROM node:8-alpine

RUN apk --no-cache add go git mercurial subversion ca-certificates musl-dev && \
	mkdir -p /goroot /go/src /go/bin && \
	chmod -R 777 /go

ENV GOPATH=/go \
	GOBIN=/go/bin \
	PATH=${PATH}:/goroot/bin:/go/bin

WORKDIR /go/src/github.com/MaximeHeckel/go-test-runner/

COPY package.json yarn.lock jest.config.js .flowconfig .babelrc ./
ADD src ./src
ADD example ./example
ADD integrationTests ./integrationTests

RUN yarn --ignore-scripts && \
	yarn build

CMD ["yarn", "test"]