export const DBUS_INTERFACE = `
  <node>
    <interface name="me.madhead.Shyriiwook">

      <property name="availableLayouts" type="as" access="read" />
      
      <method name="activate">
        <arg type="s" direction="in" name="layout"/>
      </method>

    </interface>
  </node>
`;

export const DBUS_PATH = '/me/madhead/Shyriiwook';
