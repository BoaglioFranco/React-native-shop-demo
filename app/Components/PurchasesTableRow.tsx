import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Purchase } from '../models/Purchase';

interface Props {
    purchase: Purchase
}

const PurchasesTableRow: React.FC<Props> = ({purchase}) => {


    return (
    <View style={stl.flex}>
        <Text category='c2'>{purchase.product.name}</Text>
        <View style={stl.group}>
        <Text style={stl.date}>{new Date(purchase.date).toDateString()}</Text>
        <Text style={stl.price}>${purchase.product.price}</Text>
        </View>
    </View>
    );
}

const stl = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        opacity: .7,
        
    },
    price: {
        fontWeight: 'bold',
        minWidth: 50,
        marginLeft: 10,
    },
    group: {
        flexDirection: 'row',
    }
})

export default PurchasesTableRow;