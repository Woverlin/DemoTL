import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  TouchableOpacity,
  AsyncStorage,
  FlatList 
} from 'react-native';
import {firebaseApp} from '../Config.js';
export default class Lst_LuyenNghe extends Component {
    static navigationOptions = ({ navigation }) => ({
        title:`${ navigation.state.params.name}`,
        headerTintColor:'#119f81',
      });
  constructor(props) {
    super(props);
    this.listenForItems = this.listenForItems.bind(this);
    this.getPic = this.getPic.bind(this);
    this.items = [];
    this.state = {
      img: [],
      items: [],
    }
  }


  getPic(pic) {
    return new Promise((resolve, reject) => {
      var storageRef = firebaseApp.storage().ref(pic);
      storageRef.getDownloadURL().then((url) => {
        resolve(url);
      }, (error) => {
        reject(error);
      });
    });
  }

  listenForItems() {
    firebaseApp.database().ref('/ChuDe').on('child_added', (dataSnapshot) => {
     // console.log('napshot', dataSnapshot);
      this.getPic(dataSnapshot.val().linkImg, dataSnapshot.val().stt)
        .then((pic2) => {
          let item = {
            name: dataSnapshot.val().word,
            picture: dataSnapshot.val().linkImg,
            stt: dataSnapshot.val().id,
            key: dataSnapshot.key,
            pic2,
          };
          this.setState({
            items: [...this.state.items, item]
          });
        }); 
    });
  }

  render() {
    const{ navigate }=this.props.navigation;
    const { params } = this.props.navigation.state;
    const { items } = this.state;
    //console.log('Items Items', items);
    return (
      
      <View style={{ flex: 1, justifyContent:'center',padding:20,backgroundColor: '#119f81' }}> 
        <FlatList  
          data={items}
          keyExtractor={(item) => items.stt}
          renderItem={({ item })=>
            <View style={{marginBottom: 10,backgroundColor: '#119f81'}}>
              <TouchableOpacity 
                style={styles.lesson} 
                onPress={()=>{ navigate('Game_LuyenNghe',{name:item.name,id:item.stt});}}
              > 
                <Image
                  style={styles.pic}
                  source={{uri:item.pic2}}/>
                <Text style={styles.lsname}>
                  Lesson : {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
  componentDidMount(){
    this.listenForItems();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon:{
    width: 25,
    height: 25,
  },
  lesson:{
    elevation: 5,
    alignItems:'center',
    flexDirection:'row',
    alignItems:'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    backgroundColor: 'white'
  },
  pic:{
    margin:10,
    height: 50,
    width: 70,
  },
  lsname:{
    color : '#119f81',
    fontSize:15,
    padding:17
  }
});
