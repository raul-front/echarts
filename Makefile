BUCKET=raul-demo
PROJECT=echarts
LOGKEY=XXX	# 第一次上传后会生成key，保存在这里，本地上传时会用到

# 初始化submodule
initModule:
	git submodule init
	git submodule update

# 更新submodule
updateModule:
	git submodule foreach git pull origin master
	git commit -am 'update submodule: lisa'
	git push origin master

# 本地提交部署
localDeploy:
	rm -rf ./dist
	npm run build
	# 本地已安装 qshell 并登陆
	# 删除原文件
	qshell listbucket2 --prefix '${PROJECT}/' ${BUCKET} -o todelete.txt
	qshell batchdelete --force ${BUCKET} -i todelete.txt
	rm todelete.txt
	# 删除本地数据，到达上传所有文件；每次上传都有日志，上传前会对比文件
	rm -rf /Users/raul/.qshell/qupload/${LOGKEY}
	# 上传新文件
	qshell qupload2 --src-dir=./dist/ --overwrite --bucket=${BUCKET}

# github action 自动部署
deploy:
	curl https://devtools.qiniu.com/qshell-v2.6.1-linux-amd64.tar.gz | tar zxv; \
	chmod +x qshell; \
	./qshell account ${AK} ${SK} raul; \
	# 删除原文件
	./qshell listbucket2 --prefix '${PROJECT}/' ${BUCKET} -o todelete.txt
	./qshell batchdelete --force ${BUCKET} -i todelete.txt
	rm todelete.txt
	# 上传新文件
	./qshell qupload2 --src-dir=./dist/ --overwrite --bucket=${BUCKET}
