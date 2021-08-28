import { Box, Flex, Button, Text, Center } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBacklogTasks } from "../../redux/reducers/backlogReducer/backlogAction";
import { LanguageFilter } from "../LanguageFilter/LanguageFilter";
import Tasks from "../Tasks/Tasks";
import { ProfileOverview } from "../ProfileOverview/ProfileOverview";
import SearchBar from "../SearchBar/SearchBar";
import { SimpleFilter } from "../SimpleFilter/SimpleFilter";
import ClearFilters from "../ClearFilters/ClearFilters";
import TasksOrder from "../TasksOrder/TasksOrder";
import { TasksSkeletons } from "./TasksSkeletons";
import { useLocation } from "react-router-dom";
import {
  addLanguageFilter,
  clearLanguageFilter,
} from "../../redux/reducers/languageFilterReducer/languageFilterAction";
import AccordionPostTask from "../postNewTask/AccordionPostTask";
import { ScrollUp } from "./ScrollUp";

export default function Backlog() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const backlogtasks = useSelector(
    (state) => state.backlogReducer.backlogtasks
  );
  const languageFilter = useSelector(
    (state) => state.languageFilterReducer.languageFilter
  );
  const areaFilter = useSelector(
    (state) => state.simpleFilterReducer.areaFilter
  );
  const purposeFilter = useSelector(
    (state) => state.simpleFilterReducer.purposeFilter
  );
  const difficultyFilter = useSelector(
    (state) => state.simpleFilterReducer.difficultyFilter
  );
  const howlongFilter = useSelector(
    (state) => state.simpleFilterReducer.howlongFilter
  );
  const searchFilter = useSelector((state) => state.searchReducer.searchFilter);
  const dateOrder = useSelector((state) => state.orderReducer.dateOrder);
  const filters = {
    area: areaFilter,
    purpose: purposeFilter,
    difficulty: difficultyFilter,
    howlong: howlongFilter,
  };

  let hasMoreItems = true;
  const location = useLocation();
  var lang = "";
  if (location && location.state) lang = location.state.languageFilters;

  useEffect(() => {
    dispatch(getBacklogTasks());
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [
    languageFilter,
    areaFilter,
    purposeFilter,
    difficultyFilter,
    howlongFilter,
    searchFilter,
    dateOrder,
  ]);

  useEffect(() => {
    if (location && location.state) {
      dispatch(clearLanguageFilter());
      dispatch(addLanguageFilter(lang));
    }
  }, [lang]);

  var backlogtasksFormated = backlogtasks.filter(
    (task) => !task.deleted && task.status === "sprint"
  );
  //reformateando el objeto
  backlogtasksFormated = backlogtasksFormated.map((task) => {
    return {
      ...task,
      languages: task.languages.map((language) => language.name),
      assigned: task.assigned.map((user) => user.userName),
    };
  });
  //filtra nombre/descripción
  backlogtasksFormated = backlogtasksFormated.filter((task) => {
    var queda = true;
    searchFilter.split(" ").forEach((filter) => {
      if (
        task.title.toLowerCase().search(filter.toLowerCase()) < 0 &&
        task.description.toLowerCase().search(filter.toLowerCase()) < 0
      ) {
        queda = false;
      }
    });
    return queda;
  });

  Object.keys(filters).map((filter) => {
    if (filters[filter]) {
      backlogtasksFormated = backlogtasksFormated.filter((t) => {
        return filters[filter].length
          ? filters[filter].includes(t[filter])
          : true;
      });
    }
  });

  //Filtrado lenguajes
  if (languageFilter.length) {
    let len = languageFilter.length
    let queda
    backlogtasksFormated = backlogtasksFormated.filter(r => {
      queda = false
      let i = 0
      while (i < len && queda === false) {
        queda = r.languages.includes(languageFilter[i])
        i++
      }
      return queda;
    });
  }

  if (dateOrder.length) {
    if (dateOrder === "Mas reciente") {
      backlogtasksFormated.sort(function (a, b) {
        return a.id - b.id;
      });
    } else if (dateOrder === "Mas antiguo") {
      backlogtasksFormated.sort(function (a, b) {
        return b.id - a.id;
      });
    }
  }

  let tasks = backlogtasksFormated.slice(0, page * 4);

  if (backlogtasksFormated.length === tasks.length) {
    hasMoreItems = false;
  } else {
    hasMoreItems = true;
  }

  const observer = useRef();
  const flagElement = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMoreItems) {
            setTimeout(() => setPage(page + 1), 500);
          }
        }
      });
      if (element) observer.current.observe(element);
    },
    [tasks]
  );

  return (
    <Center>
      <Flex
        flexFlow="column"
        justifyContent="center"
        alignItems="center"
        w="90vw"
        minW='1000px'
      >
        <Flex w="90%" >
          <Box
            color="white"
            width="100%"
            borderRadius="md"
            d="flex"
            alignItems="center"
            my="5"
            pl="5%"
            py="8"
            bg="blueGradient"
            h="30vh"
            minH="150px"
          >
            <img
              src="https://thumbs.ultracoloringpages.com/network-coloring-page-a921ee9a6a16acf8d0c6f8b849ddc28e.png"
              alt="img not found"
              width="100"
            />
            <Flex flexDir="column" ml="5%">
              <Text fontSize="4xl" fontWeight="semibold">
                WIPIT BACKLOG
              </Text>
              <Text fontSize="2xl">Tareas pendientes para dar apoyo</Text>
            </Flex>
          </Box>
        </Flex>
        <Flex width="90%" flexFlow="row" grow="1">
          <Flex flexFlow="column" alignItems="center" width="75%">
            <Flex bg="white" w="100%" p="3" mb="5" borderRadius="md">
              <AccordionPostTask />
            </Flex>
            <Flex
              bg="white"
              borderRadius="0.5rem"
              maxW="100%"
              flexFlow="column"
              alignItems="center"
              minH="30vh"
            >
              <Box w='100%'>
                <ClearFilters />
              </Box>
              <Box>
                <Flex w="100%">
                  <SimpleFilter
                    filter={purposeFilter}
                    campo="purpose"
                    texto="Proposito"
                  ></SimpleFilter>

                  <SimpleFilter
                    filter={difficultyFilter}
                    campo="difficulty"
                    texto="Dificultad"
                  ></SimpleFilter>

                  <SimpleFilter
                    filter={howlongFilter}
                    campo="howlong"
                    texto="Tiempo"
                  ></SimpleFilter>

                  <SimpleFilter
                    filter={areaFilter}
                    campo="area"
                    texto="Area"
                  ></SimpleFilter>

                  <LanguageFilter />
                  <TasksOrder />
                  <br></br>
                </Flex>
              </Box>
            </Flex>
            <SearchBar searchFilter={searchFilter} />

            <Flex alignContent="center" w="100%">
              {tasks.length > 0 ? (
                <Flex direction="column" justifyContent="center" w="100%">
                  <Tasks tasks={tasks} />
                  <Button ref={flagElement} variant="unstyled"></Button>
                  <TasksSkeletons hidden={!hasMoreItems} />
                </Flex>
              ) : (
                <Flex color="blackAlpha.400" w='100%' justifyItems="center" align='center' mt="5vh">
                  <InfoOutlineIcon mr='2%' /> <Text fontSize='xl' >  Por el momento no hay tareas a resolver.</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex w="100%" h="100%">
            <ProfileOverview />
          </Flex>
        </Flex>
      </Flex>
        <ScrollUp/>
    </Center>
  );
}
