import React, { useState } from 'react'
import AdminTasks from './AdminTasks';
import AdminUsers from './AdminUsers';
import General from './General';
import { Flex, Button } from "@chakra-ui/react";


function AdminPage() {
  const [selected, setSelected] = useState("users")

  return (
    <>
      <Flex h="20vh" justifyContent="space-around">
        <Button onClick={() => setSelected('tasks')} w="30%" h="30%" variant="primary"> Administrar Tareas</Button>
        <Button onClick={() => setSelected('users')} w="30%" h="30%" variant="primary"> Administrar usuarios</Button>
        <Button onClick={() => setSelected('general')} w="30%" h="30%" variant="primary"> Estadísticas Generales</Button>
      </Flex>

      {selected === 'users' ? <AdminUsers></AdminUsers> : null}
      {selected === 'tasks' ? <AdminTasks></AdminTasks> : null}
      {selected === 'general' ? <General></General> : null}

    </>
  )
}

export default AdminPage;