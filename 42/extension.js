const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const dbus = Me.imports.dbus;

const { Gio, GLib } = imports.gi;
const { getInputSourceManager } = imports.ui.status.keyboard;

class Extension {
    enable() {
        this._dbus = Gio.DBusExportedObject.wrapJSObject(dbus.DBUS_INTERFACE, this);
        this._dbus.export(Gio.DBus.session, dbus.DBUS_PATH);
    }

    disable() {
        this._dbus.flush();
        this._dbus.unexport();
        delete this._dbus;
    }

    get availableLayouts() {
        let sources = getInputSourceManager().inputSources;
        let indices = Object.keys(sources).sort((a, b) => a - b);
        let layouts = [];

        for (let index of indices)
            layouts.push(sources[index].id);

        return layouts;
    }

    activate(layout) {
        let sources = getInputSourceManager().inputSources;

        for (let index in sources) {
            if (sources[index].id == layout) {
                sources[index].activate();
                return;
            }
        }
    }
}

function init() {
    return new Extension();
}
