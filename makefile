
deploy:
	ssh deconserve@pi 'cd ~/website && git fetch origin master && git reset --hard FETCH_HEAD'
