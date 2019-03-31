import React, { Component } from 'react'
import { Button, View, Text, StyleSheet, FlatList, StatusBar} from 'react-native'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [
                {
                    name: "John",
                    email: "anotherrollerinthenight@email.com",
                    id: 1
                },
                {
                    name: "Sindey",
                    email: "anotherrollerinthenight@email.com",
                    id: 3
                },
                {
                    name: "Kim",
                    email: "anotherrollerinthenight@email.com",
                    id: 3
                }
            ],
            list: [],
            refresh: true,
            email: [],
            name: [],
            id: [],
            user: {
                id: 0,
                name: '',
                email: '',
            }
        }
        // this.fetchCityTemp('London', 'UK')   
        this.fetchUsers()
    }

    fetchUsers = () => {
        var newList = []
        var list = this.getRandom(this.state.users, 7)
        for (user in list) {
            this.fetchCityUser(newList)
        }
    }

    getRandom = (arr, n) => {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    loadNewUsers = () => {
        this.setState({
            list: [],
            refresh: true
        })
        this.fetchUsers();
    }


    fetchCityUser = (newList) => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(res => res.json())
          .then(responseJson => {
            var r = responseJson.main;
            var obj = responseJson;
            var user = {};
            obj.forEach(function(obj) {
               user = {
                   email: obj.email,
                   name: obj.name,
                   id: obj.id
               }
            });
            newList.push(user);
            this.setState({
              list: newList,
              refresh: false
            });
            console.log("after", this.state.list);
          });
    }

    render() {
        return (
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text
              style={{
                width: "100%",
                paddingTop: 40,
                paddingBottom: 15,
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              🎲 Bookee Challenge
            </Text>
            <FlatList
              style={{ width: "100%" }}
              data={this.state.list}
              refreshing={this.state.refresh}
              onRefresh={this.loadNewUsers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={item.row}>
                  <Text style={styles.CityN}>
                    {item.id} – {item.email}
                  </Text>
                  <Button
                    style={styles.CityN}
                    title="Name"
                    onPress={() => alert(item.name)}
                  />
                </View>
              )}
            />
          </View>
        );
    }
}


const styles = StyleSheet.create({
    cityN: {
        fontSize: 20,
        lineHeight: 40,
        fontFamily: 'Avenir',
    },
    row: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    container: {
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
});