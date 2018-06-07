import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  TouchableOpacity,
  AsyncStorage,
  FlatList, ScrollView
} from 'react-native';
import { firebaseApp } from '../Config.js';
import CheckAlert from "react-native-awesome-alert"
import Icon from 'react-native-vector-icons/Ionicons';
export default class Lst_Test extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Test ' + `${navigation.state.params.name}`,
    headerTintColor: '#119f81',
  });
  constructor(props) {
    super(props);
    this.listenForItems = this.listenForItems.bind(this);
    this.GetUser = this.GetUser.bind(this)
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
  GetUser = async () => {
    //const value = await AsyncStorage.getItem('user');
    const UserKey = await AsyncStorage.getItem('userKey');
    await this.setState({
      userKey: UserKey
    }, () => { console.log('userkey', this.state.userKey) })
  }
  async listenForItems() {
    console.log('runnnnn')
    const { params } = this.props.navigation.state;
    firebaseApp.database().ref('/User/' + this.state.userKey + '/Process/' + params.id).once('value', (dataSnapshot) => {
      console.log('datasnap', dataSnapshot.val())
      if (dataSnapshot.val() === null) {
        let item = {
          part1: 0,
          part2: 0,
          part3: 0,
          part4: 0,
          part5: 0,
          part6: 0,
          part7: 0,
        }
        this.setState({
          items: item
        }, () => { console.log('item', this.state.items) });
      }
      else {
        this.setState({
          items: dataSnapshot.val()
        }, () => { console.log('item', this.state.items) });
      }
    });
  }
  test1() {
    this.checkAlert.alert("Mẹo",
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Text style={styles.note}>1.Nhìn tổng thế hình ảnh và phán đoán những danh từ, đồng từ có liên quan. </Text>
        <Text style={styles.note}>2.Chú ý nghe động từ và danh từ của từng phương án. </Text>
        <Text style={styles.note}>3.Không bỏ qua những chi tiết nhỏ trong hình.</Text>
        <Text style={styles.note}>4.Quan sát hành động đang xảy ra trong hình và chú ý đến thì tiếp diễn.</Text>
      </View>,
      [
        { text: "Bắt đầu", onPress: () => { this.props.navigation.navigate('TestPart1', { name: `${this.props.navigation.state.params.name}`, id: this.props.navigation.state.params.id }) } },
        { text: "Để sau", onPress: () => console.log("Cancel touch") }
      ])
  }
  test2() {
    this.checkAlert.alert("Mẹo",
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Text style={styles.note}>1.Phải nghe được câu hỏi thì mới trả lời được. </Text>
        <Text style={styles.note}>2.Cần tập trung nghe các keywords. </Text>
        <Text style={styles.note}>3.Xác định dạng câu hỏi: WH, Yes/no, câu hỏi đuôi, câu hỏi lựa chọn hay câu trần thuật.</Text>
      </View>,
      [
        { text: "Bắt đầu", onPress: () => { this.props.navigation.navigate('TestPart2', { name: `${this.props.navigation.state.params.name}`, id: this.props.navigation.state.params.id }) } },
        { text: "Để sau", onPress: () => console.log("Cancel touch") }
      ])
  }
  test3() {
    this.checkAlert.alert("Mẹo",
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Text style={styles.note}>1.Đọc câu hỏi trước khi nghe. </Text>
        <Text style={styles.note}>2.Nếu có thể, nên đọc các đáp án cho sẵn trước khi nghe. </Text>
        <Text style={styles.note}>3.Nên vừa nghe vừa giải quyết câu hỏi.</Text>
        <Text style={styles.note}>4.Nắm rõ thứ tự câu hỏi: Các câu hỏi thường được đặt theo thứ tự nội dung của bài đối thoại.
      Tuy nhiên, cũng có trường hợp không phải như vậy.</Text>
        <Text style={styles.note}>5.Nghe kỹ phần nội dung sau các từ/cụm từ nối (but, however, actually, in fact, as a matter of fact, in that case, so, then, well, v.v.)</Text>
        <Text style={styles.note}>6.Không nên mải suy nghĩ về các câu hỏi đã qua.</Text>
      </View>,
      [
        { text: "Bắt đầu", onPress: () => { this.props.navigation.navigate('TestPart3', { name: `${this.props.navigation.state.params.name}`, id: this.props.navigation.state.params.id }) } },
        { text: "Để sau", onPress: () => console.log("Cancel touch") }
      ])
  }
  test4() {
    this.checkAlert.alert("Mẹo",
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Text style={styles.note}>1.Đọc trước câu hỏi và các đáp án. </Text>
        <Text style={styles.note}>2.Chú ý mối quan hệ giũa câu hỏi và nội dung bài nói. </Text>
        <Text style={styles.note}>3.Đáp án thường có từ hoặc cụm từ gần với từ hoặc cụm từ bạn nghe được.</Text>
        <Text style={styles.note}>4.Nghe được đáp án thì tô ngay lập tức.</Text>
      </View>,
      [
        { text: "Bắt đầu", onPress: () => { this.props.navigation.navigate('TestPart4', { name: `${this.props.navigation.state.params.name}`, id: this.props.navigation.state.params.id }) } },
        { text: "Để sau", onPress: () => console.log("Cancel touch") }
      ])
  }
  test5() {
    this.checkAlert.alert("Mẹo",
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Text style={styles.note}>1.Nhìn tổng thế hình ảnh và phán đoán những danh từ, đồng từ có liên quan. </Text>
        <Text style={styles.note}>2.Chú ý nghe động từ và danh từ của từng phương án. </Text>
        <Text style={styles.note}>3.Không bỏ qua những chi tiết nhỏ trong hình.</Text>
        <Text style={styles.note}>4.Quan sát hành động đang xảy ra trong hình và chú ý đến thì tiếp diễn.</Text>
      </View>,
      [
        { text: "Bắt đầu", onPress: () => { this.props.navigation.navigate('TestPart5', { name: `${this.props.navigation.state.params.name}`, id: this.props.navigation.state.params.id }) } },
        { text: "Để sau", onPress: () => console.log("Cancel touch") }
      ])
  }
  test6() {
    this.checkAlert.alert("Mẹo",
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Text style={styles.note}>1.Nhìn tổng thế hình ảnh và phán đoán những danh từ, đồng từ có liên quan. </Text>
        <Text style={styles.note}>2.Chú ý nghe động từ và danh từ của từng phương án. </Text>
        <Text style={styles.note}>3.Không bỏ qua những chi tiết nhỏ trong hình.</Text>
        <Text style={styles.note}>4.Quan sát hành động đang xảy ra trong hình và chú ý đến thì tiếp diễn.</Text>
      </View>,
      [
        { text: "Bắt đầu", onPress: () => { this.props.navigation.navigate('TestPart6', { name: `${this.props.navigation.state.params.name}`, id: this.props.navigation.state.params.id }) } },
        { text: "Để sau", onPress: () => console.log("Cancel touch") }
      ])
  }
  test7() {
    this.checkAlert.alert("Mẹo",
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Text style={styles.note}>1.Nhìn tổng thế hình ảnh và phán đoán những danh từ, đồng từ có liên quan. </Text>
        <Text style={styles.note}>2.Chú ý nghe động từ và danh từ của từng phương án. </Text>
        <Text style={styles.note}>3.Không bỏ qua những chi tiết nhỏ trong hình.</Text>
        <Text style={styles.note}>4.Quan sát hành động đang xảy ra trong hình và chú ý đến thì tiếp diễn.</Text>
      </View>,
      [
        { text: "Bắt đầu", onPress: () => { this.props.navigation.navigate('TestPart7', { name: `${this.props.navigation.state.params.name}`, id: this.props.navigation.state.params.id }) } },
        { text: "Để sau", onPress: () => console.log("Cancel touch") }
      ])
  }
  async componentDidMount() {
    await this.GetUser()
    await this.listenForItems()
  }
  getPercent(item) {
    if (item === undefined)
      return '0%'
    else return item.toFixed(0) + '%'
  }
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { items } = this.state;
    //console.log('Items Items', items);
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#119f81' }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginBottom: 10, backgroundColor: '#119f81' }}>
            <CheckAlert //tuy chinh cho alert 
              styles={{
                modalContainer: { backgroundColor: "rgba(49,49,49,0.8)" },
                checkBox: { padding: 10 },
                modalView: {
                  marginBottom: 10,
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: StyleSheet.hairlineWidth
                },
                button: {
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 15,
                  borderColor: 'gray'
                },
                buttonContainer: {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderColor: 'gray',
                  borderTopWidth: StyleSheet.hairlineWidth
                },
              }}
              ref={ref => (this.checkAlert = ref)}
              transparent={true}
              animationType={"fade"}
            />
            <TouchableOpacity
              style={styles.lesson}
              onPress={this.test1.bind(this)}>
              {/* <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                source={require('../image/num1.png')} /> */}
              <Text style={styles.lsname}>
                Part 1 - Photographs
            </Text>
              <Text style={styles.lsname}> {this.getPercent(items.part1)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.lesson}
              onPress={this.test2.bind(this)}>
              {/* <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                source={require('../image/num2.png')} /> */}
              <Text style={styles.lsname}>
                Part 2 - Question and Response
            </Text>
              <Text style={styles.lsname}> {this.getPercent(items.part2)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.lesson}
              onPress={this.test3.bind(this)}>
              {/* <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                source={require('../image/num3.png')} /> */}
              <Text style={styles.lsname}>
                Part 3 - Short Conversations
            </Text>
              <Text style={styles.lsname}> {this.getPercent(items.part3)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.lesson}
              onPress={this.test4.bind(this)}>
              {/* <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                source={require('../image/num4.png')} /> */}
              <Text style={styles.lsname}>
                Part 4 - Short Talks
            </Text>
              <Text style={styles.lsname}> {this.getPercent(items.part4)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.lesson}
              onPress={this.test5.bind(this)}>
              {/* <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                source={require('../image/num5.png')} /> */}
              <Text style={styles.lsname}>
                Part 5 - Incomplete Sentences
            </Text>
              <Text style={styles.lsname}> {this.getPercent(items.part5)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.lesson}
              onPress={this.test6.bind(this)}>
              {/* <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                source={require('../image/num6.png')} /> */}
              <Text style={styles.lsname}>
                Part 6 - Text Completetion
            </Text>
              <Text style={styles.lsname}> {this.getPercent(items.part6)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.lesson}
              onPress={this.test7.bind(this)}>
              {/* <Image style={{ width: 25, height: 25, marginLeft: 10, tintColor: '#ff0000' }}
                source={require('../image/num7.png')} /> */}
              <Text style={styles.lsname}>
                Part 7 - Reading Comprehension
            </Text>
              <Text style={styles.lsname}> {this.getPercent(items.part7)}</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 25,
    height: 25,
  },
  lesson: {
    justifyContent: 'space-between',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    backgroundColor: 'white'
  },
  pic: {
    margin: 10,
    height: 50,
    width: 70,
  },
  lsname: {
    color: '#119f81',
    fontSize: 15,
    padding: 17
  },
  note: {
    color: '#119f81',
    fontSize: 17,
  }
});
