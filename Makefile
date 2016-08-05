PY=python3
SCRIPT=bin/populate_map.py
OUTPUTDIR=output

BASEDIR=$(CURDIR)

FTP_HOST=ftp.ankursinha.in
FTP_USER=ankurhsj
FTP_TARGET_DIR=/public_html/cajal-map
FTP_PORT=21

help:
	@echo 'Makefile for a pelican Web site                                        '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make html                        (re)generate the web site          '
	@echo '   make ftp_upload                  upload the web site via FTP        '
	@echo '                                                                       '

html:
	$(PY) $(SCRIPT)
	rm -fr $(OUTPUTDIR)/*
	cp -r js css index.html $(OUTPUTDIR)
	cp -f data/htaccess $(OUTPUTDIR)/.htaccess


ftp_upload: html
	lftp ftp://$(FTP_USER)@$(FTP_HOST) -p $(FTP_PORT) -e "set ftp:ssl-force on; set ftp:ssl-protect-data on; set ssl:verify-certificate no; mirror -R --delete --parallel=3 $(OUTPUTDIR) $(FTP_TARGET_DIR) ; quit"

.PHONY: html ftp_upload help
