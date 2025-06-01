import React from "react";
import { Platform, Text, View } from "react-native";

export default function SystemInfo () {
    return (
        <View>
            <Text>Platform: {Platform.OS}</Text>
            <Text>{Platform.Version ? `Version: ${Platform.Version}` : null }</Text>
            <Text>Mode: {__DEV__ ? 'Developtment' : 'Production'}</Text>
        </View>
    )
}