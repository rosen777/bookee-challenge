import React, { Component } from 'react'
import { ScrollView, Button, View, Text, StyleSheet, FlatList, StatusBar} from 'react-native'

export default class App extends Component {
    state= {
            list: [],
            refresh: true,
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

   

    fetchUsers = (newList) => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(res => res.json())
          .then(responseJson => {
            var obj = responseJson;
            var users = []
            obj.forEach((obj) => {
                users.push({
                    name: obj.name,
                    email: obj.email,
                    id: obj.id
                })
            })

            newList = this.getRandom(users, 7)
            this.setState({
              list: newList,
              refresh: false
            });
     
          })
    }

    componentWillMount() {
        this.fetchUsers()
    }

    loadNewUsers = () => {
        this.setState({
            list: [],
            refresh: true
        })
        this.fetchUsers();
    }

    render() {
        return (
            <ScrollView 
                onScrollEndDrag={this.loadNewUsers} 
                refreshing={this.state.refresh}
                onRefresh={this.loadNewUsers}
            >
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
                <View style={styles.row}>
                    <View style={styles.userRow}>
                        <Text style={styles.UserInfo}>
                            {item.email}
                        </Text>
                        <Text style={styles.UserInfo}>
                            {item.id}
                        </Text>
                    </View>
                    <View style={styles.row}>
                    <Button
                        title="Name"
                        onPress={() => alert(item.name)}
                    />
                    </View>
                </View>
              )}
            />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
  userInfo: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: "Avenir"
  },
  userRow: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});