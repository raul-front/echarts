BUCKET=raul-admin

# 本地提交部署
localDeploy:
	rm -rf ./dist
	npm run build
	# 本地已安装 qshell 并登陆
	qshell qupload2 --src-dir=./dist/ --overwrite --bucket=${BUCKET}


# github action 自动部署
deploy:
	curl https://devtools.qiniu.com/qshell-v2.6.1-linux-amd64.tar.gz | tar zxv; \
	chmod +x qshell; \
	./qshell account ${AK} ${SK} ; \
	./qshell qupload2 --src-dir=./dist/ --overwrite --bucket=${BUCKET}
