SHELL_VERSION = $(shell gnome-shell --version | cut -d ' ' -f3 | cut -d '.' -f1)
VERSION = 42
ifeq ($(shell expr $(SHELL_VERSION) \>= 45), 1)
	VERSION=45
endif
ARCHIVE_NAME = shyriiwook@madhead.me.zip

.PHONY: 42
42:
	@ mkdir -p build/42
	@ cp 42/* build/42/

.PHONY: 45
45: 45/dbus.js 45/extension.js 45/metadata.json
	@ mkdir -p build/45
	@ cp 45/* build/45/

.PHONY: extension-42
extension-42:
	@ mkdir -p build/dist/42
	@ cd 42 && zip -qr ../build/dist/42/${ARCHIVE_NAME} ./*

.PHONY: extension-45
extension-45:
	@ mkdir -p build/dist/45
	@ cd 45 && zip -qr ../build/dist/45/${ARCHIVE_NAME} ./*

.PHONY: install
install: extension
	@ gnome-extensions install -f build/dist/${VERSION}/${ARCHIVE_NAME}

.PHONY: extension
extension: extension-${VERSION}

.PHONY: clean
clean:
	@ rm -rf build
