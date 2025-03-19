-- DROP SEQUENCE public."Groups_GroupID_seq";

CREATE SEQUENCE public."Groups_GroupID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Groups_GroupID_seq1";

CREATE SEQUENCE public."Groups_GroupID_seq1"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Images_NewsID_seq";

CREATE SEQUENCE public."Images_NewsID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Images_NewsID_seq1";

CREATE SEQUENCE public."Images_NewsID_seq1"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Lesson_LessonID_seq";

CREATE SEQUENCE public."Lesson_LessonID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Lesson_LessonID_seq1";

CREATE SEQUENCE public."Lesson_LessonID_seq1"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."News_NewsID_seq";

CREATE SEQUENCE public."News_NewsID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."News_NewsID_seq1";

CREATE SEQUENCE public."News_NewsID_seq1"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."ScheduleDay_scheldueid_seq";

CREATE SEQUENCE public."ScheduleDay_scheldueid_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."User_ID_seq";

CREATE SEQUENCE public."User_ID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."User_ID_seq1";

CREATE SEQUENCE public."User_ID_seq1"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;-- public."Groups" определение

-- Drop table

-- DROP TABLE public."Groups";

CREATE TABLE public."Groups" (
                                 "GroupID" serial4 NOT NULL,
                                 "ID" int4 NULL,
                                 "GroupName" varchar(20) NULL,
                                 CONSTRAINT "XPKGroups" PRIMARY KEY ("GroupID")
);


-- public."Lesson" определение

-- Drop table

-- DROP TABLE public."Lesson";

CREATE TABLE public."Lesson" (
                                 "LessonID" serial4 NOT NULL,
                                 "LessonName" varchar(100) NULL,
                                 "Description" varchar(100) NULL,
                                 CONSTRAINT "XPKLesson" PRIMARY KEY ("LessonID")
);


-- public."News" определение

-- Drop table

-- DROP TABLE public."News";

CREATE TABLE public."News" (
                               "NewsID" serial4 NOT NULL,
                               publish_date date NULL,
                               "Title" varchar(100) NULL,
                               "Content" varchar(100) NULL,
                               "Image" varchar(100) NULL,
                               CONSTRAINT "XPKNews" PRIMARY KEY ("NewsID")
);


-- public."User" определение

-- Drop table

-- DROP TABLE public."User";

CREATE TABLE public."User" (
                               "ID" serial4 NOT NULL,
                               "First_name" varchar(50) NULL,
                               "Last_name" varchar(50) NULL,
                               "Father_name" varchar(50) NULL,
                               "Birthday" date NULL,
                               "Phone" varchar(20) NULL,
                               "Email" varchar(50) NULL,
                               "Password" varchar(20) NULL,
                               "Role" varchar(30) NULL,
                               CONSTRAINT "XPKUser" PRIMARY KEY ("ID"),
                               CONSTRAINT user_un UNIQUE ("Email")
);

-- public."Images" определение

-- Drop table

-- DROP TABLE public."Images";

CREATE TABLE public."Images" (
                                 "NewsID" serial4 NOT NULL,
                                 "Image" bytea NULL,
                                 CONSTRAINT "XPKImages" PRIMARY KEY ("NewsID"),
                                 CONSTRAINT "R_32" FOREIGN KEY ("NewsID") REFERENCES public."News"("NewsID")
);


-- public."Student" определение

-- Drop table

-- DROP TABLE public."Student";

CREATE TABLE public."Student" (
                                  "GroupID" int4 NULL,
                                  "RecordBookID" int4 NULL,
                                  "ID" int4 NOT NULL,
                                  CONSTRAINT "XPKStudent" PRIMARY KEY ("ID"),
                                  CONSTRAINT "Is_a_User" FOREIGN KEY ("ID") REFERENCES public."User"("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                                  CONSTRAINT "R_2" FOREIGN KEY ("GroupID") REFERENCES public."Groups"("GroupID") ON DELETE SET NULL
);


-- public."Teacher" определение

-- Drop table

-- DROP TABLE public."Teacher";

CREATE TABLE public."Teacher" (
                                  "AcademicDegree" varchar(100) NULL,
                                  "AcademicTitle" varchar(100) NULL,
                                  "ID" int4 NOT NULL,
                                  CONSTRAINT "XPKTeacher" PRIMARY KEY ("ID"),
                                  CONSTRAINT "Is_a_User" FOREIGN KEY ("ID") REFERENCES public."User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."LessonTeacher" определение

-- Drop table

-- DROP TABLE public."LessonTeacher";

CREATE TABLE public."LessonTeacher" (
                                        "LessonID" int4 NOT NULL,
                                        "ID" int4 NOT NULL,
                                        CONSTRAINT "XPKLessonTeacher" PRIMARY KEY ("LessonID", "ID"),
                                        CONSTRAINT "R_14" FOREIGN KEY ("ID") REFERENCES public."Teacher"("ID") ON DELETE SET NULL ON UPDATE CASCADE,
                                        CONSTRAINT "R_16" FOREIGN KEY ("LessonID") REFERENCES public."Lesson"("LessonID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."ScheduleDay" определение

-- Drop table

-- DROP TABLE public."ScheduleDay";

CREATE TABLE public."ScheduleDay" (
                                      "Day" date NOT NULL,
                                      "Time" time NOT NULL,
                                      "GroupID" int4 NOT NULL,
                                      "Audience" varchar(20) NULL,
                                      "TimeEnd" time NOT NULL,
                                      "LessonID" int4 NULL,
                                      "ID" int4 NULL,
                                      "ScheldueID" int4 DEFAULT nextval('"ScheduleDay_scheldueid_seq"'::regclass) NOT NULL,
                                      "OrganizerLastName" varchar NULL,
                                      "OrganizerFirstName" varchar NULL,
                                      CONSTRAINT scheduleday_pk PRIMARY KEY ("ScheldueID"),
                                      CONSTRAINT "R_25" FOREIGN KEY ("GroupID") REFERENCES public."Groups"("GroupID"),
                                      CONSTRAINT "R_42" FOREIGN KEY ("LessonID","ID") REFERENCES public."LessonTeacher"("LessonID","ID") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(5, 'Легенда', 'Кириллов', 'Фронтендович', '2010-10-10', '42394329047', 'lega@mail.com', '123123', 'MANAGER');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(3, 'Александра', 'Любимова', ' Марковна', '2000-11-03', ' 8 999 564 76 23', 'lubimova@mali.com', 'password1', 'SELLECTION_COMMITE');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(1000013, 'Наталья', 'Семенова', 'Алексеевна', '1985-12-10', '7777777777', 'semenova@mail.com', 'пароль7', 'SUPERVISOR');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(10000012, 'Алексей', 'Зайцев', 'Игоревич', '1997-09-20', '9999999999', 'zaicev@mail.com', 'пароль6', 'TEACHER');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(100008, 'Анна', 'Сидорова', 'Игоревна', '1995-02-02', '9876543210', 'sidorova@mail.com', 'пароль2', 'TEACHER');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(100003, 'Александра', 'Зубкова ', 'Борисовна', '1970-12-13', '8 999 634 09 90', 'zubkova@mail.com', 'password2', 'SELLECTION_COMMITE');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(10000010, 'Елена', 'Григорьева', 'Сергеевна', '2000-04-04', '7777777777', 'grigoreva@mail.com', 'пароль4', 'SUPERVISOR');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(1000014, 'Петр', 'Иванов', 'Сергеевич', '2002-03-25', '6666666666', 'ivanov@mail.com', 'пароль8', 'SELLECTION_COMMITE');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(6, 'Мария', 'Леонтьева', 'Александровна', '1988-05-15', '8888888888', 'leontyessva@mail.com', 'пароль5', 'TEACHER');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(8, 'Мария', 'Леонтьева', 'Александровна', '1988-05-15', '8888888888', 'leontyseva@mail.com', 'пароль5', 'TEACHER');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(100009, 'Михаил', 'Козлов', 'Дмитриевич', '1998-03-03', '5555555555', 'kozlov@mail.com', 'пароль3', 'STUDENT');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(1000011, 'Мария', 'Леонтьева', 'Александровна', '1988-05-15', '8888888888', 'leontyeva@mail.com', 'пароль5', 'TEACHER');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(9, 'Арина', 'Ширяева', 'Сергеевна', '2002-07-23', '8 959 563 22 51', 'shiriaeva@mail.com', 'password4', 'STUDENT');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(11, 'Артем', 'Александов', 'Алексеевич', '2023-10-18', '23453245325', 'laravel@laravel.com', 'дфкфмуд', 'STUDENT');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(12, 'Дмитрий', 'Абаков', 'Олегович', '1999-01-17', '999999999', 'dima@sov.com', 'passwword11', 'STUDENT');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(13, 'Артем', 'Магомедов', 'Султанович', '2002-04-25', '999999999', 'mag@koldun.en', 'password12', 'STUDENT');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(14, 'Максим', 'Максимов', 'Максимович', '1989-09-03', '999999999', 'max@max.max', 'password13', 'ENROLLEE');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(15, 'Семён', 'Комаров', 'Елисеевич', '1992-11-11', '99999999', 'sem@email.en', 'password14', 'ENROLLEE');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(16, 'Макар', 'Казанцев', 'Максимович', '2000-02-20', '98898989', 'mac@lac.com', 'password15', 'ENROLLEE');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(17, 'Андрей', 'Федоров', 'Григорьевич', '2002-05-15', '12345678', 'anFeMa@lmail.com', 'password16', 'ENROLLEE');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(100005, 'Константин', 'Власов', 'Максимович', '2002-08-21', '8 959 590 22 67', 'vlasov@mail.com', 'password5', 'ADMIN');
INSERT INTO "User" ("ID", "First_name", "Last_name", "Father_name", "Birthday", "Phone", "Email", "Password", "Role") VALUES(100006, 'Николай', 'Ильин', 'Антонович', '2002-08-29', '8 988 534 22 87', 'ilian@mail.com', 'password6', 'ENROLLEE');

INSERT INTO "Teacher" ("AcademicDegree", "AcademicTitle", "ID") VALUES('кандидат информационных наук', 'преподаватель', 10000012);
INSERT INTO "Teacher" ("AcademicDegree", "AcademicTitle", "ID") VALUES('кандидат математических наук', 'доцент', 100008);
INSERT INTO "Teacher" ("AcademicDegree", "AcademicTitle", "ID") VALUES('доктор дизайнерских наук', 'Заведующий кафедрой', 6);
INSERT INTO "Teacher" ("AcademicDegree", "AcademicTitle", "ID") VALUES('доктор физических наук наук', 'преподаватель', 8);
INSERT INTO "Teacher" ("AcademicDegree", "AcademicTitle", "ID") VALUES('кандидат административных наук', 'доцент', 1000011);

