import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#005bb5" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Reportes",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="avisos"
        options={{
          title: "Avisos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="permisos"
        options={{
          title: "Permisos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="lock-closed" size={24} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
