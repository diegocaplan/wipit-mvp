import { BellIcon } from "@chakra-ui/icons";
import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, Badge } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import socket from "../Chat/socket";

export const NotificationIcon = () => {
    const [oldNotifications, setOldNotifications] = useState([]);
    const [newNotifications, setNewNotifications] = useState([]);
    const [isOpen, setIsOpen] = React.useState(false);

    const open = () => setIsOpen(!isOpen)
    const close = () => {
        setIsOpen(false);
        socket.emit("markAsSeen", user.userName)
        setOldNotifications([...newNotifications, ...oldNotifications]);
        setNewNotifications([]);
    }
    const user = useSelector(state => state.registerReducer.user)

    useEffect(() => {
        if (user.userName) {
            socket.on("getAllNotifications", (allNotifications) => {
                setOldNotifications(allNotifications.filter(n => n.seen === true));
                setNewNotifications(allNotifications.filter(n => n.seen === false));
            });
            socket.emit("joinNotificationsRoom", user.userName)
        };
    }, [user])

    useEffect(() => {
        socket.on("notification", (newNotification) => {
            setNewNotifications([...newNotifications, newNotification]);
        })
        return () => {
            socket.off();
        };
    }, [newNotifications])

    function renderNotification(n) {
        switch (n.type) {
            case "archived":
                return (
                    <Text borderRadius="5px" p="10px" bgColor="#ffe8d6" key={`${n.taskId}-archived`} m="10px"><u><Link to={`/user/${n.creatorUserName}`} >{n.creatorName}</Link></u> ha archivado la tarea: "{n.taskTitle}".</Text>
                )            
            case "finished":
                return (
                    <Text borderRadius="5px" p="10px" key={`${n.taskId}-finished`} bg="#d7f9f1" m="10px"><u><Link to={`/user/${n.creatorUserName}`} >{n.creatorName}</Link></u> finalizó la tarea: "{n.taskTitle}", recuerda dejar tu feedback!</Text>
                )
            case "activated":
                return (
                    <Text borderRadius="5px" p="10px" bgColor="#dfe7fd" key={`${n.taskId}-activated`} m="10px"><u><Link to={`/user/${n.creatorUserName}`} >{n.creatorName}</Link></u> se sumó a tu tarea: "{n.taskTitle}", búscalo en tareas en progreso.</Text>
                )
            case "newmessage":
                return ( 
               <Text borderRadius="5px" p="10px" bgColor="#f5f5d9" key={`${n.taskId}-newmessage`}  m="10px"><u><Link to={`/user/${n.creatorUserName}`} >{n.creatorName}</Link></u> te habló en el chat de la tarea: "{n.taskTitle}".</Text> 
                )
            default:
                return <></>;
        }
    }

    function handleNotificationClick() { open(); };

    let displayedNotifications = newNotifications.length ? newNotifications : oldNotifications;

    return (
        <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={close}
            overflow="scroll"
        >
            <PopoverTrigger>
                <Button variant="unstyled" onClick={handleNotificationClick}
                    _focus={{
                        boxShadow: "none",
                    }}>
                    <BellIcon w={5} h={5} /> {newNotifications.length ? <Badge variant="solid" size="md" bg="tomato">{newNotifications.length}</Badge> : <></>}
                </Button>
            </PopoverTrigger>
            <PopoverContent color="black">
                <PopoverArrow />
                <PopoverCloseButton />
                {newNotifications.length ? (<PopoverHeader>Nuevas notificaciones:</PopoverHeader>) : (<PopoverHeader>Todavía no hay nada nuevo</PopoverHeader>)}
                <PopoverBody>
                    {displayedNotifications.map(n => (renderNotification(n)))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
