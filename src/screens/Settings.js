
import {View, StyleSheet, Platform, Switch, ToastAndroid} from 'react-native';
import React, { Component, useState } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator,
  Item,
  View,
} from "native-base";
import {CancelAllNotification} from "../components/PushController"
import {initializeReminders} from "../utils"

import {PINCode, hasSetPinCode, removePinCode} from "../components/PinCode/index";
import { Overlay } from "react-native-elements";

//const Item = Picker.Item;
import {lightStyle, darkStyle} from "./Style"
import { ToggleTheme, isDarkTheme as dt } from "./Theme";

/* TO BE ADDED: a mapDispatchToProps and mapStateToProps to save settings to store */
function Toggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}
/* Presentational component for managing redirection to setting changes */
class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      isDarkTheme: dt,
      reminder: false,
      stage: 'main',  // main, setpin, editUser
      currency: "$",
      pinOverlayIsOn: false
    };
    this.onHandleSetPin = this.onHandleSetPin.bind(this)
    this.renderSetPin = this.renderSetPin.bind(this)
  }
  
  /* toggle dark mode option switch */
  toggleMode(){
    this.setState({
      darkMode: !this.state.darkMode
    })
  }

  /* toggle reminder option switch */
  toggleReminder(){
    this.setState({
      reminder: !this.state.reminder
    })
  }

  /* managing input state for currency */
  onCurrencyChoose(value){
    this.setState({
      currency: value,
    })
  }

  cancelNotification(){
    console.log("Removing notifications")
    CancelAllNotification()
    ToastAndroid.show(
      "All notifications removed",
      ToastAndroid.SHORT
    )
    initializeReminders()
  }

  onHandleSetPin = () => {
    this.setState({pinOverlayIsOn: true})
  }
  renderSetPin = () => {
    let ans = false;
    hasSetPinCode().then(
      res => {
        ans = res
      }
    )
    return(
      <View>
        {!ans &&
          <PINCode 
          status = {"enter"} 
          onSuccess = {() =>
          {
            removePinCode();
            this.setState({pinOverlayIsOn:false})
            ToastAndroid.show(
              "PIN remove successfully",
              ToastAndroid.LONG
            )
          }}
          onFailure = {() =>
          {
            this.setState({pinOverlayIsOn:false})
            ToastAndroid.show(
              "PIN remove unsuccessfully",
              ToastAndroid.LONG
            )
          }}
          />
        }
        { ans &&
          <PINCode 
          status = {"choose"} 
          onSuccess = {() =>
          {
            this.setState({pinOverlayIsOn:false})
            ToastAndroid.show(
              "PIN set successfully",
              ToastAndroid.LONG
            )
          }}
          />
        }
      </View>
    ) 
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left style = {{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style = {{flex: 1}}>
            <Title style = {styles.headerText}>Settings</Title>
          </Body>
          <Right style = {{flex: 1}}>
            <Button 
              transparent 
              onPress={() => this.props.navigation.goBack()}>
              <Icon name = "arrow-back" />
            </Button>
          </Right>
        </Header>

        <Content>
        {this.state.pinOverlayIsOn && this.renderSetPin()}

          <Separator bordered noTopBorder style = {styles.separator} />

          <ListItem style = {styles.row} icon >
            <Left>
              <Button style={{ backgroundColor: "purple" }}>
                <Icon active name="moon" />
              </Button>
            </Left>
            <Body>
              <Text>Dark Mode</Text>
            </Body>
            <Right>
              <Switch 
                value={this.state.darkMode} 
                trackColor="#50B948" 
                onValueChange = {this.toggleMode.bind(this)}
              /> 
            </Right>
          </ListItem>

          <ListItem style = {styles.row} icon>
            <Left>
              <Button style={{ backgroundColor: "orange" }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Daily reminder notification</Text>
            </Body>
            <Right>
              <Radio
                selected = {this.state.reminder}
                onPress = {this.toggleReminder.bind(this)}
              />
            </Right>
          </ListItem>
          
          <ListItem style = {styles.row} icon last>
            <Left>
              <Button style={{ backgroundColor: "#4CDA64" }}>
                <Icon name="arrow-dropdown" />
              </Button>
            </Left>
            <Body>
              <Text>Currency</Text>
            </Body>
            <Right>
              <Picker
                note
                mode="dropdown"
                style={{ width: 100 }}
                selectedValue={this.state.currency}
                onValueChange={this.onCurrencyChoose.bind(this)}
              >
                <Item label="$" value="$" />
                <Item label="VND" value="VND" />
              </Picker>
            </Right>
          </ListItem>


          <Separator bordered style = {styles.separator}/>


          <ListItem style = {styles.row} icon >
            <Left>
              <Button 
              style={{ backgroundColor: "#FD3C2D" }}
              >
                <Icon active name="lock" />
              </Button>
            </Left>
            <Body>
              <Text>Set PIN code</Text>
            </Body>
            <Right>
              <Switch 
                value={this.state.darkMode} 
                trackColor="#50B948" 
                onValueChange = { () =>
                  {
                    this.setState({stage: 'pin'})
                    this.onHandleSetPin()
                  }
                }
              /> 
            </Right>
          </ListItem>
          <ListItem style = {styles.row} icon onPress = {() => this.setState({stage: 'editUser'})}>
            <Left>
              <Button style={{ backgroundColor: "blue" }}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text>Edit personal data</Text>
            </Body>
          </ListItem>

          <ListItem style = {styles.row} icon >
            <Left>
              <Button style={{ backgroundColor: "brown" }} onPress = {() => CancelAllNotification()}>
                <Icon active name="notifications-off" />
              </Button>
            </Left>
            <Body>
              <Text>Remove all notifications</Text>
            </Body>
          </ListItem>
          
          <Text>Dark Mode</Text>
          <ToggleTheme />

          <Separator bordered style = {styles.separator}/>
          
        </Content>
      </Container>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  separator: {
    //backgroundColor: '#FFF',
  },
 
  row: {
  
  },
});

export default SettingsScreen;


