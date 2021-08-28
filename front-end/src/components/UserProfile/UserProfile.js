import React, { useEffect, useState } from "react";
import { Flex, Text, Box, Img } from "@chakra-ui/react";
import { ModifyProfile } from "../ModifyProfile/ModifyProfile.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export const UserProfile = ({ userNameUrl }) => {
  const [userInfo, setUserInfo] = useState({
    email: null,
    username: null,
    name: null,
    lastName: null,
    description: null,
    linkedin: null,
    webPage: null,
    cv: null,
    behance: null,
    image: null,
  });
  const user = useSelector((state) => state.registerReducer.user);
  const { push } = useHistory();
  useEffect(() => {
    axios.get(`http://localhost:3001/user/getUsers?userName=${userNameUrl}`)
      .then((response) => {
        if (response.data !== null) {
          setUserInfo({
            ...userInfo,
            email: response.data.email,
            username: response.data.userName,
            name: response.data.name,
            lastName: response.data.lastName,
            description: response.data.description,
            linkedin: response.data.linkedin,
            webPage: response.data.webPage,
            cv: response.data.cv,
            behance: response.data.behance,
            image: response.data.image,
          });
        } else {
          push("/404");
        }
      });
  }, [userNameUrl]);

  return (
    <Flex justify="center" h="50em" alignItems="center">
      {userNameUrl === user.userName ? (
        <Flex
          flexDir="column"
          bg="blueRadialGradient"
          align="center"

          w="50%"
          h="90%"
          borderRadius="0.3rem"
        >
          <Box h="5%" w="100%" />

          <Img
            src={
              (userNameUrl === user.userName ? user.image : userInfo.image) ||
              "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
            }
            alt="profile img"
            borderRadius="100%"
            bg="white"
            h="20vh"
            w="20vh"
            border="5px solid white"
            transform="translateY(35%)"
            shadow="lg"
          />
          <Flex
            flexDir="column"
            align="center"
            pt="15%"
            bg="white"
            h="180%"
            w="100%"
            borderBottomRadius="0.3rem"
          >
            {userNameUrl === user.userName ? (
              <Flex position="relative" bottom="1em">
                <Text fontSize="xl" fontWeight="bold" paddingRight="0.5em">
                  Edit Profile
                </Text>
                <ModifyProfile
                  infoName="profile"
                  userEmail={userInfo.email}
                  userNameUrl={user.userName}
                />
              </Flex>
            ) : (
              ""
            )}
            <Text paddingBottom="0.5em" fontSize="xl" fontWeight="bold">
              Nombre y Apellido
            </Text>
            <Flex
              border="1px solid #369"
              borderRadius="0.5em"
              w="15em"
              flexDir="row"
              justify="space-evenly"
            >
              <Flex >
                <Text color="blackAlpha.600">{user.name}</Text>
              </Flex>
              <Flex>
                <Text color="blackAlpha.600">{user.lastName}</Text>
              </Flex>
            </Flex>
            {/* Experiencia */}
            <Flex paddingTop="1em" paddingBottom="0.5em">
              <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                Experiencia
              </Text>
              {userNameUrl === user.userName ? (
                <ModifyProfile
                  infoName="description"
                  userEmail={userInfo.email}
                  userNameUrl={user.userName}
                />
              ) : (
                ""
              )}
            </Flex>
            <Flex border="1px solid #369" borderRadius="0.5em" w="36em" h="5.5em" justify="center">
              <Text
                fontSize="sm"
                w="20vw"
                textAlign="center"
                color="blackAlpha.600"
                margin="1em"
              >
                {user.description ||
                  "Aún no has agregado información a tu perfil."}
              </Text>
            </Flex>
            {/* CV */}
            <Flex flexDir="row">
              <Flex flexDir="column">
                <Flex paddingTop="1em" paddingBottom="0.5em" justify="center">
                  <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                    Curriculum (cv)
                  </Text>
                  {userNameUrl === user.userName ? (
                    <ModifyProfile
                      infoName="cv"
                      userEmail={userInfo.email}
                      userNameUrl={user.userName}
                    />
                  ) : (
                    ""
                  )}
                </Flex>
                <Flex border="1px solid #369" borderRadius="0.5em" h="3em">
                  <Text
                    fontSize="sm"
                    w="20vw"
                    textAlign="center"
                    color="blackAlpha.600"
                    margin="1em"
                  >
                    {user.cv || "Aún no has agregado tu Curriculum."}
                  </Text>
                </Flex>
              </Flex>
              {/* Linkedin */}
              <Flex flexDir="column" paddingLeft="0.5em">
                <Flex paddingTop="1em" paddingBottom="0.5em" justify="center">
                  <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                    LinkedIn
                  </Text>
                  {userNameUrl === user.userName ? (
                    <ModifyProfile
                      infoName="linkedin"
                      userEmail={userInfo.email}
                      userNameUrl={user.userName}
                    />
                  ) : (
                    ""
                  )}
                </Flex>
                <Flex border="1px solid #369" borderRadius="0.5em" h="3em">
                  <Text
                    fontSize="sm"
                    w="20vw"
                    textAlign="center"
                    color="blackAlpha.600"
                    margin="1em"
                  >
                    {user.linkedin || "Aún no has agregado tu LinkedIn url."}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDir="row">
              <Flex flexDir="column">
                <Flex paddingTop="1em" paddingBottom="0.5em" justify="center">
                  <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                    Pagina Web
                  </Text>
                  {userNameUrl === user.userName ? (
                    <ModifyProfile
                      infoName="webPage"
                      userEmail={userInfo.email}
                      userNameUrl={user.userName}
                    />
                  ) : (
                    ""
                  )}
                </Flex>
                <Flex border="1px solid #369" borderRadius="0.5em" h="3em">
                  <Text
                    fontSize="sm"
                    w="20vw"
                    textAlign="center"
                    color="blackAlpha.600"
                    margin="1em"
                  >
                    {user.webPage || "Aún no has agregado tu Pagina Web."}
                  </Text>
                </Flex>
              </Flex>
              {/* Behance */}
              <Flex flexDir="column" paddingLeft="0.5em">
                <Flex paddingTop="1em" paddingBottom="0.5em" justify="center">
                  <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                    Behance
                  </Text>
                  {userNameUrl === user.userName ? (
                    <ModifyProfile
                      infoName="behance"
                      userEmail={userInfo.email}
                      userNameUrl={user.userName}
                    />
                  ) : (
                    ""
                  )}
                </Flex>
                <Flex border="1px solid #369" borderRadius="0.5em" h="3em">
                  <Text
                    fontSize="sm"
                    w="20vw"
                    textAlign="center"
                    color="blackAlpha.600"
                    margin="1em"
                  >
                    {user.behance || "Aún no has agregado info."}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : ( /* ************************************************************************************* */
        <Flex
          flexDir="column"
          bg="blueRadialGradient"
          align="center"
          w="50%"
          h="90%"
          borderRadius="0.3rem"
        >
          <Box h="5%" w="100%" />

          <Img
            src={
              (userNameUrl === user.userName ? user.image : userInfo.image) ||
              "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
            }
            alt="profile img"
            borderRadius="100%"
            bg="white"
            h="20vh"
            w="20vh"
            border="5px solid white"
            transform="translateY(35%)"
            shadow="lg"
          />
          <Flex
            flexDir="column"
            align="center"
            pt="15%"
            bg="white"
            h="180%"
            w="100%"
            borderBottomRadius="0.5rem"
          >
            <Flex
              w="15em"
              flexDir="row"
              justify="center"
            >
              <Flex paddingRight="0.5em">
                <Text color="black" fontSize="xl" fontWeight="bold">{userInfo.name}</Text>
              </Flex>
              <Flex>
                <Text color="black" fontSize="xl" fontWeight="bold">{userInfo.lastName}</Text>
              </Flex>
            </Flex>
            {/* Experiencia */}
            <Flex paddingTop="1em" paddingBottom="0.5em">
              <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                Experiencia
              </Text>
            </Flex>
            <Flex borderTop="1px solid #369" borderColor="red.500" w="36em" h="5.5em" justify="center">
              <Text
                fontSize="sm"
                w="20vw"
                textAlign="center"
                color="black"
                margin="1em"
              >
                {userInfo.description ||
                  "Aún no hay información."}
              </Text>
            </Flex>
            {/* CV */}
            <Flex flexDir="row">
              <Flex flexDir="column">
                <Flex paddingTop="1em" paddingBottom="0.5em" justify="center">
                  <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                    Curriculum (cv)
                  </Text>
                </Flex>
                <Flex borderTop="1px solid #369" borderColor="red.500" h="3em">
                  <Text
                    fontSize="sm"
                    w="20vw"
                    textAlign="center"
                    color="black"
                    margin="1em"
                  >
                    {userInfo.cv || "Aún no hay informacion."}
                  </Text>
                </Flex>
              </Flex>
              {/* Linkedin */}
              <Flex flexDir="column" paddingLeft="0.5em">
                <Flex paddingTop="1em" paddingBottom="0.5em" justify="center">
                  <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                    LinkedIn
                  </Text>
                </Flex>
                <Flex borderTop="1px solid #369" borderColor="red.500" h="3em">
                  <Text
                    fontSize="sm"
                    w="20vw"
                    textAlign="center"
                    color="black"
                    margin="1em"
                  >
                    {userInfo.linkedin || "Aún no hay informacion."}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDir="row">
              <Flex flexDir="column">
                <Flex paddingTop="1em" paddingBottom="0.5em" justify="center">
                  <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                    Pagina Web
                  </Text>
                </Flex>
                <Flex borderTop="1px solid #369" borderColor="red.500" h="3em">
                  <Text
                    fontSize="sm"
                    w="20vw"
                    textAlign="center"
                    color="black"
                    margin="1em"
                  >
                    {userInfo.webPage || "Aún no hay informacion."}
                  </Text>
                </Flex>
              </Flex>
              {/* Behance */}
              <Flex flexDir="column" paddingLeft="0.5em">
                <Flex paddingTop="1em" paddingBottom="0.5em" justify="center">
                  <Text paddingRight="0.5em" fontSize="xl" fontWeight="bold">
                    Behance
                  </Text>
                </Flex>
                <Flex borderTop="1px solid #369" borderColor="red.500" h="3em">
                  <Text
                    fontSize="sm"
                    w="20vw"
                    textAlign="center"
                    color="black"
                    margin="1em"
                  >
                    {userInfo.behance || "Aún no hay informacion."}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
