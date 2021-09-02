import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

interface Props {}

const FormLabel: React.FC<Props> = ({children}) => {

    return (
    <Text style={stl.text} category='h6'>{children as any}</Text>
    );
}

const stl = StyleSheet.create({
    text: {

    }
})

export default FormLabel;