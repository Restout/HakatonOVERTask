-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION postgres;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public."Applications_ApplicationsID_seq";

CREATE SEQUENCE public."Applications_ApplicationsID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Container_ContainerID_seq";

CREATE SEQUENCE public."Container_ContainerID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Course_CourseID_seq";

CREATE SEQUENCE public."Course_CourseID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Enrollee_ID_seq";

CREATE SEQUENCE public."Enrollee_ID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Groups_GroupID_seq";

CREATE SEQUENCE public."Groups_GroupID_seq"
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
-- DROP SEQUENCE public."Lesson_LessonID_seq";

CREATE SEQUENCE public."Lesson_LessonID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Materials_materialid_seq";

CREATE SEQUENCE public."Materials_materialid_seq"
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
-- DROP SEQUENCE public."ScheduleDay_scheldueid_seq";

CREATE SEQUENCE public."ScheduleDay_scheldueid_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."SelectionCommittee_ID_seq";

CREATE SEQUENCE public."SelectionCommittee_ID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Supervisior_ID_seq";

CREATE SEQUENCE public."Supervisior_ID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public."Tasks_TaskID_seq";

CREATE SEQUENCE public."Tasks_TaskID_seq"
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
-- DROP SEQUENCE public."files_FilesID_seq";

CREATE SEQUENCE public."files_FilesID_seq"
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
	CACHE 1
	NO CYCLE;-- public."Course" definition

-- Drop table

-- DROP TABLE "Course";

CREATE TABLE "Course" (
                          "CourseID" serial4 NOT NULL,
                          "CourseName" varchar NULL,
                          "About" text NULL,
                          "Programm" text NULL,
                          "Requirements" text NULL,
                          "Result" text NULL,
                          CONSTRAINT "XPKCourse" PRIMARY KEY ("CourseID")
);


-- public."Lesson" definition

-- Drop table

-- DROP TABLE "Lesson";

CREATE TABLE "Lesson" (
                          "LessonID" serial4 NOT NULL,
                          "LessonName" varchar(100) NULL,
                          "Description" varchar(100) NULL,
                          CONSTRAINT "XPKLesson" PRIMARY KEY ("LessonID")
);


-- public."News" definition

-- Drop table

-- DROP TABLE "News";

CREATE TABLE "News" (
                        "NewsID" serial4 NOT NULL,
                        publish_date date NULL,
                        "Title" varchar(100) NULL,
                        "Content" varchar(100) NULL,
                        "Image" varchar(100) NULL,
                        CONSTRAINT "XPKNews" PRIMARY KEY ("NewsID")
);


-- public."User" definition

-- Drop table

-- DROP TABLE "User";

CREATE TABLE "User" (
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


-- public.files definition

-- Drop table

-- DROP TABLE files;

CREATE TABLE files (
                       "FileName" varchar(100) NULL,
                       "File" bytea NULL,
                       "FilesID" serial4 NOT NULL,
                       CONSTRAINT files_pk PRIMARY KEY ("FilesID")
);


-- public."Enrollee" definition

-- Drop table

-- DROP TABLE "Enrollee";

CREATE TABLE "Enrollee" (
                            "ID" serial4 NOT NULL,
                            CONSTRAINT "XPKEnrollee" PRIMARY KEY ("ID"),
                            CONSTRAINT "Is_a_User" FOREIGN KEY ("ID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Images" definition

-- Drop table

-- DROP TABLE "Images";

CREATE TABLE "Images" (
                          "NewsID" serial4 NOT NULL,
                          "Image" bytea NULL,
                          CONSTRAINT "XPKImages" PRIMARY KEY ("NewsID"),
                          CONSTRAINT "R_32" FOREIGN KEY ("NewsID") REFERENCES "News"("NewsID")
);


-- public."SelectionCommittee" definition

-- Drop table

-- DROP TABLE "SelectionCommittee";

CREATE TABLE "SelectionCommittee" (
                                      "ID" serial4 NOT NULL,
                                      CONSTRAINT "XPKSelectionCommittee" PRIMARY KEY ("ID"),
                                      CONSTRAINT "Is_a_User" FOREIGN KEY ("ID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Supervisior" definition

-- Drop table

-- DROP TABLE "Supervisior";

CREATE TABLE "Supervisior" (
                               "ID" serial4 NOT NULL,
                               CONSTRAINT "XPKSupervisior" PRIMARY KEY ("ID"),
                               CONSTRAINT "Is_a_User" FOREIGN KEY ("ID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Teacher" definition

-- Drop table

-- DROP TABLE "Teacher";

CREATE TABLE "Teacher" (
                           "AcademicDegree" varchar(20) NULL,
                           "AcademicTitle" varchar(20) NULL,
                           "ID" int4 NOT NULL,
                           CONSTRAINT "XPKTeacher" PRIMARY KEY ("ID"),
                           CONSTRAINT "Is_a_User" FOREIGN KEY ("ID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Applications" definition

-- Drop table

-- DROP TABLE "Applications";

CREATE TABLE "Applications" (
                                "ApplicationsID" serial4 NOT NULL,
                                "CourseID" int4 NULL,
                                "ID" int4 NULL,
                                "Status" varchar(20) NULL,
                                "Merits" text NULL,
                                "MotivationLetter" text NULL,
                                "ChiefID" int4 NULL,
                                "CurrentPosition" text NULL,
                                "DepartmentName" text NULL,
                                "Experience" int4 NULL,
                                "DateOfChange" date NULL,
                                CONSTRAINT "XPKApplications" PRIMARY KEY ("ApplicationsID"),
                                CONSTRAINT "R_1" FOREIGN KEY ("ID") REFERENCES "Enrollee"("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                                CONSTRAINT "R_5" FOREIGN KEY ("CourseID") REFERENCES "Course"("CourseID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Groups" definition

-- Drop table

-- DROP TABLE "Groups";

CREATE TABLE "Groups" (
                          "GroupID" serial4 NOT NULL,
                          "ID" int4 NULL,
                          "CourseID" int4 NULL,
                          "GroupName" varchar(20) NULL,
                          CONSTRAINT "XPKGroups" PRIMARY KEY ("GroupID"),
                          CONSTRAINT "R_4" FOREIGN KEY ("ID") REFERENCES "Supervisior"("ID") ON DELETE SET NULL ON UPDATE CASCADE,
                          CONSTRAINT "R_44" FOREIGN KEY ("CourseID") REFERENCES "Course"("CourseID") ON DELETE SET NULL
);


-- public."LessonTeacher" definition

-- Drop table

-- DROP TABLE "LessonTeacher";

CREATE TABLE "LessonTeacher" (
                                 "LessonID" int4 NOT NULL,
                                 "ID" int4 NOT NULL,
                                 CONSTRAINT "XPKLessonTeacher" PRIMARY KEY ("LessonID", "ID"),
                                 CONSTRAINT "R_14" FOREIGN KEY ("ID") REFERENCES "Teacher"("ID") ON DELETE SET NULL ON UPDATE CASCADE,
                                 CONSTRAINT "R_16" FOREIGN KEY ("LessonID") REFERENCES "Lesson"("LessonID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."ScheduleDay" definition

-- Drop table

-- DROP TABLE "ScheduleDay";

CREATE TABLE "ScheduleDay" (
                               "Day" date NOT NULL,
                               "Time" time NOT NULL,
                               "GroupID" int4 NOT NULL,
                               "Audience" varchar(20) NULL,
                               "TimeEnd" time NOT NULL,
                               "LessonID" int4 NULL,
                               "ID" int4 NULL,
                               "ScheldueID" int4 NOT NULL DEFAULT nextval('"ScheduleDay_scheldueid_seq"'::regclass),
                               CONSTRAINT scheduleday_pk PRIMARY KEY ("ScheldueID"),
                               CONSTRAINT "R_25" FOREIGN KEY ("GroupID") REFERENCES "Groups"("GroupID"),
                               CONSTRAINT "R_42" FOREIGN KEY ("LessonID","ID") REFERENCES "LessonTeacher"("LessonID","ID") ON DELETE SET NULL ON UPDATE CASCADE
);


-- public."Student" definition

-- Drop table

-- DROP TABLE "Student";

CREATE TABLE "Student" (
                           "GroupID" int4 NULL,
                           "RecordBookID" int4 NULL,
                           "ID" int4 NOT NULL,
                           CONSTRAINT "XPKStudent" PRIMARY KEY ("ID"),
                           CONSTRAINT "Is_a_User" FOREIGN KEY ("ID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                           CONSTRAINT "R_2" FOREIGN KEY ("GroupID") REFERENCES "Groups"("GroupID") ON DELETE SET NULL
);


-- public."Attendance" definition

-- Drop table

-- DROP TABLE "Attendance";

CREATE TABLE "Attendance" (
                              has_been bool NOT NULL DEFAULT false,
                              "ScheduleID" int4 NOT NULL,
                              "StudentID" int4 NOT NULL,
                              CONSTRAINT attendance_pk PRIMARY KEY ("ScheduleID", "StudentID"),
                              CONSTRAINT attendance_fk FOREIGN KEY ("StudentID") REFERENCES "Student"("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                              CONSTRAINT attendance_fk_1 FOREIGN KEY ("ScheduleID") REFERENCES "ScheduleDay"("ScheldueID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Container" definition

-- Drop table

-- DROP TABLE "Container";

CREATE TABLE "Container" (
                             "ContainerID" serial4 NOT NULL,
                             "ID" int4 NOT NULL,
                             "LessonID" int4 NULL,
                             "TeacherID" int4 NULL,
                             CONSTRAINT container_pk PRIMARY KEY ("ContainerID"),
                             CONSTRAINT "R_24" FOREIGN KEY ("ID") REFERENCES "Student"("ID") ON DELETE CASCADE ON UPDATE CASCADE,
                             CONSTRAINT container_fk FOREIGN KEY ("LessonID","TeacherID") REFERENCES "LessonTeacher"("LessonID","ID") ON UPDATE CASCADE
);


-- public."Materials" definition

-- Drop table

-- DROP TABLE "Materials";

CREATE TABLE "Materials" (
                             "ContainerID" int4 NOT NULL,
                             "DateStart" date NOT NULL,
                             "DateEnd" date NULL,
                             "Description" text NULL,
                             "MaterialID" int4 NOT NULL DEFAULT nextval('"Materials_materialid_seq"'::regclass),
                             "Title" text NULL,
                             CONSTRAINT materials_pk PRIMARY KEY ("MaterialID"),
                             CONSTRAINT materials_fk FOREIGN KEY ("ContainerID") REFERENCES "Container"("ContainerID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Practical" definition

-- Drop table

-- DROP TABLE "Practical";

CREATE TABLE "Practical" (
                             "MaterialID" int4 NOT NULL,
                             "FileID" int4 NOT NULL,
                             CONSTRAINT practical_pk PRIMARY KEY ("FileID", "MaterialID"),
                             CONSTRAINT "Practical_FileID_fkey" FOREIGN KEY ("FileID") REFERENCES files("FilesID"),
                             CONSTRAINT "Practical_MaterialID_fkey" FOREIGN KEY ("MaterialID") REFERENCES "Materials"("MaterialID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Tasks" definition

-- Drop table

-- DROP TABLE "Tasks";

CREATE TABLE "Tasks" (
                         "MaterialID" int4 NULL,
                         "Description" text NULL,
                         "Title" varchar(100) NULL,
                         "TaskID" serial4 NOT NULL,
                         "Grade" int4 NULL,
                         CONSTRAINT tasks_pk PRIMARY KEY ("TaskID"),
                         CONSTRAINT tasks_fk FOREIGN KEY ("MaterialID") REFERENCES "Materials"("MaterialID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Theoretical" definition

-- Drop table

-- DROP TABLE "Theoretical";

CREATE TABLE "Theoretical" (
                               "MaterialID" int4 NOT NULL,
                               "FileID" int4 NOT NULL,
                               CONSTRAINT theoretical_pk PRIMARY KEY ("MaterialID", "FileID"),
                               CONSTRAINT "Theoretical_FileID_fkey" FOREIGN KEY ("FileID") REFERENCES files("FilesID") ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT "Theoretical_MaterialID_fkey" FOREIGN KEY ("MaterialID") REFERENCES "Materials"("MaterialID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Answer" definition

-- Drop table

-- DROP TABLE "Answer";

CREATE TABLE "Answer" (
                          "TaskID" int4 NOT NULL,
                          "FileID" int4 NOT NULL,
                          CONSTRAINT answer_pk PRIMARY KEY ("TaskID", "FileID"),
                          CONSTRAINT "Answer_FileID_fkey" FOREIGN KEY ("FileID") REFERENCES files("FilesID"),
                          CONSTRAINT "Answer_TaskID_fkey" FOREIGN KEY ("TaskID") REFERENCES "Tasks"("TaskID") ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Independent" definition

-- Drop table

-- DROP TABLE "Independent";

CREATE TABLE "Independent" (
                               "MaterialID" int4 NOT NULL,
                               "FileID" int4 NOT NULL,
                               CONSTRAINT independent_pk PRIMARY KEY ("MaterialID", "FileID"),
                               CONSTRAINT "Independent_FileID_fkey" FOREIGN KEY ("FileID") REFERENCES files("FilesID"),
                               CONSTRAINT "Independent_MaterialID_fkey" FOREIGN KEY ("MaterialID") REFERENCES "Materials"("MaterialID") ON DELETE CASCADE ON UPDATE CASCADE
);
