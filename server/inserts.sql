insert into languages (id ,name, area) values
(1,'JavaScript','frontend'),
(2,'Java','frontend'),
(3,'Python','backend'),
(4,'C#','backend'),
(5,'Ruby','backend'),
(6,'Solidity','backend'),
(7,'ODBC400','database'),
(8,'Cobol','framework'),
(9,'VisualFox','framework'),
(10,'VisualBasic','framework'),
(11,'Node.Js','backend'),
(12,'Serpent','backend'),
(13,'C','backend'),
(14,'Postgres','database'),
(15,'React','frontend'),
(16,'Redux','frontend'),
(17,'Sequelize','framework'),
(18,'Otro','');


-- insert into users ( "userName" , "name" , "lastName" , "password" , "email" , "googleId" , "deleted" , "createdAt" , "updatedAt") values
-- ('daro','Dario','Jejer','1234','ejemplo1@mail.com',false,false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03'),
-- ('fabi','Fabiola','Suarez','1234','ejemplo2@mail.com',false,false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03'),
-- ('max','Maxi','Fernandez','1234','ejemplo3@mail.com',false,false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03'),
-- ('agus','Agustín','Nuñez','1234','ejemplo4@mail.com',false,false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03'),
-- ('ale','Alejandro','Jameson','1234','ejemplo5@mail.com',false,false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03'),
-- ('nahue','Nahuel','Ñancucheo','1234','ejemplo6@mail.com',false,false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03'),
-- ('gasti','Gaston','Saralegui','1234','ejemplo7@mail.com',false,false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03'),
-- ('ger','German','Suarez','1234','ejemplo8@mail.com',false,false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03');

-- update users set role='admin' where "userName"= 'daro';

-- insert into tasks values
-- (1,null,'Task 1','No puedo renderizar un componente','sprint','ask a quick question','frontend','easy','15m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','daro'),
-- (2,null,'Task 2','necesito que alguien revise mi código','sprint','practice','frontend','medium','30m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','fabi'),
-- (3,null,'Task 3','no me crea las tablas','sprint','practice','database','easy','45m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','max'),
-- (4,null,'Task 4','me tira error al hacer un get','sprint','develop','backend','hard','1h',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','agus'),
-- (5,null,'Task 5','No puedo renderizar un componente','sprint','ask a quick question','frontend','easy','15m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','daro'),
-- (6,null,'Task 6','necesito que alguien revise mi código','sprint','practice','frontend','medium','30m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','fabi'),
-- (7,null,'Task 7','no me crea las tablas','sprint','practice','database','easy','45m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','max'),
-- (8,null,'Task 8','me tira error al hacer un get','sprint','develop','backend','hard','1h',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','agus'),
-- (9,null,'Task 9','No puedo renderizar un componente','sprint','ask a quick question','frontend','easy','15m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','daro'),
-- (10,null,'Task 10','necesito que alguien revise mi código','sprint','practice','frontend','medium','30m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','fabi'),
-- (11,null,'Task 11','no me crea las tablas','sprint','practice','database','easy','45m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','max'),
-- (12,null,'Task 12','me tira error al hacer un get','sprint','develop','backend','hard','1h',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','agus'),
-- (13,null,'Task 13','No puedo renderizar un componente','sprint','ask a quick question','frontend','easy','15m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','daro'),
-- (14,null,'Task 14','necesito que alguien revise mi código','sprint','practice','frontend','medium','30m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','fabi'),
-- (15,null,'Task 15','no me crea las tablas','sprint','practice','database','easy','45m',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','max'),
-- (16,null,'Task 16','me tira error al hacer un get','sprint','develop','backend','hard','1h',false,'','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','agus');



-- insert into tasks_languages values 
-- (1,1),
-- (15,1),
-- (16,1),
-- (1,2),
-- (15,2),
-- (16,2),
-- (17,3),
-- (14,3),
-- (2,4),
-- (1,5),
-- (15,5),
-- (16,5),
-- (1,6),
-- (15,6),
-- (16,6),
-- (17,7),
-- (14,7),
-- (2,8),
-- (1,9),
-- (15,9),
-- (16,9),
-- (1,10),
-- (15,10),
-- (16,10),
-- (17,11),
-- (14,11),
-- (2,12),
-- (1,13),
-- (15,13),
-- (16,13),
-- (1,14),
-- (15,14),
-- (16,14),
-- (17,15),
-- (14,15),
-- (2,16);

-- insert into tasks_users values
-- ('ale',   1),
-- ('nahue', 2),
-- ('gasti', 3),
-- ('ger',   4),
-- ('nahue',   5);





-- insert into messages values
-- (1,1,'hola soy daro','enviado','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','daro'),
-- (2,1,'hola como estas','enviado','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','daro'),
-- (3,1,'que ondaaaa','enviado','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','daro'),
-- (4,1,'aguante river plate','enviado','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','fabi'),
-- (1,2,'hagamos la tarea','enviado','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','fabi'),
-- (2,2,'bueno','enviado','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','fabi'),
-- (2,3,'estoy trabajando en eso','enviado','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','max'),
-- (3,2,'te pareceacer un meet?','enviado','2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','max');

-- insert into notifications ( "id" , "type" , "seen" , "createdAt", "updatedAt", "creator_id", "receiver_id", "task_id" ) values
-- (1,'deleted',false,'2021-07-09 09:25:30.002-03','2021-07-09 09:25:30.002-03','daro','nahue',1),
-- (2,'activated',false,'2021-07-09 09:27:30.002-03','2021-07-09 09:27:30.002-03','nahue','nahue',5);