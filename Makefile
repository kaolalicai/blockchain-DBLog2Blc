NAME=oplog2blockchain,
REGISTRY=r.p.cailve.cn
TAG = latest
TEST_TAG = unit_test

gen:
	echo generator docker files ${REGISTRY} ${NAME}
	sed -e "s/\#{NAME}/${NAME}/" -e "s/\#{REGISTRY}/${REGISTRY}/" docker/prod/DockerfileTemp > docker/prod/Dockerfile
	sed -e "s/\#{NAME}/${NAME}/" -e "s/\#{REGISTRY}/${REGISTRY}/" docker/testBase/DockerfileTemp > docker/testBase/Dockerfile
	sed -e "s/\#{NAME}/${NAME}/" -e "s/\#{REGISTRY}/${REGISTRY}/" docker/test/DockerfileTemp > docker/test/Dockerfile

base:
	echo building ${NAME}-base:latest
	cp docker/base/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}-base:latest .
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}-base:latest

build: base
	echo building ${NAME}:${TAG}
	npm run build
	cp docker/prod/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	rm Dockerfile
	docker push "${REGISTRY}/${NAME}:${TAG}"

testBase:
	echo building ${NAME}-base:latest
	cp docker/testBase/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}-test-base:latest .
	rm Dockerfile

test: testBase
	echo testing ${NAME}:${TEST_TAG}
	cp docker/test/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}:${TEST_TAG} .
	rm Dockerfile
	docker run --name ${NAME}-${TEST_TAG} --rm ${REGISTRY}/${NAME}:${TEST_TAG}


