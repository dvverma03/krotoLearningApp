import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function Homepage() {
  return (
    <View>
      <View style={styles.Container}>
        <Image style={styles.HeroImage} source={{uri:"https://i0.wp.com/picjumbo.com/wp-content/uploads/kayaking-at-sunset-free-photo.jpg?w=600&quality=80"}} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Container:{
        flex:1
    },
    
})