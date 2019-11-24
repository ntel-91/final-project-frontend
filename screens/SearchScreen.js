import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar.js'
import { FlatList } from 'react-native-gesture-handler';
import { setRssFeed } from '../action'
import { connect } from 'react-redux'


class SearchScreen extends Component {
    
    state = {
        term: "",
        podcast: '',
        podcastsArray: []
    }

    handleChange = (text) => {
        this.setState({
            term: text,
            podcast: '',
            podcastsArray: [],
            rss: ''
        })
    }

    submit = (searchTerm) => {
        let URL = `https://itunes.apple.com/search?term=${searchTerm}&media=podcast&limit=8`
        // let CORS = 'https://cors-anywhere.herokuapp.com/'
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            results = data.results.map((podcast) => {
                return {
                    collection_name: podcast.collectionCensoredName,
                    artist_name: podcast.artistName,
                    image: podcast.artworkUrl60,
                    rss: podcast.feedUrl
                }
            })
            this.setState({
                podcastsArray: results
            })
        })
    }

    renderPodcastShows = () => {
        console.log('did')
    }
  
    render() {
        return (
            <View  style={styles.container}>
                
                
                {/* <SearchBar 
                    // term={term}
                    onTermSubmit={this.testFetchFunction}
                /> */}

                <TextInput 
                    defaultValue={this.state.term}
                    onChangeText={this.handleChange}
                    placeholder="Search"
                />

                <TouchableOpacity onPress={() => this.submit(this.state.term)}>
                    <Text>Submit</Text>
                </TouchableOpacity>

                <FlatList
                    // keyExtractor=
                    data={this.state.podcastsArray}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.props.setRssFeed(item)
                                        this.props.navigation.navigate('PodcastShow')}}
                                >
                                    <Text>{item.collection_name}</Text>
                                    <Image
                                        style={{width: 50, height: 50}}
                                        // source={item.image}
                                        source={{uri: item.image}}
                                    />    
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
                
            </View>
        )
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
  

  export default connect(null, { setRssFeed })(SearchScreen)