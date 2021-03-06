import React, { useState, useEffect } from "react";
// 1. import `NativeBaseProvider` component
import {
    Box,
    Heading,
    VStack,
    Button,
    Center,
    Image,
    Input,
    Icon,
    Link,
    Text,
    HStack,
    ScrollView,
    CheckIcon,
    Select,
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import Axios from "axios"
import { TouchableOpacity } from "react-native";

export default function AddVentor(props) {
    const navigation = useNavigation()
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [pincode, setPincode] = useState("");
    const [conformPincode, setConformPincode] = useState("");
    let [service, setService] = React.useState("")
    const [show, setShow] = React.useState(false)
    const [show1, setShow1] = React.useState(false)

    const [udata, setUdata] = useState([])
    useEffect(() => {
        Axios.get("https://smartfarm012.herokuapp.com/getUser").then(
            (reponse) => {
                const newdata = reponse.data
                setUdata(newdata)
            })
    }, [])

    const email1 = udata.filter(x => x.email == email).map((data) => data.email)

    console.log(email1)
    // const userEmail = udata.filter(x => x.email == userName)
    const login = async () => {
        if (email1[0] === email) {
            alert('user already avaible')
        } else if (email1[0] !== email) {
            if (email !== '' && pincode === conformPincode && userName !== '' && service !== '') {
                try {
                    auth()
                        .createUserWithEmailAndPassword(email, pincode)
                        .then(
                            await Axios.post('https://smartfarm012.herokuapp.com/createUser', {
                                username: userName,
                                email: email,
                                phoneNo: phoneNo,
                                password: pincode,
                                userType: service
                            }).then((res) => {
                                console.log(res)
                            }).then(alert('user add')).then({
                                setUserName: setUserName(''),
                                setEmail: setEmail(''),
                                setPhoneNo: setPhoneNo(''),
                                setPincode: setPincode(''),
                                setService: setService(''),
                                setConformPincode: setConformPincode(''),
                            })
                        )
                } catch (error) {
                    alert(error)
                }
            } else {

                alert('Password Not Match or some field is empty ')
            }

        }
    }

    return (
        <ScrollView>
            <Center flex={1} px="3">
                <Box w="100%" p="10px">
                    <Box mt="1/3" height="100%">
                        <Center>
                            {/* <Image source={QuenoTextIcon} alt="Alternate Text" /> */}
                            <Heading mt="30px">Welcome to Smart Farm's Loop!</Heading>
                            <Heading mt="30px" mb="20px" size="sm">
                                Sign up
                            </Heading>

                            <Input
                                onChangeText={(val) => setUserName(val)}
                                borderRadius='30'
                                value={userName}
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Username" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setEmail(val)}
                                borderRadius='30'
                                mt="16px"
                                value={email}
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Email" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setPhoneNo(val)}
                                borderRadius='30'
                                mt="16px"
                                keyboardType="numeric"
                                value={phoneNo}
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Phone No" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />

                            <Input
                                value={pincode}
                                onChangeText={(val) => setPincode(val)}
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="lock" outli={false} outline />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                InputRightElement={
                                    <TouchableOpacity onPress={() => setShow(!show)}>
                                        <Icon
                                            as={<FontAwesome5 name={show ? "eye-slash" : 'eye'} />}
                                            size="4"
                                            m={4}
                                            mr="5"

                                            _light={{
                                                color: "black",
                                            }}
                                            _dark={{
                                                color: "gray.300",
                                            }}
                                        />
                                    </TouchableOpacity>
                                }
                                type={show ? "text" : "password"}
                                placeholder="Password" // mx={4}
                                mt="16px"
                                borderRadius='30'
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setConformPincode(val)}
                                value={conformPincode}
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="lock" outli={false} outline />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                InputRightElement={
                                    <TouchableOpacity onPress={() => setShow1(!show1)}>
                                        <Icon
                                            as={<FontAwesome5 name={show1 ? "eye-slash" : 'eye'} />}
                                            size="4"
                                            m={4}
                                            mr="5"

                                            _light={{
                                                color: "black",
                                            }}
                                            _dark={{
                                                color: "gray.300",
                                            }}
                                        />
                                    </TouchableOpacity>
                                }
                                type={show1 ? "text" : "password"}
                                placeholder="Conform Password" // mx={4}
                                mt="16px"
                                borderRadius='30'
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />

                            <VStack mt="16px" alignItems="center" space={4}>
                                <Select
                                    borderRadius='30'

                                    selectedValue={service}
                                    minWidth="360"
                                    accessibilityLabel="Choose Type"
                                    placeholder="Choose Type"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />,
                                    }}
                                    mt={1}
                                    onValueChange={(itemValue) => setService(itemValue)}
                                >
                                    <Select.Item label="Catering" value="catering" />
                                    <Select.Item label="Transport" value="Transport" />
                                    <Select.Item label="Farmhouse" value="Farmhouse" />
                                </Select>
                            </VStack>
                            <Box width="100%" mt="10">
                                <VStack space={3}>
                                    <Button
                                        borderRadius='30'
                                        h="48px"
                                        onPress={() => login()
                                            // authOperations.login(data, dispatch).then((res) => {
                                            //   if(res.role == 'student'){
                                            //   }
                                            // }
                                            // )
                                        }
                                    >
                                        Add Ventor!
                                    </Button>
                                </VStack>
                            </Box>
                        </Center>
                    </Box>
                </Box>
            </Center>
        </ScrollView>
    );
}