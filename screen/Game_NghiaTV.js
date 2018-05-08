import React, { Component } from 'react';

import{
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,
  AsyncStorage,
  TouchableOpacity,ListView,Image,TextInput
} from 'react-native';
import {firebaseApp} from '../Config.js';
import Swiper from 'react-native-swiper';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import Sound from 'react-native-sound';

export default class Game_NghiaTiengViet extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:`${ navigation.state.params.name}`,
    headerTintColor:'#119f81',
  });
  constructor(props){
  super(props);
  this.itemRef=firebaseApp.database();
  this.listenForItems = this.listenForItems.bind(this);
  //this.getPic = this.getPic.bind(this);
  this.items = [];
  this.state={
      items: [],
      da1Dung:false,
      da2Dung:false,
      da3Dung:false,
      da4Dung:false,
      
      da1:false,
      da2: false,
      da3:false,
      da4:false, 
    }
  }
  check1(text1,text2){
      return this.setState({
        da1Dung:false,
        da1:true,
        da2:false,
        da3:false,
        da4:false,
      })
  }
  check2(text1,text2){
      return this.setState({
        da2Dung:false,
        da2:true,
        da1:false,
        da3:false,
        da4:false,
      })
  }
  check3(text1,text2){
      return this.setState({
        da3Dung:false,
        da3:true,
        da2:false,
        da1:false,
        da4:false,
      })
  }
  check4(text1,text2){
      return this.setState({
        da4Dung:false,
        da4:true,
        da2:false,
        da3:false,
        da1:false,
      })
  }
  check(da,text1,text2,text3,text4){
    if(da===text1){
      return this.setState({
        da1Dung:true,
      })
    }
      if(da===text2)
      return this.setState({
        da2Dung:true,
      })
      if(da===text3)
      return this.setState({
        da3Dung:true,
      })
      if(da===text4)
      return this.setState({
        da4Dung:true,
      })
  }
  onPageScroll(){
    return this.setState({
      da1Dung:false,
      da2Dung:false,
      da3Dung:false,
      da4Dung:false,
      da1:false,
      da2: false,
      da3:false,
      da4:false, 
    })
  }
  listenForItems() {
    console.log('run')
    const { params } = this.props.navigation.state;
    console.log('id la: '+params.id)
    firebaseApp.database().ref('/NghiaTiengViet').orderByChild('chude').equalTo(params.id).on('child_added',(dataSnapshot)=>{
          let item = {
            tu:dataSnapshot.val().tu,
            kq:dataSnapshot.val().kq,
            da1:dataSnapshot.val().da1,
            da2:dataSnapshot.val().da2,
            da3:dataSnapshot.val().da3,
            da4:dataSnapshot.val().da4,
           
          };
          this.setState({
            items: [...this.state.items, item],
          });
        });  
       // console.log('items:'+ this.state.items)
    }
  renderBaiHoc(data) {
        console.log('data',data);
        let views = data
        let inputRow = []
        for ( let r = 0; r < views.length; r ++) {
                inputRow.push(
                  <View style={styles.container} >           
                     <Text style={styles.tu}> { views[r].tu} </Text>
                     <TouchableOpacity 
                     style={[styles.viewLs , this.state.da1 && styles.viewLs2,this.state.da1Dung && styles.viewdung]} 
                     onPress={ ()=>this.check1(views[r].da1,views[r].kq)}>
                      <Text style={styles.tu2} > { views[r].da1} </Text> 
                     </TouchableOpacity>

                     <TouchableOpacity  
                     style={[styles.viewLs , this.state.da2 && styles.viewLs2,this.state.da2Dung && styles.viewdung]} 
                     onPress={ ()=>this.check2(views[r].da2,views[r].kq)}>
                      <Text style={styles.tu2}> { views[r].da2} </Text> 
                     </TouchableOpacity>

                     <TouchableOpacity style={[styles.viewLs , this.state.da3 && styles.viewLs2,this.state.da3Dung && styles.viewdung]}
                       onPress={ ()=>this.check3(views[r].da3,views[r].kq)}>
                      <Text style={styles.tu2}> { views[r].da3} </Text> 
                     </TouchableOpacity>

                     <TouchableOpacity 
                      style={[styles.viewLs , this.state.da4 && styles.viewLs2,this.state.da4Dung && styles.viewdung]}
                      onPress={ ()=>this.check4(views[r].da4,views[r].kq)}>
                      <Text style={styles.tu2}> { views[r].da4} </Text> 
                     </TouchableOpacity>

                     <View style={{alignItems: 'center',marginTop: 10,flexDirection: 'row' }}>
                      <Text  style={{flex:3,textAlign:'right' }}></Text>
                      <TouchableOpacity onPress={ ()=>this.check(views[r].kq,views[r].da1,views[r].da2,views[r].da3,views[r].da4)}>
                      <Image
                        style={styles.reload}
                        source={require('../image/icon_submit.png')}/>
                        </TouchableOpacity>
                         <Text style={{flex:3,textAlign:'left'}}></Text>
                    </View>
                    </View>
                );
            }

           return inputRow;
        }
  render(){
    const { params } = this.props.navigation.state;
    const {goBack}=this.props.navigation;
    
    return (
      
      <View style={{flex: 1,
      justifyContent:'center',padding:20,backgroundColor: '#119f81',elevation: 2}}> 
          <IndicatorViewPager  style={{flex:1}} onPageScroll={this.onPageScroll.bind(this) } >
          { this.renderBaiHoc(this.state.items)}
          </IndicatorViewPager>
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
    flexDirection:'column',
    justifyContent:'center',
  },
  tu2:{
    padding:5,
    fontSize:17
  },
  reload:{
    width: 200,
    height: 50,
  },
  tu:{
    textAlign:'center',
    fontSize:20,
    color:'white'
  },
  viewdung:{
    backgroundColor:'#0099ff',
    elevation: 5,
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0ff',
    margin: 5,
  },
  viewLs:{
    backgroundColor:'white',
    justifyContent:'center',
    elevation: 5,
    flexDirection:'column',
    alignItems:'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0ff',
    margin: 5,
    //backgroundColor: '#f0f0ff',
  },
  viewLs2:{
    backgroundColor:'#fb5644',
    elevation: 5,
    flexDirection:'column',
    alignItems:'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0ff',
    margin: 5,
    //backgroundColor: '#f0f0ff',
  },
});
