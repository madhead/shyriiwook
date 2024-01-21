var DBUS_INTERFACE = `
  <node>
    <interface name="me.madhead.Shyriiwook">

      <property name="availableLayouts" type="as" access="read" />

      <property name="currentLayout" type="s" access="read" />
      
      <method name="activate">
        <arg type="s" direction="in" name="layout"/>
      </method>

    </interface>
  </node>
`;

var DBUS_PATH = '/me/madhead/Shyriiwook';
