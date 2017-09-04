import React, { Component } from 'react'
import {AsyncStorage} from 'react-native'
import { Text, Header, View, Content, Form, Left, Title, Body, Item, Icon, Input, Label, Button } from 'native-base';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
export default class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            disease: '',
            doctorName: '',
            date: ''
        };
    }
    Info() {
        info = {
            name: this.state.name,
            disease: this.state.disease,
            doctorName: this.state.doctorName,
            date: this.state.date
        }
        AsyncStorage.setItem('allPatients',JSON.stringify(info));
        this.props.patientInfo(info)
        Actions.all_patient()
        console.log(info, "add patient")
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Icon style={{color:'white'}} name="arrow-back" iconColor="white" onPress={() => Actions.all_patient()} />
                    </Left>
                    <Body>
                        <Title>
                            Patient Tracker
                        </Title>
                    </Body>

                </Header>
                <Form>
                    <Item floatingLabel>
                        <Label>Patient Name</Label>
                        {/* <Text>
                        <Icon style={{color:"rgb(36,81,181)"}} name="ios-people" />                        
                        </Text> */}
                        
                        <Input onChangeText={(name) => this.setState({ name })} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Disease</Label>
                        <Input onChangeText={(disease) => this.setState({ disease })} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Dr.Name</Label>
                        <Input onChangeText={(doctorName) => this.setState({ doctorName })} />
                    </Item>
                    <DatePicker onDateChange={(date) => { this.setState({ date: date }) }}
                        cancelBtnText="Cancel"
                        format="YYYY-MM-DD"
                        minDate="2017-08-29"
                    />
                    <Button onPress={this.Info.bind(this)} primary block>
                        <Icon name="ios-people" />

                        <Text>Add Patient</Text>
                    </Button>
                </Form>
            </View>

        )
    }



}
