ARCHIVE_NAME = shyriiwook@madhead.me.zip
SHELL_VERSION = $(shell gnome-shell --version | cut -d ' ' -f3 | cut -d '.' -f1)
DEFAULT_VERSION = 42

ifeq ($(shell expr $(SHELL_VERSION) \>= 45), 1)
	DEFAULT_VERSION=45
endif

.PHONY: 42
42: 42/dbus.js 42/extension.js 42/metadata.json
	mkdir -p build/42
	cp 42/* build/42

.PHONY: 45
45: 45/dbus.js 45/extension.js 45/metadata.json
	mkdir -p build/45
	cp 45/* build/45

.PHONY: extension-42
extension-42: 42
	mkdir -p build/dist/42
	cd 42 && zip -qr ../build/dist/42/${ARCHIVE_NAME} ./*

.PHONY: extension-45
extension-45: 45
	mkdir -p build/dist/45
	cd 45 && zip -qr ../build/dist/45/${ARCHIVE_NAME} ./*

.PHONY: extension
extension: extension-${DEFAULT_VERSION}

.PHONY: install
install: extension
	gnome-extensions install -f build/dist/${DEFAULT_VERSION}/${ARCHIVE_NAME}

.PHONY: clean
clean:
	rm -rf build
