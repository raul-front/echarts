BUCKET=raul-admin

# 初始化submodule
initModule:
	git submodule init
	git submodule update

# 更新submodule
updateModule:
	git submodule foreach git pull origin master

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
	./qshell account ${AK} ${SK} raul; \
	./qshell qupload2 --src-dir=./dist/ --overwrite --bucket=${BUCKET}
