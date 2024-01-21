import Gio from 'gi://Gio';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Keyboard from 'resource:///org/gnome/shell/ui/status/keyboard.js';

import * as dbus from './dbus.js';

export default class ShyriiwookExtension extends Extension {
    enable() {
        console.log('DRAKE');
        console.log(dbus);

        this._dbus = Gio.DBusExportedObject.wrapJSObject(dbus.DBUS_INTERFACE, this);
        this._dbus.export(Gio.DBus.session, dbus.DBUS_PATH);
    }

    disable() {
        this._dbus.flush();
        this._dbus.unexport();
        delete this._dbus;
    }

    get availableLayouts() {
        let sources = Keyboard.getInputSourceManager().inputSources;
        let indices = Object.keys(sources).sort((a, b) => a - b);
        let layouts = [];

        for (let index of indices)
            layouts.push(sources[index].id);

        return layouts;
    }

    get currentLayout() {
        return Keyboard.getInputSourceManager().currentSource.id;
    }

    activate(layout) {
        let sources = Keyboard.getInputSourceManager().inputSources;

        for (let index in sources) {
            if (sources[index].id == layout) {
                sources[index].activate();
                return;
            }
        }
    }
}
